const path = require("node:path");
const fs = require("node:fs");
const { root, read, write } = require("./content-lib.cjs");
const args = process.argv.slice(2);
const key = args.includes("--week") ? args[args.indexOf("--week") + 1] : "";
if (!/^week[1-9]\d*$/.test(key))
  throw new Error("--week week7 のように指定してください");
const units = read(path.join(root, "content/units.json"));
if (units.some((u) => u.key === key))
  throw new Error("登録済みのWeekは上書きしません");
const n = Number(key.slice(4));
const phase = args.includes("--phase")
  ? args[args.indexOf("--phase") + 1]
  : "PH1";
if (
  !/^PH[1-3]$/.test(phase) ||
  !fs.existsSync(path.join(root, "content", phase, "catalog-base.json"))
)
  throw new Error("登録済みのphaseを指定してください（例: --phase PH2）");
const file = `${phase}/weeks/week${String(n).padStart(2, "0")}.json`;
if (fs.existsSync(path.join(root, "content", file)))
  throw new Error("既存ファイルを上書きしません");
write(path.join(root, "content", file), []);
write(path.join(root, "content/units.json"), [
  ...units,
  {
    id: `week-unit-${key}`,
    key,
    order: Math.max(n, ...units.map((u) => u.order + 1)),
    title: `Week${String(n).padStart(2, "0")}`,
    published: true,
    deleted: false,
    phase,
    file,
    minQuestions: 10,
    maxQuestions: 15,
  },
]);
console.log(
  `${file}を作成しました。空の単元は配信されません。教材を読んで10〜15問をdraftで作成してください。`,
);
