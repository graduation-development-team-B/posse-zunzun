const path = require("node:path");
const fs = require("node:fs");
const {
  root,
  load,
  validate,
  generate,
  write,
  mode,
  targets,
} = require("./content-lib.cjs");
const data = load();
const issues = validate(data);
if (issues.length) {
  console.error(issues.join("\n"));
  process.exit(1);
}
const response = generate(data);
write(path.join(root, "src/data/generated/catalog.json"), response);
for (const unit of data.units) {
  const entries = data.rows
    .filter((r) => r.unit.id === unit.id)
    .map((r) => r.entry);
  const lines = [
    `# ${unit.title}`,
    "",
    `${entries.length}問。${targets.map((t) => `${t}: ${entries.filter((e) => e.author.target === t).length}`).join(" / ")}`,
    "",
    "作者向け資料。独立問題。公開されるのは制作状態publishedの問題。",
    "",
  ];
  for (const { question: q, author: a, status } of entries) {
    lines.push(
      `## ${q.id}（版${a.revision}・${status}）`,
      "",
      `- 形式: ${mode(q)}`,
      `- 主対象: ${a.target}`,
      `- 学習目標: ${a.objective}`,
      `- 出典: ${a.source.path}:${a.source.line} / ${a.source.heading}`,
      `- ドリル接続: ${a.drillConnection}`,
      `- 既習: ${a.priorKnowledge}`,
      `- 概念: ${a.conceptId}`,
      `- 類題: ${a.variantGroup} / ${a.variantNote}`,
      `- 依存: ${a.dependency}`,
      "",
      q.prompt,
      "",
    );
    const p = q.payload;
    if (p.content || p.code)
      lines.push(
        "```" + (a.codeLanguage ?? (q.console ? "js" : "html")),
        p.content || p.code,
        "```",
        "",
      );
    if (p.options)
      lines.push(
        ...p.options.map(
          (o) =>
            `- ${o.id}: ${o.text}${o.id === p.correctOptionId ? "（正答）" : ""}`,
        ),
        "",
      );
    const stage = response.catalog.activities
      .flatMap((x) => x.stages)
      .find((s) => s.id === p.stageId);
    if (stage)
      lines.push(
        `初期状態: /${stage.startCwd.join("/")}`,
        "必要な操作:",
        "```",
        ...stage.goal.commandSequence.map((x) => x.join(" ")),
        "```",
        "",
      );
    lines.push(
      `達成条件: ${a.success}`,
      "",
      `ヒント: ${a.hint}`,
      "",
      `解説: ${q.explanation}`,
      "",
      `採点: ${a.grading}`,
      "",
      `検証: ${a.validation}`,
      "",
    );
    if (p.incorrectReasons)
      lines.push(
        ...Object.entries(p.incorrectReasons).map(
          ([id, reason]) => `- 誤答${id}: ${reason}`,
        ),
        "",
      );
    if (q.console)
      lines.push("期待出力:", "```", ...q.console.expectedOutput, "```", "");
  }
  const file = path.join(root, "docs/quiz-contents", unit.key + ".md");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, lines.join("\n"));
}
console.log(
  `生成成功: ${response.catalog.weekUnits.length}単元・${response.catalog.questions.length}問 / ${response.contentVersion}`,
);
