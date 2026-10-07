const { load, validate } = require("./content-lib.cjs");
const args = process.argv.slice(2);
const week = args.includes("--week")
  ? args[args.indexOf("--week") + 1]
  : undefined;
const issues = validate(load(), { week });
if (issues.length) {
  console.error(issues.join("\n"));
  process.exit(1);
}
console.log(
  `${week ?? "全単元"}: コンテンツ検証成功（教材との意味の照合は別途レビュー）`,
);
