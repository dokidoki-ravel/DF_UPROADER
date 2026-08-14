# ミラドキランド「24時間生放送」告知LP

ミラドキランドβ版公開記念「24時間ぶっ通し生放送」の告知用ランディングページです。

外部フレームワークを使わない、HTML・CSS・JavaScriptだけの静的Webサイトです。画像がまだない状態でも、各場所にデザイン済みのプレースホルダーが表示されます。

## LPの構成

| ファイル／フォルダ | 役割 |
| --- | --- |
| `index.html` | ページの文章、出演者カード、タイムテーブルなど |
| `style.css` | 色、レイアウト、スマートフォン表示、アニメーションなど |
| `script.js` | URL反映、YouTube埋め込み、メニュー、画像の仮表示など |
| `config.js` | YouTube、公式X、Makuake、公式サイトのURL設定 |
| `assets/images/` | 差し替え用の画像をまとめて置くフォルダ |

ページは次の順番で構成されています。

1. ヘッダー
2. メインビジュアル
3. 24時間生放送について
4. 番組の見どころ
5. 出演者
6. タイムテーブル
7. YouTube視聴
8. 公式X
9. Makuake（URL設定時だけ表示）
10. よくある質問
11. 最後の視聴案内
12. フッター

## ローカルで確認する方法

### 一番簡単な方法

`index.html` をダブルクリックし、ブラウザで開きます。

### ローカルサーバーで確認する方法（推奨）

このフォルダでターミナルを開き、次のコマンドを実行します。

```bash
python3 -m http.server 8000
```

ブラウザで次のURLを開きます。

```text
http://localhost:8000
```

終了するときは、ターミナルで `control` キーを押しながら `C` キーを押します。

## 画像の変更方法

作成した画像を、下記と同じファイル名で `assets/images/` に入れてください。既存ファイルがある場合は上書きするだけです。

| 用途 | ファイル | 表示の目安 |
| --- | --- | --- |
| ロゴ | `assets/images/logo.png` | 透過PNG・横長推奨 |
| HERO番組ロゴ | `assets/images/hero-logo.png` | 1591 × 895px前後 |
| メインキービジュアル | `assets/images/hero-visual.png` | 1920 × 1080px前後 |
| キャラクタービジュアル | `assets/images/characters.png` | 1920 × 1080px・透過PNG推奨 |
| ABOUT猫アイコン | `assets/images/about-cat.png` | 正方形・透過PNG推奨 |
| 放射状の背景 | `assets/images/pop-background.png` | 1920 × 1080px前後 |
| 番組タイトル | `assets/images/event-title.png` | 1920 × 1080px・透過PNG推奨 |
| 出演者1 | `assets/images/guest-01.png` | 1000 × 1250px前後 |
| 出演者2 | `assets/images/guest-02.jpg` | 1000 × 1250px前後 |
| 出演者3 | `assets/images/guest-03.jpg` | 1000 × 1250px前後 |
| 出演者4 | `assets/images/guest-04.jpg` | 1000 × 1250px前後 |
| 完成版タイムテーブル | `assets/images/timetable.jpg` | 横幅1600px以上推奨 |
| ページ下部ビジュアル | `assets/images/characters.png` | ABOUT画像と共用 |

画像の縦横比が少し異なっても、`object-fit: cover` などで枠内に収まるようにしてあります。出演者画像は人物の顔が中央付近にある素材がおすすめです。

同じファイル名ならHTMLの編集は不要です。PNG、WebPなど別の拡張子へ変更する場合だけ、`index.html` 内の該当する画像パスも同じ拡張子へ変更してください。各画像の場所には、検索しやすい日本語コメントがあります。

画像が存在しない場合は読み込みエラーのアイコンを見せず、「KEY VISUAL」「GUEST IMAGE」などのプレースホルダーを自動表示します。

## URLを変更する方法

URLはすべて `config.js` の冒頭で設定します。同じURLを `index.html` の複数箇所へ書く必要はありません。

| 項目 | 設定場所 |
| --- | --- |
| YouTube生放送 | `config.js` の `youtubeUrl` |
| 公式X | `config.js` の `xUrl` |
| Makuake | `config.js` の `makuakeUrl` |
| ミラドキランド公式サイト | `config.js` の `officialSiteUrl` |

設定例です。

```javascript
const SITE_CONFIG = {
  youtubeUrl: "https://www.youtube.com/watch?v=XXXXXXXXXXX",
  xUrl: "https://x.com/your_account",
  makuakeUrl: "https://www.makuake.com/project/your_project/",
  officialSiteUrl: "https://example.com/",
  shareText: "ミラドキランド開幕！24時間ぶっ通し生放送",
  shareHashtag: "ミラドキランド"
};
```

URLが未定の項目は `""` のままにしてください。YouTube、公式X、公式サイトは「近日公開」表示になり、押しても空ページへ移動しません。Makuakeは関連セクションとリンクが自動で非表示になります。

## YouTube URLの設定方法

`config.js` の `youtubeUrl` にURLを1回設定するだけで、次の場所へすべて自動反映されます。

- メインビジュアルの「24時間生放送を見る」ボタン
- WATCHセクションのYouTube埋め込みプレイヤー
- 「YouTubeで見る」ボタン
- ページ下部の「24時間生放送を見る」ボタン

通常URLと短縮URLのどちらも使えます。

```javascript
youtubeUrl: "https://www.youtube.com/watch?v=XXXXXXXXXXX"
```

```javascript
youtubeUrl: "https://youtu.be/XXXXXXXXXXX"
```

`/live/`、`/embed/`、`/shorts/` 形式にも対応しています。URLが空欄、または動画IDを読み取れない場合は、プレイヤーの代わりに「配信URLは近日公開！」と表示します。

## 出演者の追加・変更方法

出演者は `index.html` の `GUEST` セクションにあります。ファイル内で次のコメントを検索してください。

```html
<!-- 出演者を追加する場合は、ここからguest-cardを複製して画像・名前・肩書き・紹介文を変更してください -->
```

その直後にある `<article class="guest-card ...">` から `</article>` までをコピーし、同じ場所へ貼り付けます。その後、次の4か所を変更します。

1. 画像：`src="assets/images/guest-01.png"`
2. 画像の説明：`alt="出演者1"`
3. 肩書き：`<p class="guest-role">...</p>`
4. 名前と紹介文：`<h3>...</h3>` と、その次の `<p>...</p>`

画像を増やす場合は、`assets/images/guest-05.jpg` のように番号を増やして保存し、コピーしたカードの `src` も同じ名前に変更してください。カード数に合わせて自動で折り返します。

## タイムテーブルの変更方法

タイムテーブルは `index.html` の `TIMETABLE` セクションにあります。次のコメントを検索してください。

```html
<!-- 番組を追加する場合は、このschedule-itemを複製して時間・番組名・出演者・内容を変更してください -->
```

### 番組を追加する

`<article class="schedule-item ...">` から `</article>` までをコピーし、タイムテーブル内へ貼り付けます。

### 番組内容を変更する

- 時間：`<time>20:00 — 21:00</time>`
- ジャンル：`<span class="schedule-tag">OPENING</span>`
- 番組名：`<h3>...</h3>`
- 出演者：`<p><strong>出演：</strong>...</p>`
- 内容：その次の `<p>...</p>`

`time` タグの `datetime` 属性も、可能であれば実際の開始日時に合わせて変更してください。

### 完成版の番組表画像を掲載する

完成した画像を次の名前で保存すると、ページ下部の番組表画像枠に自動表示されます。

```text
assets/images/timetable.jpg
```

HTML形式の番組表と画像形式の番組表は同時に掲載できます。どちらか一方だけにしたい場合は、`index.html` の不要な側をコメントで囲むか削除してください。

## 文章や開催日時を変更する方法

`index.html` 内の該当する文章を直接変更します。ファイルは `HEADER`、`HERO`、`ABOUT` などの大きなコメントで区切られています。開催日時は `2026.08.29` や `2026-08-29` を検索すると見つけやすくなっています。

## 公開前チェック

- `assets/images/` の各画像が表示されているか
- `config.js` の4種類のURLが正しいか
- YouTubeプレイヤーと視聴ボタンが同じ配信先になっているか
- 出演者名、肩書き、紹介文、画像が一致しているか
- タイムテーブルの時間が重複・欠落していないか
- 仮情報を示す文章が不要になっていないか
- スマートフォンでもボタンやタイムテーブルが読みやすいか
