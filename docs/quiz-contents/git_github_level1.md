# Git/GitHub Level 1｜基本操作とPull Request

10問。言葉の理解: 2 / 知識の選択: 3 / 知識の組み立て: 3 / 結果の確認・修正: 2

作者向け資料。独立問題。公開されるのは制作状態publishedの問題。

## question-git-level1-001-pwd（版2・published）

- 形式: terminal
- 主対象: 言葉の理解
- 学習目標: 模擬環境で問題に指定された操作を実行する：いま作業しているディレクトリのフルパスを確認しよう。
- 出典: curriculum/PH1/PH1_Git_GitHub_Level_1.md:15 / 2. ターミナルの基本
- ドリル接続: Git/GitHub Level 1：ターミナル操作→変更の記録→共有→PR→手元への反映。Git単元に対応するmini-drillフォルダはなく、教材の操作練習に対応
- 既習: Git/GitHub Level 1のインプット（実機のGit操作は不要）
- 概念: git_github_level1-section-2
- 類題: git_github_level1-section-2 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

いま作業しているディレクトリのフルパスを確認しよう。

初期状態: /sample-ph1-github
必要な操作:
```
pwd
```

達成条件: pwdで作業中の場所を確認できました。

ヒント: 現在地を表示する3文字のコマンドを選びます。

解説: pwdは現在作業しているディレクトリのフルパスを表示します。操作前に現在地を確認すると、別の場所でGitコマンドを実行するミスを防げます。

採点: 教材で指定した操作列をシミュレーターで判定。実際のGitの全操作・全状態は再現しない。複数操作の問題は指定順序も練習対象。

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

## question-git-level1-002-cd（版2・published）

- 形式: terminal
- 主対象: 知識の選択
- 学習目標: 模擬環境で問題に指定された操作を実行する：sample-ph1-githubにあるassetsディレクトリへ移動しよう。
- 出典: curriculum/PH1/PH1_Git_GitHub_Level_1.md:15 / 2. ターミナルの基本
- ドリル接続: Git/GitHub Level 1：ターミナル操作→変更の記録→共有→PR→手元への反映。Git単元に対応するmini-drillフォルダはなく、教材の操作練習に対応
- 既習: Git/GitHub Level 1のインプット（実機のGit操作は不要）
- 概念: git_github_level1-section-2
- 類題: git_github_level1-section-2 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

sample-ph1-githubにあるassetsディレクトリへ移動しよう。

初期状態: /sample-ph1-github
必要な操作:
```
cd assets
```

達成条件: cd assetsで作業ディレクトリを移動できました。

ヒント: change directoryの略と、移動先の名前を順に選びます。

解説: cdはchange directoryの略で、後ろに指定したディレクトリへ移動します。lsで移動先の名前を確認してからcd assetsを実行すると安全です。

採点: 教材で指定した操作列をシミュレーターで判定。実際のGitの全操作・全状態は再現しない。複数操作の問題は指定順序も練習対象。

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

## question-git-level1-003-clone（版2・published）

- 形式: terminal
- 主対象: 知識の選択
- 学習目標: 模擬環境で問題に指定された操作を実行する：GitHubの練習用リポジトリをworkspaceへ複製しよう。
- 出典: curriculum/PH1/PH1_Git_GitHub_Level_1.md:18 / 5. Git を使ってみよう
- ドリル接続: Git/GitHub Level 1：ターミナル操作→変更の記録→共有→PR→手元への反映。Git単元に対応するmini-drillフォルダはなく、教材の操作練習に対応
- 既習: Git/GitHub Level 1のインプット（実機のGit操作は不要）
- 概念: git_github_level1-section-5
- 類題: git_github_level1-section-5 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

GitHubの練習用リポジトリをworkspaceへ複製しよう。

初期状態: /
必要な操作:
```
git clone https://github.com/posse-ap/sample-ph1-github.git
```

達成条件: git cloneでリモートリポジトリを複製できました。

ヒント: git、複製する操作、リポジトリURLの順です。

解説: git clone URLを実行すると、リモートリポジトリの内容がカレントディレクトリへ複製されます。実行前にpwdで保存先を確認しておくと安心です。

採点: 教材で指定した操作列をシミュレーターで判定。実際のGitの全操作・全状態は再現しない。複数操作の問題は指定順序も練習対象。

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

## question-git-level1-004-fetch（版2・published）

- 形式: terminal
- 主対象: 言葉の理解
- 学習目標: 模擬環境で問題に指定された操作を実行する：GitHubで作成した新しいブランチ情報を取得しよう。
- 出典: curriculum/PH1/PH1_Git_GitHub_Level_1.md:17 / 4. Git、GitHub 基礎知識
- ドリル接続: Git/GitHub Level 1：ターミナル操作→変更の記録→共有→PR→手元への反映。Git単元に対応するmini-drillフォルダはなく、教材の操作練習に対応
- 既習: Git/GitHub Level 1のインプット（実機のGit操作は不要）
- 概念: git_github_level1-section-4
- 類題: git_github_level1-section-4 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

GitHubで作成した新しいブランチ情報を取得しよう。

初期状態: /sample-ph1-github
必要な操作:
```
git fetch
```

達成条件: git fetchでリモートの最新情報を取得できました。

ヒント: 作業ファイルを変えず、リモートの最新情報だけを取得する操作です。

解説: この説明は正しいです。GitHubで新しいブランチを作った後はgit fetchで情報を取得できますが、作業中のファイル自体はその操作だけでは更新されません。

採点: 教材で指定した操作列をシミュレーターで判定。実際のGitの全操作・全状態は再現しない。複数操作の問題は指定順序も練習対象。

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

## question-git-level1-005-checkout（版2・published）

- 形式: terminal
- 主対象: 知識の選択
- 学習目標: 模擬環境で問題に指定された操作を実行する：編集を始める前にfeature_0.0_nameへ切り替えよう。
- 出典: curriculum/PH1/PH1_Git_GitHub_Level_1.md:18 / 5. Git を使ってみよう
- ドリル接続: Git/GitHub Level 1：ターミナル操作→変更の記録→共有→PR→手元への反映。Git単元に対応するmini-drillフォルダはなく、教材の操作練習に対応
- 既習: Git/GitHub Level 1のインプット（実機のGit操作は不要）
- 概念: git_github_level1-section-5
- 類題: git_github_level1-section-5 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

編集を始める前にfeature_0.0_nameへ切り替えよう。

初期状態: /sample-ph1-github
必要な操作:
```
git checkout feature_0.0_name
```

達成条件: 作業用のfeatureブランチへ切り替えられました。

ヒント: git、ブランチを切り替える操作、作業ブランチ名の順です。

解説: git checkout ブランチ名で作業ブランチを切り替えます。編集前に目的のfeatureブランチへ移動できているか、git statusでも確認しましょう。

採点: 教材で指定した操作列をシミュレーターで判定。実際のGitの全操作・全状態は再現しない。複数操作の問題は指定順序も練習対象。

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

## question-git-level1-006-add-files（版2・published）

- 形式: terminal
- 主対象: 結果の確認・修正
- 学習目標: 模擬環境で問題に指定された操作を実行する：変更した2ファイルを、index.html → assets/img/me.pngの順に1ファイルずつコミット対象へ追加しよう。
- 出典: curriculum/PH1/PH1_Git_GitHub_Level_1.md:18 / 5. Git を使ってみよう
- ドリル接続: Git/GitHub Level 1：ターミナル操作→変更の記録→共有→PR→手元への反映。Git単元に対応するmini-drillフォルダはなく、教材の操作練習に対応
- 既習: Git/GitHub Level 1のインプット（実機のGit操作は不要）
- 概念: git_github_level1-section-5
- 類題: git_github_level1-section-5 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

変更した2ファイルを、index.html → assets/img/me.pngの順に1ファイルずつコミット対象へ追加しよう。

初期状態: /sample-ph1-github
必要な操作:
```
git add index.html
git add assets/img/me.png
```

達成条件: 2つの変更をコミット対象へ追加できました。

ヒント: まずindex.html、次にassets/img/me.pngをgit addします。1回ずつ実行できます。

解説: git commitに含まれるのはgit addでステージングした変更です。画像も含めるには、コミット前にgit add assets/img/me.pngを実行する必要があります。

採点: 教材で指定した操作列をシミュレーターで判定。実際のGitの全操作・全状態は再現しない。複数操作の問題は指定順序も練習対象。

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

## question-git-level1-007-commit（版2・published）

- 形式: terminal
- 主対象: 知識の組み立て
- 学習目標: 模擬環境で問題に指定された操作を実行する：ステージング済みの変更を「自己紹介を更新」というメッセージで記録しよう。
- 出典: curriculum/PH1/PH1_Git_GitHub_Level_1.md:18 / 5. Git を使ってみよう
- ドリル接続: Git/GitHub Level 1：ターミナル操作→変更の記録→共有→PR→手元への反映。Git単元に対応するmini-drillフォルダはなく、教材の操作練習に対応
- 既習: Git/GitHub Level 1のインプット（実機のGit操作は不要）
- 概念: git_github_level1-section-5
- 類題: git_github_level1-section-5 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

ステージング済みの変更を「自己紹介を更新」というメッセージで記録しよう。

初期状態: /sample-ph1-github
必要な操作:
```
git commit -m "自己紹介を更新"
```

達成条件: 変更をローカルリポジトリの履歴へ記録できました。

ヒント: git commitに-mを付け、その後ろに引用符付きのメッセージを置きます。

解説: git commit -m "メッセージ"で、git addした変更をローカルリポジトリの履歴として記録します。何を変更したか分かる短いメッセージを付けましょう。

採点: 教材で指定した操作列をシミュレーターで判定。実際のGitの全操作・全状態は再現しない。複数操作の問題は指定順序も練習対象。

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

## question-git-level1-008-push（版2・published）

- 形式: terminal
- 主対象: 知識の組み立て
- 学習目標: 模擬環境で問題に指定された操作を実行する：作成したコミットをoriginのfeature_0.0_nameへ送ろう。
- 出典: curriculum/PH1/PH1_Git_GitHub_Level_1.md:18 / 5. Git を使ってみよう
- ドリル接続: Git/GitHub Level 1：ターミナル操作→変更の記録→共有→PR→手元への反映。Git単元に対応するmini-drillフォルダはなく、教材の操作練習に対応
- 既習: Git/GitHub Level 1のインプット（実機のGit操作は不要）
- 概念: git_github_level1-section-5
- 類題: git_github_level1-section-5 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

作成したコミットをoriginのfeature_0.0_nameへ送ろう。

初期状態: /sample-ph1-github
必要な操作:
```
git push origin feature_0.0_name
```

達成条件: featureブランチのコミットをGitHubへ送信できました。

ヒント: git、送信する操作、リモート名、ブランチ名の順です。

解説: git push origin ブランチ名で、ローカルのコミットをorigin上の指定ブランチへアップロードします。push後にGitHubで変更を確認できます。

採点: 教材で指定した操作列をシミュレーターで判定。実際のGitの全操作・全状態は再現しない。複数操作の問題は指定順序も練習対象。

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

## question-git-level1-009-pr（版2・published）

- 形式: terminal
- 主対象: 知識の組み立て
- 学習目標: 模擬環境で問題に指定された操作を実行する：Pull Requestでfeature_0.0_nameの変更をmain_0.0_nameへ反映する向きを設定しよう。
- 出典: curriculum/PH1/PH1_Git_GitHub_Level_1.md:19 / 6. GitHub で Pull Request (PR) を使ってコードを反映してみよう
- ドリル接続: Git/GitHub Level 1：ターミナル操作→変更の記録→共有→PR→手元への反映。Git単元に対応するmini-drillフォルダはなく、教材の操作練習に対応
- 既習: Git/GitHub Level 1のインプット（実機のGit操作は不要）
- 概念: git_github_level1-section-6
- 類題: git_github_level1-section-6 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

Pull Requestでfeature_0.0_nameの変更をmain_0.0_nameへ反映する向きを設定しよう。

初期状態: /sample-ph1-github
必要な操作:
```
base: main_0.0_name compare: feature_0.0_name
```

達成条件: baseとcompareを正しい向きで設定できました。

ヒント: baseは反映先、compareは変更を持っている作業ブランチです。

解説: Pull Requestではbaseが変更の反映先、compareが変更を持つ作業ブランチです。マージ前にbaseとcompareの向きを必ず確認しましょう。

採点: 教材で指定した操作列をシミュレーターで判定。実際のGitの全操作・全状態は再現しない。複数操作の問題は指定順序も練習対象。

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

## question-git-level1-010-pull（版2・published）

- 形式: terminal
- 主対象: 結果の確認・修正
- 学習目標: 模擬環境で問題に指定された操作を実行する：Mergedされた変更を手元のmain_0.0_nameへ取り込もう。
- 出典: curriculum/PH1/PH1_Git_GitHub_Level_1.md:20 / 7. 反映されたか確認してみよう
- ドリル接続: Git/GitHub Level 1：ターミナル操作→変更の記録→共有→PR→手元への反映。Git単元に対応するmini-drillフォルダはなく、教材の操作練習に対応
- 既習: Git/GitHub Level 1のインプット（実機のGit操作は不要）
- 概念: git_github_level1-section-7
- 類題: git_github_level1-section-7 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

Mergedされた変更を手元のmain_0.0_nameへ取り込もう。

初期状態: /sample-ph1-github
必要な操作:
```
git checkout main_0.0_name
git pull origin main_0.0_name
```

達成条件: 正しいブランチへ切り替えてからマージ結果を取り込めました。

ヒント: 先に反映先ブランチへ切り替え、その後にoriginから同じブランチをpullします。

解説: まずgit checkout main_0.0_nameで反映先ブランチへ移動し、次にgit pull origin main_0.0_nameを実行します。切り替えと取り込みの順番が重要です。

採点: 教材で指定した操作列をシミュレーターで判定。実際のGitの全操作・全状態は再現しない。複数操作の問題は指定順序も練習対象。

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照
