# coding: utf-8
import json,pathlib,subprocess,shutil
root=pathlib.Path(__file__).resolve().parents[1];rows=[r for n in range(17,33) for r in json.loads((root/f'content/PH2/weeks/week{n}.json').read_text())];qs={r['question']['id'].split('-',4)[4].rsplit('-',1)[0]:r['question'] for r in rows}
def find(w,slug):return next(r['question'] for r in rows if r['question']['id'].startswith(f'question-ph2-week{w}-{slug}-'))
# Actual question fragments and all candidates are executed in isolated CLI processes.
cases=[(18,'variable',[('', '', 'Posse')]),(18,'dump',[('', '', 'array(2)')]),(18,'if-boundary',[(f'$number={n};','', '小さい' if n<12 else '') for n in [11,12,13]]),(18,'concat',[('', '', '商品名: apple')]),(18,'foreach-value',[('', '', '100 200 300 ')]),(18,'sum',[('', '', '6')]),(18,'for-range',[('', '', '10 11 12 13 14 15 ')]),(23,'implode',[('', '', '1-2-3')]),(23,'substring-length',[('', '', 'サントリー')]),(23,'round',[('', '', '4')]),(23,'callback',[('', 'echo json_encode($result);', '[1,4]')]),(23,'return',[('', 'echo json_encode($result);', '[2,4]')]),(24,'get',[('$_GET=["keyword"=>"hoge"];$_POST=["keyword"=>"post"];$_SESSION=["keyword"=>"session"];','echo $keyword;', 'hoge')]),(24,'post',[('$_GET=["keyword"=>"query"];$_POST=["keyword"=>"hoge"];','echo $keyword;', 'hoge')]),(24,'get-loop',[('$_GET=["keyword1"=>"hoge","keyword2"=>"fuga"];$_POST=[];','', 'keyword1:hogekeyword2:fuga')]),(26,'store-id',[('$_SESSION=[];$_POST=["password"=>"secret","email"=>"someone@example.invalid"];','echo $_SESSION["id"];','7')]),(27,'email-format',[(f'$email={json.dumps(x)};','', 'メール形式エラー' if x!='a@example.com' else '') for x in ['','invalid','a@example.com']]),(27,'empty',[(f'$email={json.dumps(x)};','', '必須' if x=='' else '') for x in ['','a@example.com']]),(27,'password-verify',[(f'$password={json.dumps(x)};$storedHash=password_hash("Correct123",PASSWORD_DEFAULT);','', '一致' if x=='Correct123' else '') for x in ['Correct123','Wrong456']]),(27,'minimum-length',[(f'$password={json.dumps(x)};','', '4文字以上にしてください' if len(x)<4 else '') for x in ['abc','abcd','abcde']]),(27,'store-hash',[('$password="Correct123";','echo password_verify($password,$passwordHash) ? "OK" : "NG";','OK')]),(31,'map-array',[]),(31,'pair',[])]
setup='class Study { public function __construct(public $day, public $hours) {} public function get_day(){return $this->day;} public function get_hours(){return (int)$this->hours;} } $studies=[new Study("2022-06-14","3"),new Study("2022-06-15","7")];'
for w,s,cs in cases:
 if w==31:cs.append((setup,'echo json_encode($data);','[["2022-06-14",3],["2022-06-15",7]]'))
results=[];total=0
for w,slug,cs in cases:
 q=find(w,slug);p=q['payload'];outcomes={}
 for o in p['options']:
  good=True
  for prefix,suffix,expected in cs:
   code=p['content'].replace('___',o['text']).removeprefix('<?php');script='<?php\n'+prefix+'\n'+code+'\n'+suffix
   r=subprocess.run(['php','-d','display_errors=stderr'],input=script,text=True,capture_output=True,timeout=5);total+=1
   actual=r.stdout
   match=r.returncode==0 and (expected in actual if slug=='dump' else actual==expected) and not r.stderr
   good &=match
  outcomes[o['id']]=bool(good)
 assert [k for k,v in outcomes.items() if v]==[p['correctOptionId']],(q['id'],outcomes)
 results.append({'id':q['id'],'environment':'local PHP CLI; isolated input; no database/network','cases':len(cs),'candidateOutcomes':outcomes})
version=subprocess.run(['php','-v'],text=True,capture_output=True).stdout.splitlines()[0]
(root/'docs/quiz-reviews').mkdir(exist_ok=True)
(root/'docs/quiz-reviews/ph2-php-checks.json').write_text(json.dumps({'environment':version,'questions':len(results),'candidateExecutions':total,'results':results},ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'version':version,'questions':len(results),'candidateExecutions':total},ensure_ascii=False))
