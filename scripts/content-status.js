const path = require("node:path");
const { root, read, write, load, validate } = require("./content-lib.cjs");
const args = process.argv.slice(2);
const arg = (key) => args[args.indexOf(key) + 1];
if (!args.includes("--week") || !args.includes("--status"))
  throw new Error("--weekと--statusが必要");
const key = arg("--week");
const status = arg("--status");
if (!["draft", "reviewed", "published"].includes(status))
  throw new Error("状態はdraft/reviewed/published");
const data = load();
const unit = data.units.find((u) => u.key === key);
if (!unit) throw new Error("単元が未登録");
const entries = read(path.join(root, "content", unit.file));
if (!entries.length) throw new Error("空の単元は昇格できません");
if (
  status === "published" &&
  entries.some((e) => !["reviewed", "published"].includes(e.status))
)
  throw new Error("公開前にレビューが必要です");
for (const e of entries) {
  e.status = status;
  e.question.published = status === "published";
}
const issues = validate(
  {
    ...data,
    rows: data.rows.map((r) =>
      r.unit.id === unit.id
        ? {
            ...r,
            entry: entries.find((e) => e.question.id === r.entry.question.id),
          }
        : r,
    ),
  },
  { week: key },
);
if (issues.length) throw new Error(issues.join("\n"));
write(path.join(root, "content", unit.file), entries);
console.log(
  `${key} → ${status}。意味のレビューは制作者が実施し、author.validationへ記録してください。`,
);
