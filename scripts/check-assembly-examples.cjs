// 任意の作者用補助確認。アプリはPHP CLIに依存しない。
const fs = require("node:fs");
const path = require("node:path");
const cp = require("node:child_process");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const ts = require("typescript");
const { load, root } = require("./content-lib.cjs");
const entries = load().entries.filter((e) => e.question.assembly && !e.question.id.startsWith('question-ph3-'));
const code = (q, id = "correct") =>
  q.payload.content.replace(
    q.payload.blankToken,
    () => q.payload.options.find((o) => o.id === id).text,
  );
const find = (week, slug) =>
  entries.find(
    (e) =>
      e.question.id ===
      `question-${week >= 17 ? "ph2-" : ""}week${week}-assembly-${slug}`,
  ).question;
const checks = [];
for (const { question: q } of entries) {
  const lang = q.assembly.language;
  if (["js", "jsx"].includes(lang)) {
    const source = ts.createSourceFile(
      q.id,
      code(q),
      ts.ScriptTarget.Latest,
      true,
      lang === "jsx" ? ts.ScriptKind.TSX : ts.ScriptKind.JS,
    );
    assert.equal(source.parseDiagnostics.length, 0, q.id);
    if (lang === "js" && !/^\s*(?:import|export)\b/m.test(code(q)))
      new vm.Script(`(async function(){${code(q)}\n})`);
    checks.push({
      id: q.id,
      check: "TypeScript parser; JSはimport/export以外をasync関数内で構文確認",
    });
  }
  if (lang === "php") {
    const result = cp.spawnSync("php", ["-l"], {
      input: code(q),
      encoding: "utf8",
    });
    assert.equal(result.status, 0, q.id + result.stderr + result.stdout);
    checks.push({ id: q.id, check: "PHP CLI -l; 構文のみ" });
  }
}

const php = (week, slug, cases) => {
  const q = find(week, slug);
  for (const id of ["correct", "wrong"]) {
    let all = true;
    for (const [prefix, suffix, expected] of cases) {
      const script = `<?php\n${prefix}\n${code(q, id).replace(/^<\?php\s*/, "")}\n${suffix}`;
      const result = cp.spawnSync("php", ["-d", "display_errors=stderr"], {
        input: script,
        encoding: "utf8",
        timeout: 3000,
      });
      all &&=
        result.status === 0 && !result.stderr && result.stdout === expected;
    }
    assert.equal(all, id === "correct", `${q.id}/${id}`);
  }
  checks.push({
    id: q.id,
    check: "PHP CLI; 正答と主要誤答を固定入力で比較",
    cases: cases.length,
  });
};
php(18, "assoc-person", [
  ["", "echo json_encode($person);", '{"name":"Aoi","age":20}'],
]);
php(18, "array-lookup", [["", "", "Aoi"]]);
php(18, "range-loop", [["", "", "2 3 4 5 "]]);
php(18, "foreach-total", [["", "", "600"]]);
php(18, "concat-product", [["", "", "商品: apple"]]);
php(23, "substring", [["", "", "サントリー"]]);
php(23, "implode-list", [["", "", "2-4-6"]]);
php(23, "round-one", [["", "echo $rounded;", "4"]]);
php(23, "map-round", [
  [
    "function round_number($value) { return round($value); }",
    "echo json_encode($result);",
    "[1,3]",
  ],
]);
php(23, "function-return", [["", "echo json_encode(round_number(3.6));", "4"]]);
php(24, "get-keyword", [
  [
    '$_GET=["keyword"=>"quiz"]; $_POST=["keyword"=>"post"];',
    "echo $keyword;",
    "quiz",
  ],
]);
php(24, "post-name", [
  [
    '$_POST=["nickname"=>"Aoi"]; $_GET=["nickname"=>"query"];',
    "echo $nickname;",
    "Aoi",
  ],
]);
const stmt =
  "class Statement { public $values=[]; function bindValue($key,$value){$this->values[$key]=$value;} function execute(){} } $stmt=new Statement;";
php(24, "bind-content", [
  [
    stmt + '$content="question";',
    "echo json_encode($stmt->values);",
    '{":content":"question"}',
  ],
]);
php(25, "bind-update", [
  [
    stmt + '$id=7;$name="Aoi";',
    "echo json_encode($stmt->values);",
    '{":name":"Aoi",":id":7}',
  ],
]);
php(26, "store-user-id", [
  ["$_SESSION=[];", "echo json_encode($_SESSION);", '{"id":7}'],
]);
php(
  27,
  "email-validation",
  ["invalid", "a@example.com"].map((v) => [
    `$email=${JSON.stringify(v)};`,
    "",
    v === "invalid" ? "メール形式エラー" : "",
  ]),
);
php(
  27,
  "empty-required",
  ["", "a@example.com"].map((v) => [
    `$email=${JSON.stringify(v)};`,
    "",
    v === "" ? "必須" : "",
  ]),
);
php(
  27,
  "ascii-length",
  ["abc", "abcd", "abcde"].map((v) => [
    `$password=${JSON.stringify(v)};`,
    "",
    v.length < 4 ? "4文字以上にしてください" : "",
  ]),
);
php(27, "hash-password", [
  [
    '$password="Correct123";',
    'echo password_verify($password,$passwordHash)?"OK":"NG";',
    "OK",
  ],
]);
php(
  27,
  "verify-password",
  ["Correct123", "Wrong"].map((v) => [
    `$password=${JSON.stringify(v)}; $storedHash=password_hash("Correct123",PASSWORD_DEFAULT);`,
    "",
    v === "Correct123" ? "認証成功" : "",
  ]),
);
const study =
  'class Study { function get_day(){return "2022-06-14";} function get_hours(){return 3;} } $study=new Study; $studies=[$study];';
php(31, "study-pair", [[study, "echo json_encode($row);", '["2022-06-14",3]']]);
php(31, "map-studies", [
  [study, "echo json_encode($data);", '[["2022-06-14",3]]'],
]);
php(31, "encode-chart", [
  ['$data=[["2022-06-14",3]];', "echo $chartData;", '[["2022-06-14",3]]'],
]);

const js = async (week, slug, cases) => {
  const q = find(week, slug);
  for (const id of ["correct", "wrong"]) {
    let all = true;
    for (const [prefix, suffix, expected] of cases) {
      try {
        const actual = await vm.runInNewContext(
          `(async()=>{${prefix}\n${code(q, id)}\n${suffix}})()`,
          {},
          { timeout: 300 },
        );
        all &&= JSON.stringify(actual) === JSON.stringify(expected);
      } catch {
        all = false;
      }
    }
    assert.equal(all, id === "correct", `${q.id}/${id}`);
  }
  checks.push({
    id: q.id,
    check: "Node VM; 外部通信なし・固定入力で正答と主要誤答を比較",
    cases: cases.length,
  });
};
(async () => {
  await js(7, "read-number", [
    [
      'const priceInput={value:"1200"};',
      'return typeof price+":"+price;',
      "number:1200",
    ],
  ]);
  await js(10, "await-json", [
    [
      'const response={json:async()=>({name:"Aoi"})};let logged;const console={log:v=>{logged=v;}};',
      "await read(response);return logged.name;",
      "Aoi",
    ],
  ]);
  await js(10, "render-name", [
    [
      'const nameEl={};const data={name:"佐藤",email:"sato@example.invalid"};',
      "return nameEl.textContent;",
      "佐藤",
    ],
  ]);
  await js(11, "ai-number-repair", [
    ['const priceInput={value:"800"};', "return total;", 1000],
  ]);
  await js(
    11,
    "ai-upper-bound",
    [9, 10].map((n) => [`let count=${n};const MAX=10;`, "return count;", 10]),
  );
  await js(32, "async-json", [
    [
      "const response={json:async()=>({id:7})};",
      "return typeof result.id;",
      "number",
    ],
  ]);
  await js(32, "post-delete", [
    [
      'const id=7,url="local";let saved;const fetch=(u,o)=>{saved=o;};',
      "return saved.body;",
      "delete-id=7",
    ],
  ]);
  await js(32, "chart-columns", [
    [
      "const columns=[];const data={addColumn:(...c)=>columns.push(c)};",
      "return columns;",
      [
        ["string", "日付"],
        ["number", "時間"],
      ],
    ],
  ]);
  await js(
    32,
    "http-guard",
    [true, false].map((ok) => [
      `const response={ok:${ok}}, element={remove(){this.removed=true;}};let thrown=false;try {`,
      "}catch{thrown=true;}return [!!element.removed,thrown];",
      [ok, !ok],
    ]),
  );
  await js(32, "remove-target", [
    [
      "const todoItem={remove(){this.removed=true;}},button={remove(){this.removed=true;}};",
      "return [!!todoItem.removed,!!button.removed];",
      [true, false],
    ],
  ]);
  const phpVersion = cp
    .spawnSync("php", ["-v"], { encoding: "utf8" })
    .stdout.split("\n")[0];
  fs.writeFileSync(
    path.join(root, "docs/quiz-reviews/assembly-example-checks.json"),
    JSON.stringify(
      { environment: { node: process.version, php: phpVersion }, checks },
      null,
      2,
    ) + "\n",
  );
  console.log(
    JSON.stringify({
      syntaxQuestions: entries.filter((e) =>
        ["php", "js", "jsx"].includes(e.question.assembly.language),
      ).length,
      checks: checks.length,
    }),
  );
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
