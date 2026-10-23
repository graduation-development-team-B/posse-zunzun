// 作者向けの任意確認。Laravel本体・DB・外部サービスは実行しない。
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const cp = require("node:child_process");
const vm = require("node:vm");
const ts = require("typescript");
const { root, load } = require("./content-lib.cjs");
const entries = load().entries.filter((e) =>
  e.question.id.startsWith("question-ph3-") && e.question.assembly,
);
const questions = entries.map((e) => e.question);
const results = [];
const find = (week, slug) =>
  questions.find((q) => q.id === `question-ph3-week${week}-assembly-${slug}`);
const text = (q, id) => q.payload.options.find((o) => o.id === id).text;
const code = (q, id = "correct") =>
  q.payload.content.replace(q.payload.blankToken, () => text(q, id));
for (const q of questions) {
  const lang = q.assembly.language;
  let check = "静的意味レビューのみ。Blade/Laravelは実行しない。";
  if (lang === "php") {
    const r = cp.spawnSync("php", ["-l"], { input: code(q), encoding: "utf8" });
    assert.equal(r.status, 0, q.id + r.stderr);
    check = "PHP CLI -lで正答の構文確認。Laravel実行ではない。";
  } else if (lang === "js") {
    const parsed = ts.createSourceFile(
      q.id,
      code(q),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.JS,
    );
    assert.equal(parsed.parseDiagnostics.length, 0, q.id);
    check = "TypeScript parserでJSの正答構文確認。";
  } else if (lang === "sh") {
    const r = cp.spawnSync("/bin/sh", ["-n"], {
      input: code(q),
      encoding: "utf8",
    });
    assert.equal(r.status, 0, q.id + r.stderr);
    check = "sh -nによる構文確認のみ。コマンドは実行しない。";
  }
  results.push({ id: q.id, check });
}
function phpCandidates(q, cases, makeScript) {
  const outcomes = {};
  for (const id of ["correct", "wrong"]) {
    outcomes[id] = cases.every((c) => {
      const r = cp.spawnSync("php", ["-d", "display_errors=stderr"], {
        input: makeScript(q, id, c),
        encoding: "utf8",
        timeout: 3000,
      });
      return c.error
        ? r.status !== 0
        : r.status === 0 && !r.stderr && r.stdout === c.expected;
    });
  }
  assert.deepEqual(outcomes, { correct: true, wrong: false }, q.id);
  results.find((r) => r.id === q.id).nativeChecks = {
    cases: cases.length,
    outcomes,
    note: "PHPの型・比較だけを固定データで確認。Laravelの動作検証ではない。",
  };
}
phpCandidates(
  find(39, "integer-signature"),
  [
    { value: 1, expected: "2" },
    { value: 0, expected: "1" },
    { value: null, error: true },
  ],
  (q, id, c) =>
    code(q, id) + `\necho incrementNumber(${JSON.stringify(c.value)});`,
);
for (const [week, slug] of [
  [40, "gate-admin"],
  [47, "define-admin-gate"],
]) {
  phpCandidates(
    find(week, slug),
    [
      { value: true, expected: "true" },
      { value: false, expected: "false" },
    ],
    (q, id, c) =>
      `<?php\n$user=(object)['is_admin'=>${c.value ? "true" : "false"}];\necho json_encode(${text(q, id)});`,
  );
}
phpCandidates(
  find(48, "comment-owner-policy"),
  [
    { user: 7, owner: 7, id: 1, expected: "true" },
    { user: 7, owner: 8, id: 7, expected: "false" },
  ],
  (q, id, c) =>
    `<?php\nclass User {public $id;} class Comment {public $id;public $user_id;}\n` +
    code(q, id).replace(/^<\?php\s*/, "") +
    `\n$user=new User;$user->id=${c.user};$comment=new Comment;$comment->id=${c.id};$comment->user_id=${c.owner};echo json_encode(update($user,$comment));`,
);
const js = find(42, "all-up-buttons");
for (const id of ["correct", "wrong"]) {
  const calls = [];
  vm.runInNewContext(
    code(js, id),
    {
      document: {
        querySelectorAll: () =>
          [1, 2].map(() => ({
            addEventListener: (event) => calls.push(event),
          })),
      },
      upToSortNumber: () => {},
    },
    { timeout: 300 },
  );
  assert.equal(
    JSON.stringify(calls) === JSON.stringify(["click", "click"]),
    id === "correct",
  );
}
results.find((r) => r.id === js.id).nativeChecks = {
  cases: 2,
  note: "2個のテスト用ボタンへの登録呼び出しを照合。ブラウザDOM実行ではない。",
};
fs.writeFileSync(
  path.join(root, "docs/quiz-reviews/ph3-example-checks.json"),
  JSON.stringify(
    {
      environment: {
        node: process.version,
        php: cp
          .spawnSync("php", ["-v"], { encoding: "utf8" })
          .stdout.split("\n")[0],
      },
      questions: questions.length,
      results,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  JSON.stringify({
    questions: questions.length,
    syntax: questions.filter((q) => q.assembly.language !== "blade").length,
    staticBlade: 11,
    nativeComparisonQuestions: 5,
  }),
);
