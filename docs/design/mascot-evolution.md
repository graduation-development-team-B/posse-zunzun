# 熱中くんの進化

2026-10-23。ユーザー提供の「炎のマスコット進化ロードマップ.png」に合わせて、10段階の姿をホーム・記録・学習完了画面へ接続した。

## レベルとXP

100XPごとに1レベル上昇する既存の計算を維持。保存済みXPや回答記録の書き換えは不要。

| 段階 | レベル | 姿 |
|---|---|---|
| たまご期 | 初期〜19（ロードマップの表示はLv.10） | 卵から生まれた炎 |
| ひよこ期 | 20〜29 | 両手を広げた小さな炎 |
| まなび期 | 30〜39 | ウインクする炎 |
| やる気期 | 40〜49 | 力強い炎 |
| 成長期 | 50〜59 | 虹色の炎と本 |
| 探求期 | 60〜69 | マントと本 |
| 実践期 | 70〜79 | ゴーグルとリュック |
| 達成期 | 80〜89 | 鎧とマント |
| マスター期 | 90〜99 | 魔法の杖 |
| レジェンド期 | 100以降 | サングラスで車に乗る炎 |

Lv.50の必要累計XPは4900。例：累計4775XPはLv.48で次のレベルまで25XP、次の進化まで125XP。レベルアップと姿の進化を表示でも区別する。Lv.100以降もXPを加算でき、レジェンドの姿を保つ。

定義はsrc/lib/progress/evolution.tsに集約。完了画面の姿はXpRewardの表示レベルに同期し、ゲージが満タンになって繰り上がった時点で次の姿へ変更する。進化したときだけフェード表示。動きを抑える設定では演出を抑制する。

## 画像

- 提供画像の内容をもとに、組み込みimage_genツールでキャラクターと小物を保持した透過アトラスを作成した。元画像からの画素単位の切り抜きではなく、生成ツールで整えた派生画像。
- 使用画像：[evolution-atlas.png](../../assets/images/nettyu/evolution-atlas.png)。RGBA、1983×793px、約1.8MB。5列×2行の1枚を全段階で共有し、Viewの領域で各セルを表示する。画像編集用の外部ライブラリ・アプリの新しい依存は追加しない。
- クイズの正答・誤答など、既存の表情用画像はそのまま使用する。

最初の指示は、提供された10キャラクターを順番どおり5列×2行の透過画像にまとめ、文字・矢印・カード背景・街並みを外し、衣装・表情・本・杖・車を保持するもの。生成後、マスター期と車の画像の重なりを解消するために次のプロンプトでレイアウトだけを再調整した。

### 最終の画像編集プロンプト

```text
Precise layout-only edit of this existing transparent sprite atlas. Preserve all TEN illustrations and the exact ordering, rendering, colors, faces, props, car and alpha background. Change ONLY their scale and position to enforce a strict grid: FIVE columns by TWO rows, ten equal SQUARE cells. Each ENTIRE illustration including ALL glow, sparks, staff, cape, and the full car must fit inside the central 76% width and 76% height of its cell. Leave at least 12% completely TRANSPARENT padding on ALL four sides of EACH cell. In particular, the bottom-row purple mage and the black sedan MUST NOT overlap each other or touch adjacent cells; shrink the car to fit entirely inside the last square cell, even though it is wide. Keep all ten subjects complete, no clipping. There must be very obvious transparent gutters separating each pair of sprites. No text, no panels, no border, no floor/background, no checkerboard pixels. Actual alpha transparency. Do not enlarge subjects to fill empty canvas: the generous transparent padding is an essential technical requirement. Canvas aspect ratio 5:2, one single transparent atlas, five columns and two rows, all cells equal sized.
```

## 確認

- tests/ui/evolution.test.mjs：全段階の境界前後、初期とLv.100以降、次の進化までのXP、ゲージの満タン後の進化、10セルと透過PNG。
- 既存のXP演出テストとデザインの比較を維持する。
- Chrome localhost、390×844でホームと記録の表示、現在の段階への自動スクロール、進化一覧を確認。
- tests/manual/mascot-evolution-preview.tsxを一時的な開発ルートへ配置し、Lv.49→50、Lv.99→100のXP演出と画像切り替えを確認した。確認後にルートを削除し、出力へ含めない。
- Native実機での確認と本番配信は別途。

最終結果：コンテンツ833件、UI21件が成功。型チェック・lint・Web出力も成功。Web出力の19ルートへ確認専用ルートが混入しないことを確認した。390px幅でページ全体の横はみ出しなし。画像の読み上げラベル（現在の姿・解放済み・未解放）と、ロードマップ末尾までの横スクロールも実画面で確認。Expo ImageではaccessibilityLabelを明示し、全段階の共通アトラスをmemory-diskキャッシュで共有する。

## レジェンド期の初回公開

Lv.100未満の進化一覧では、レジェンド期の絵を描画せず「？」で表示する。名前と解放条件のLv.100は表示する。読み上げは「レジェンド期の姿はLv.100で解放」。累計9900XPでLv.100に達するとロックが外れ、本来の姿を初めて表示する。ほかの未解放段階は従来のグレー表示を維持する。
