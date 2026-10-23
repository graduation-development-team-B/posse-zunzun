# -*- coding: utf-8 -*-
"""任意の作者用確認。SQLite内の共通SQLのみ。MySQLそのものの検証ではない。"""
import json
import pathlib
import sqlite3

root = pathlib.Path(__file__).resolve().parents[1]
questions = [e['question'] for p in (root / 'content').glob('*/weeks/*.json')
             for e in json.loads(p.read_text()) if e['question'].get('assembly', {}).get('language') == 'sql']
fixture = """
CREATE TABLE books(id INT PRIMARY KEY, title VARCHAR(100), published_at TEXT);
INSERT INTO books VALUES (1,'PHP入門','2005-01-01'),(2,'入門PHP','2004-01-01'),(3,'CSS','2006-01-01'),(4,'React','2004-01-01');
CREATE TABLE students(id INT PRIMARY KEY, name TEXT);
INSERT INTO students VALUES (1,'Aoi'),(2,'Nori'),(3,'Mio'),(4,'Ren');
CREATE TABLE studies(id INT PRIMARY KEY,student_id INT,hours INT,date TEXT,content TEXT);
INSERT INTO studies VALUES (1,2,2,'2022-06-20','PHP'),(2,2,3,'2022-06-25 23:59:59','PHP'),(3,1,4,'2022-06-26','PHP入門');
CREATE TABLE orders(id INT PRIMARY KEY,name TEXT);
INSERT INTO orders VALUES (1,'Nori'),(2,'Aoi'),(3,'Nori'),(4,'Mio');
CREATE TABLE order_details(id INT PRIMARY KEY, order_id INT,item_name TEXT,price INT,quantity INT);
INSERT INTO order_details VALUES (1,1,'A',100,2),(2,1,'B',300,1),(3,2,'C',10000,1),(4,3,'D',4000,2);
CREATE TABLE todos(id INT PRIMARY KEY,text TEXT,status INT,user_id INT);
INSERT INTO todos VALUES (1,'read',0,7),(2,'code',1,7),(3,'review',0,8);
CREATE TABLE questions(id INTEGER PRIMARY KEY,content TEXT);
"""
params = dict(id=2,name='Updated',student_id=2,user_id=7,content='New question')
expected = {
    (19,'select-title'):[('PHP入門',),('入門PHP',),('CSS',),('React',)],
    (19,'published-range'):[(1,'PHP入門','2005-01-01'),(3,'CSS','2006-01-01')],
    (19,'contains-title'):[(1,'PHP入門','2005-01-01'),(2,'入門PHP','2004-01-01')],
    (19,'both-conditions'):[(1,'PHP入門','2005-01-01')],
    (20,'count-details'):[(1,2),(2,1),(3,1)],
    (20,'sum-quantity'):[(1,3),(2,1),(3,2)],
    (20,'sum-cost'):[(1,500),(2,10000),(3,8000)],
    (20,'group-order'):[(1,3),(2,1),(3,2)],
    (21,'descending-query'):[(4,'Ren'),(3,'Mio'),(2,'Nori'),(1,'Aoi')],
    (21,'top-two'):[(4,'Ren'),(3,'Mio')],
    (22,'join-condition'):[('Nori','A'),('Nori','B'),('Aoi','C'),('Nori','D')],
    (22,'having-total'):[(2,10000)],
    (22,'missing-details'):[(4,)],
    (22,'correlated-key'):[(4,)],
    (22,'group-id-name'):[(1,'Nori',500),(2,'Aoi',10000),(3,'Nori',8000)],
    (24,'insert-question'):[(1,'New question')],
    (25,'update-name'):[(1,'Aoi'),(2,'Updated'),(3,'Mio'),(4,'Ren')],
    (25,'delete-id'):[(1,'Aoi'),(3,'Mio'),(4,'Ren')],
    (25,'delete-child'):[(3,1,4,'2022-06-26','PHP入門')],
    (29,'period-start'):[(5,)],
    (29,'period-end'):[(5,)],
    (29,'student-sum'):[(5,)],
    (29,'content-sum'):[(5,)],
    (29,'todo-list-query'):[(1,'read',0),(2,'code',1),(3,'review',0)],
    (30,'toggle-status'):[(1,'read',0,7),(2,'code',0,7),(3,'review',0,8)],
    (31,'owner-select'):[(1,'read',0,7),(2,'code',1,7)],
}
results=[]
for q in questions:
    week=int(q['sourceReference']['weekKey'][4:])
    slug=q['id'].split('-assembly-')[1]
    if (week,slug) not in expected and slug!='create-table':
        results.append(dict(id=q['id'],status='static-only',reason='MySQL固有のUSE / DATE_FORMAT / INTERVAL構文。教材・公式仕様で静的照合し、SQLiteへ変換しない。'))
        continue
    outcomes={}
    for option in q['payload']['options']:
        con=sqlite3.connect(':memory:')
        try:
            con.executescript(fixture)
            if slug=='create-table':con.execute('DROP TABLE books')
            p=q['payload']
            sql=p['content'].replace(p['blankToken'],option['text'])
            rows=con.execute(sql,params).fetchall()
            if slug=='create-table':
                columns=con.execute('PRAGMA table_info(books)').fetchall()
                good=[(c[1],c[2],c[5]) for c in columns]==[('id','INT',1),('title','VARCHAR(100)',0)]
            else:
                after={'insert-question':'questions','update-name':'students','delete-id':'students','delete-child':'studies','toggle-status':'todos'}.get(slug)
                if after:rows=con.execute('SELECT * FROM '+after+' ORDER BY id').fetchall()
                # ORDER BYを指定した設問以外では、返却順を採点根拠にしない。
                ordered=slug in ['descending-query','top-two','todo-list-query']
                good=(rows==expected[(week,slug)] if ordered else sorted(rows)==sorted(expected[(week,slug)]))
            outcomes[option['id']]=good
        except sqlite3.Error:
            outcomes[option['id']]=False
        finally:con.close()
    assert outcomes=={'correct':True,'wrong':False},(q['id'],outcomes)
    results.append(dict(id=q['id'],status='checked',candidateOutcomes=outcomes))
(root/'docs/quiz-reviews/assembly-sql-checks.json').write_text(json.dumps(dict(environment='SQLite '+sqlite3.sqlite_version+'; in-memory fixtures only; not MySQL verification',results=results),ensure_ascii=False,indent=2)+'\n')
print(json.dumps(dict(questions=len(results),checked=sum(r['status']=='checked' for r in results),staticOnly=sum(r['status']=='static-only' for r in results))))
