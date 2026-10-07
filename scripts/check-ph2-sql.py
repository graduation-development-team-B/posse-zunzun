# coding: utf-8
import sqlite3,json,pathlib
root=pathlib.Path(__file__).resolve().parents[1]
def find(w,s):return next(r['question'] for r in json.loads((root/f'content/PH2/weeks/week{w}.json').read_text()) if f'-{s}-' in r['question']['id'])
def database():
 c=sqlite3.connect(':memory:');c.executescript('''
 CREATE TABLE books(id INT PRIMARY KEY,title TEXT,published_at TEXT,created_at TEXT);
 INSERT INTO books VALUES(1,'PHPプログラミング','2005-01-01','2024-01-01'),(2,'ABC実践','2004-12-31','2024-01-01'),(3,'中のABCとPHP','2006-01-01','2024-01-01'),(4,'Java入門','2006-02-01','2024-01-01'),(5,'PHP以前','2000-01-01','2024-01-01');
 CREATE TABLE students(id INT PRIMARY KEY,name TEXT); INSERT INTO students VALUES(1,'A'),(2,'B'),(3,'C'),(4,'D');
 CREATE TABLE orders(id INT PRIMARY KEY,name TEXT); INSERT INTO orders VALUES(1,'A'),(2,'B'),(3,'C'),(4,'D');
 CREATE TABLE order_details(id INT PRIMARY KEY,order_id INT,item_name TEXT,quantity INT,price INT);
 INSERT INTO order_details VALUES(11,1,'X',2,100),(12,1,'Y',1,300),(13,2,'Z',2,5000),(14,3,'W',3,5000);
 CREATE TABLE studies(id INT PRIMARY KEY,student_id INT,date TEXT,hours INT,content TEXT);
 INSERT INTO studies VALUES(1,1,'2022-06-19',4,'Vue.js'),(2,1,'2022-06-20',1,'Vue.js'),(3,3,'2022-06-20',3,'PHP'),(4,3,'2022-06-25 23:59:59',2,'Vue.js'),(5,2,'2022-06-26',6,'PHP'),(6,3,'2023-06-25',5,'PHP');
 CREATE TABLE todos(id INT PRIMARY KEY,user_id INT,text TEXT,status INT);
 INSERT INTO todos VALUES(8,3,'a',0),(9,3,'b',1),(10,2,'c',0);
 CREATE TABLE questions(id INT PRIMARY KEY,content TEXT);
 ''');return c
cases=[(19,'date-column',{},[(1,'PHPプログラミング','2005-01-01','2024-01-01'),(3,'中のABCとPHP','2006-01-01','2024-01-01'),(4,'Java入門','2006-02-01','2024-01-01')]),(19,'like',{},[(1,'PHPプログラミング','2005-01-01','2024-01-01')]),(19,'combined-where',{},[(1,'PHPプログラミング','2005-01-01','2024-01-01'),(3,'中のABCとPHP','2006-01-01','2024-01-01')]),(20,'count',{},[(1,2),(2,1),(3,1)]),(20,'quantity',{},[(1,3),(2,2),(3,3)]),(20,'price-times',{},[(1,500),(2,10000),(3,15000)]),(20,'group-key',{},[(1,3),(2,2),(3,3)]),(21,'limit',{},[(4,'D'),(3,'C')]),(22,'join-key',{},[('A','X'),('A','Y'),('B','Z'),('C','W')]),(22,'aggregate-filter',{},[(2,10000),(3,15000)]),(22,'missing-child',{},[(4,)]),(25,'dependent-delete',{'student_id':3},[(1,1,'2022-06-19',4,'Vue.js'),(2,1,'2022-06-20',1,'Vue.js'),(5,2,'2022-06-26',6,'PHP')]),(29,'date-range',{},[(6,)]),(29,'student-filter',{},[(10,)]),(29,'content-filter',{},[(7,)]),(29,'person-period',{},[(5,)]),(31,'owner-query',{'user_id':3},[(8,3,'a',0),(9,3,'b',1)])]
result=[];count=0
for w,s,params,expected in cases:
 q=find(w,s);p=q['payload'];outcomes={}
 for o in p['options']:
  c=database();sql=p['content'].replace('___',o['text']);count+=1
  try:
   out=c.execute(sql,params).fetchall()
   if s=='dependent-delete':out=c.execute('SELECT * FROM studies').fetchall()
   equal=(out==expected if s=='limit' else sorted(out)==sorted(expected))
  except sqlite3.Error:equal=False
  outcomes[o['id']]=equal;c.close()
 assert [k for k,v in outcomes.items() if v]==[p['correctOptionId']],(q['id'],outcomes)
 result.append({'id':q['id'],'cases':'isolated in-memory fixture, includes boundaries and non-matching rows','candidateOutcomes':outcomes})
(root/'docs/quiz-reviews/ph2-sql-checks.json').write_text(json.dumps({'environment':'SQLite in-memory; SQL logic auxiliary check, NOT MySQL runtime verification','questions':len(result),'candidateExecutions':count,'results':result},ensure_ascii=False,indent=2)+'\n');print({'questions':len(result),'candidateExecutions':count})
