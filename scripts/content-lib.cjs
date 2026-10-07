const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const root = path.resolve(__dirname, "..");
const targets = [
  "言葉の理解",
  "知識の選択",
  "知識の組み立て",
  "結果の確認・修正",
];
const modes = ["choice", "preview", "console", "terminal"];
const read = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const write = (file, value) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n");
};
function mode(q) {
  return q.console
    ? "console"
    : q.preview
      ? "preview"
      : q.payload.kind === "activityRef"
        ? "terminal"
        : "choice";
}
function load(project = root) {
  const units = read(path.join(project, "content/units.json"));
  const phases = [...new Set(units.map((u) => u.phase))];
  const bases = phases.map((phase) =>
    read(path.join(project, "content", phase, "catalog-base.json")),
  );
  const rows = units.flatMap((unit) =>
    read(path.join(project, "content", unit.file)).map((entry) => ({
      entry,
      unit,
    })),
  );
  return { units, bases, rows, entries: rows.map((r) => r.entry) };
}
function validate(data, options = {}) {
  const issues = [];
  const add = (id, message) => issues.push(`${id}: ${message}`);
  const ids = new Set();
  const unitIds = new Set();
  const keys = new Set();
  const activities = data.bases.flatMap((b) => b.catalog.activities);
  for (const unit of data.units) {
    if (unitIds.has(unit.id) || keys.has(unit.key))
      add(unit.key, "単元ID・キーが重複");
    unitIds.add(unit.id);
    keys.add(unit.key);
    if (
      !/^[a-z0-9_-]+$/.test(unit.key) ||
      !unit.file.startsWith(unit.phase + "/") ||
      unit.file.includes("..")
    )
      add(unit.key, "不正な単元設定");
    if (
      !Number.isInteger(unit.minQuestions) ||
      !Number.isInteger(unit.maxQuestions) ||
      unit.minQuestions < 10 ||
      unit.maxQuestions > 15 ||
      unit.minQuestions > unit.maxQuestions
    )
      add(unit.key, "問題数は10〜15問の範囲");
    const eligible = data.rows.filter(
      (r) =>
        r.unit.id === unit.id &&
        ["reviewed", "published"].includes(r.entry.status) &&
        !r.entry.question.deleted,
    );
    if (
      eligible.length &&
      (eligible.length < unit.minQuestions ||
        eligible.length > unit.maxQuestions)
    )
      add(unit.key, "レビュー・公開対象の件数が範囲外");
  }
  for (const { entry: e, unit } of data.rows) {
    const q = e.question;
    const a = e.author;
    const id = q?.id ?? unit.key;
    if (!q || !a) {
      add(id, "question・authorが必要");
      continue;
    }
    if (ids.has(q.id) || typeof q.id !== "string" || !q.id)
      add(id, "問題IDが空または重複");
    ids.add(q.id);
    if (options.week && unit.key !== options.week) continue;
    if (!["draft", "reviewed", "published"].includes(e.status))
      add(id, "制作状態が不正");
    if (q.published !== (e.status === "published"))
      add(id, "公開フラグと制作状態が不一致");
    if (q.weekUnitId !== unit.id || q.sourceReference?.weekKey !== unit.key)
      add(id, "単元参照が不一致");
    for (const key of ["prompt", "explanation"])
      if (typeof q[key] !== "string" || !q[key].trim()) add(id, `${key}が必要`);
    if (!targets.includes(a.target)) add(id, "主対象が4分類に含まれない");
    for (const key of [
      "objective",
      "conceptId",
      "variantGroup",
      "priorKnowledge",
      "drillConnection",
      "hint",
      "success",
      "grading",
      "validation",
    ])
      if (typeof a[key] !== "string" || !a[key].trim()) add(id, `${key}が必要`);
    if (!Number.isInteger(a.revision) || a.revision < 1)
      add(id, "問題の版が不正");
    if (!modes.includes(mode(q)) || (q.preview && q.console))
      add(id, "未対応または重複した実行形式");
    const p = q.payload;
    if (!p) {
      add(id, "payloadが必要");
      continue;
    }
    if (mode(q) === "terminal") {
      const activity = activities.find((x) => x.id === p.activityId);
      const stage = activity?.stages.find((x) => x.id === p.stageId);
      if (!stage || !stage.goal.commandSequence.length)
        add(id, "Git stageの参照が不正");
      else
        for (const command of stage.goal.commandSequence)
          if (
            !stage.commands.some(
              (x) => JSON.stringify(x.argv) === JSON.stringify(command),
            )
          )
            add(id, "完了に必要な操作が未定義");
    } else {
      if (
        !["singleChoice", "trueFalse", "bugDiagnosis", "fillBlank"].includes(
          q.format,
        ) ||
        !Array.isArray(p.options)
      ) {
        add(id, "未対応の問題・入力形式");
        continue;
      }
      if (
        new Set(p.options.map((x) => x.id)).size !== p.options.length ||
        p.options.some((x) => !x.id || !x.text)
      )
        add(id, "選択肢が不正");
      if (p.options.filter((x) => x.id === p.correctOptionId).length !== 1)
        add(id, "正答IDが不正");
      for (const o of p.options)
        if (o.id !== p.correctOptionId && !p.incorrectReasons?.[o.id])
          add(id, `誤答理由が不足: ${o.id}`);
      if (q.format === "bugDiagnosis" && !p.code) add(id, "診断用コードが必要");
      if (
        q.format === "fillBlank" &&
        (p.mode !== "choice" ||
          !p.blankToken ||
          p.content?.split(p.blankToken).length !== 2)
      )
        add(id, "穴埋め箇所は1箇所・候補選択のみ");
      if (
        (q.preview || q.console) &&
        (q.format !== "fillBlank" || p.mode !== "choice")
      )
        add(id, "実行形式には候補穴埋めが必要");
      if (q.console && !Array.isArray(q.console.expectedOutput))
        add(id, "期待出力が必要");
    }
    for (const support of a.supportingSources ?? []) {
      if (
        !support.path ||
        !Number.isInteger(support.line) ||
        support.line < 1 ||
        !/^[a-f0-9]{64}$/.test(support.sha256 ?? "")
      ) {
        add(id, "補足出典が不正");
        continue;
      }
      if (options.skipSources) continue;
      const workspace =
        options.workspace ??
        process.env.QUIZ_WORKSPACE ??
        path.resolve(root, "../");
      const file = path.resolve(workspace, support.path);
      if (
        !file.startsWith(path.resolve(workspace) + path.sep) ||
        !fs.existsSync(file)
      ) {
        add(id, `補足教材が見つからない: ${support.path}`);
        continue;
      }
      const text = fs.readFileSync(file, "utf8");
      if (
        crypto.createHash("sha256").update(text).digest("hex") !==
        support.sha256
      )
        add(
          id,
          `ドリル・補足教材が更新されているため再確認が必要: ${support.path}`,
        );
      if (
        support.heading &&
        !text.split("\n")[support.line - 1]?.includes(support.heading)
      )
        add(id, "補足出典の行と見出しが不一致");
    }
    const s = a.source;
    if (
      !s?.path ||
      !s.heading ||
      q.sourceReference?.sectionHeading !== s.heading ||
      !Number.isInteger(s.line) ||
      s.line < 1 ||
      !/^[a-f0-9]{64}$/.test(s.sha256 ?? "")
    )
      add(id, "出典が不正");
    else if (!options.skipSources) {
      const workspace =
        options.workspace ??
        process.env.QUIZ_WORKSPACE ??
        path.resolve(root, "../");
      const file = path.resolve(workspace, s.path);
      if (
        !file.startsWith(path.resolve(workspace) + path.sep) ||
        !fs.existsSync(file)
      )
        add(id, `教材が見つからない: ${s.path}（QUIZ_WORKSPACEを指定）`);
      else {
        const text = fs.readFileSync(file, "utf8");
        if (crypto.createHash("sha256").update(text).digest("hex") !== s.sha256)
          add(id, "教材が更新されているため出典の再確認が必要");
        if (!text.split("\n")[s.line - 1]?.includes(s.heading))
          add(id, "出典の行と見出しが不一致");
      }
    }
  }
  if (options.week && !keys.has(options.week))
    add(options.week, "未登録の単元");
  return [...new Set(issues)];
}
function generate(data) {
  const questions = data.entries
    .filter(
      (e) =>
        e.status === "published" && e.question.published && !e.question.deleted,
    )
    .map((e) => ({
      ...e.question,
      learning: {
        revision: e.author.revision,
        target: e.author.target,
        hint: e.author.hint,
        conceptId: e.author.conceptId,
        variantGroup: e.author.variantGroup,
      },
    }));
  const weekUnits = data.units
    .filter(
      (u) =>
        u.published &&
        !u.deleted &&
        questions.some((q) => q.weekUnitId === u.id),
    )
    .map(({ file, phase, minQuestions, maxQuestions, ...unit }) =>
      phase === "PH1" ? unit : { ...unit, phase },
    );
  const catalog = {
    weekUnits,
    questions,
    terms: data.bases.flatMap((b) => b.catalog.terms),
    activities: data.bases.flatMap((b) => b.catalog.activities),
  };
  const hash = crypto
    .createHash("sha256")
    .update(JSON.stringify(catalog))
    .digest("hex")
    .slice(0, 16);
  return {
    schemaVersion: 1,
    contentVersion: hash,
    updatedAt: data.bases[0].updatedAt,
    catalog,
  };
}
module.exports = {
  root,
  read,
  write,
  load,
  validate,
  generate,
  mode,
  targets,
  modes,
};
