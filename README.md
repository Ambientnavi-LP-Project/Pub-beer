# Pub-beer — British Pub Asakusa LP

浅草のブリティッシュパブ／クラフトビール業態のLP。
`Ambientnavi-LP-Project/omakase` と同じ構成（Eleventy + Nunjucks / `src/_data` にデータ / Vercelで `_site` を配信）で組んでいる。

## 1. 店舗情報

| 項目 | 内容 |
|---|---|
| フル店名 | British Pub Asakusa Japanese Craft Beer Bar Wagyu restaurant 东京酒馆 |
| 業態 | ブリティッシュパブ / クラフトビール |
| 住所 | 〒111-0035 東京都台東区西浅草2丁目2−2 藤代ビル 1F |
| 電話 | 080-8378-2101 |

## 2. ファイル構成

```
.
├── .eleventy.js                       … Eleventy設定（src/images を passthrough）
├── package.json
├── vercel.json                        … / → /tokyo/asakusa/ にリダイレクト
├── .gitignore
└── src/
    ├── _data/
    │   ├── stores.js                  … 店舗データ + チャネル別ページ定義
    │   └── ui.js                      … ページ上の文言（全コピーはここに集約）
    ├── _includes/partials/
    │   ├── styles.njk                 … LP全体のCSS
    │   ├── icons.njk                  … インラインSVG（写真未提供のため図版はここ）
    │   └── analytics.njk              … dataLayer + GTM/GA4（ID未設定なら出力しない）
    ├── images/                        … 写真置き場（現在は空）
    ├── store.njk                      … LP本体
    └── urls.11ty.js                   … URL一覧CSVを /urls.csv に出力
```

## 3. 生成されるURL

`stores.js` の `CHANNELS` により、1店舗につき4ページを生成する。

| 種別 | URL | 用途 |
|---|---|---|
| default | `/tokyo/asakusa/` | 直接訪問・SEO |
| japan | `/tokyo/asakusa/japan/` | 日本向け広告 |
| global | `/tokyo/asakusa/global/` | 海外向け広告 |
| map | `/tokyo/asakusa/map/` | Googleマップ（GBP）経由 |

`default` 以外には noindex が付く。canonical は `brand.domain` が入っている時だけ出力する。
URL一覧は `/urls.csv` に自動出力され、スプレッドシートから
`=IMPORTDATA("https://<domain>/urls.csv")` で取り込める。

## 4. 予約導線（Reserve）

`src/_data/stores.js` の `reserve_url` **1行だけ**で挙動が切り替わる。LP側の修正は不要。

| `reserve_url` | ボタンの挙動 | ボタン表記 |
|---|---|---|
| `""`（現在） | `tel:08083782101` を開く | Reserve / Call 080-8378-2101 |
| TableCheck等のURL | そのURLへ遷移（別タブ） | Reserve |

- URLを入れると、チャネル別のUTM（`?utm_source=lp-japan&utm_medium=referral` 等）が自動で付く
- 電話フォールバック中は番号を併記する。デスクトップでは `tel:` が効かない環境があるため、番号自体を読める状態にしておく
- 計測は両方とも `reserve_click` イベント。`method: 'tel' | 'external'` で切替前後を比較できる
- 設置箇所は3つ: ヘッダー / ヒーロー / スティッキーバー（スマホのみ、常時表示）

## 5. 言語

英語がメイン（`<html lang="en">`）。インバウンド向けのため本文はすべて英語。
非英語を残しているのは次の3つだけ。

- フル店名に含まれる `东京酒馆`
- 和牛バーガー / クラフトビールの日本語表記（ペアリング欄の副題）
- 日本語住所（タクシー・地図アプリ用にアクセス欄とフッターに併記）

多言語化するときは `src/_data/ui.js` を `{ en: {...}, ja: {...} }` の形に変え、
`store.njk` で `ui[lang]` を参照するように差し替える。

## 6. 写真

すべて `src/images/` にあり、パスは `stores.js` の1店舗オブジェクト内で指定する。
どのフィールドも空にすればSVGイラスト／グラデーション表示に自動で戻る。

| ファイル | 使用箇所 | フィールド |
|---|---|---|
| `hero-interior.jpg` / `-portrait.jpg` | ヒーロー背景 | `hero_image` / `hero_image_portrait` |
| `*-thumb.jpg`（3枚） | ヒーローの写真ストリップ | 各 `photo_*` の `thumb` |
| `craft-beer.jpg` | Craft beer セクション右 | `photo_beer` |
| `wagyu-burger.jpg` | Wagyu セクション左 | `photo_wagyu` |
| `interior-detail.jpg` | 全幅フォトバンド | `photo_interior` |
| `hero-exterior.jpg` / `-portrait.jpg` | **未使用**。ヒーローの代替案 | — |
| `unused-fish-and-chips.jpg` | **未使用**。下記参照 | — |

- 縦位置は `@media (max-aspect-ratio: 1/1)` で自動的に切り替わる
- ヒーローを外観カットに変えるときは `hero_image` の2行を `hero-exterior` 系に差し替えるだけ
- 写真の上には暗幕（`.hero__scrim`）が自動で重なるので、本文は常に読める

### ヒーローの構成

看板 → フル店名 → キャッチ → 写真ストリップ → 住所 → Reserve の順。

- **フル店名**は真鍮の罫線で挟んで看板直下に置いている。GBP・検索結果・SNSと表記を揃えるための位置。変更するときは `stores.js` の `name_full_en` を直せば、ヒーロー・店名プレート・フッター・`<title>`・JSON-LD すべてに反映される
- **写真ストリップ**はビール／和牛バーガー／店内の3枚で、どんな店かを一目で伝える枠。並びと見出しは `ui.js` の `hero_strip` で変えられる。参照する写真は `photo` キーで `stores.js` のフィールド名を指定する
- ストリップは `thumb`（480×360・計80KB）を読む。ヒーローの初回読み込みは背景と合わせて約216KB

### 未使用にしている理由

`unused-fish-and-chips.jpg` はLPに配置していない。メニューを掲載しない方針のため、
提供品目を特定する写真を置くと、載せていない料理を出しているように見えてしまう。
メニューを公開する方針に変えたときに使う。

### og:image

現在は `/images/hero-interior.jpg` と相対パスで出している。
SNSシェアのプレビューを正しく出すには絶対URLが必要なので、
`brand.domain` を記入したうえで `store.njk` の `og:image` を絶対URLに直すこと。

## 7. 表示の切り替え（GBP開設中）

Googleビジネスプロフィール開設の準備中のため、アクセス欄と地図を非表示にしている。
`src/_data/stores.js` のフラグ2つで戻せる。

```js
show_access: false,   // Access セクション全体（住所・電話・営業時間・地図カード）
show_map: false,      // Access 内の地図埋め込みと「Open in Google Maps」ボタン
```

- `show_access: false` のとき、ヒーローの「Access」ボタンも自動で消える（アンカー先が無くなるため）
- **住所と電話はヒーロー・フッター・JSON-LD に残る。** GBPの審査ではプロフィールとサイトのNAP（店名・住所・電話）の一致を見られるため、サイト側から住所を完全に消さないほうがよい
- 地図だけ出したい／アクセス欄だけ出したい、という組み合わせも可能

## 8. 掲載情報のルール

**このLPに載っている事実は、提供された「業態 / フル店名 / 住所 / 電話 / 和牛バーガーとの相性」だけ。**
営業時間・定休日・価格・メニュー品目・座席数・実績・設備・レビュー・SNS等は一切書いていない。
コピーも、上記の事実の言い換えの範囲に収めている。

未提供の項目は `stores.js` で空文字 `""` にしてあり、テンプレート側は空なら自動的にそのブロックを出さない。
値を入れれば表示が復活する。

### 未確定の項目（判明したら `src/_data/stores.js` に記入）

| フィールド | 内容 |
|---|---|
| `brand.domain` | 本番ドメイン（canonical と urls.csv に使用） |
| `brand.ga4_id` / `brand.gtm_id` / `brand.meta_pixel_id` | 計測タグ。空のあいだはタグを一切出力しない |
| `hours` / `hours_note` / `closed_note` | 営業時間・定休日。入れるとアクセス欄に行が増える |
| `maps_link` | Googleマップの共有リンク。未設定なら住所検索リンクで代替 |
| `rating` / `rating_count` / `rating_source` | Google評価。現在はどこにも表示していない |
| `reserve_url` | 予約サービスのURL |
| `address_en_line2` | 「藤代ビル」の英字表記が未確認（暫定で `Fujishiro Bldg.`） |

## 9. デザイン

- 配色: ブリティッシュ・レーシンググリーン `#173A2E` / マホガニー `#4A2A18` / 真鍮 `#C9A227` / 生成り `#F0E6D2` / 琥珀 `#C87A2B`
- 書体: 見出し Abril Fatface（英国パブ看板のファットフェイス）、和文 Shippori Mincho B1、ラベル Barlow Condensed
- ヒーローの**吊り看板**をシグネチャー要素とし、装飾はそこに集約
- 左右の余白は全セクション共通ガター `--gut: clamp(24px, 6vw, 72px)`（スマホ最低24px / PC最大72px）
- `prefers-reduced-motion` 対応、キーボードフォーカス可視
- 画像アセットは0件。図版はすべて `partials/icons.njk` のインラインSVG

### 写真を入れる場合

`src/images/` に置き、`icons.njk` の呼び出し箇所（`{{ icon(...) }}`）を `<img>` に差し替える。
差し替え候補は、ヒーロー背景 / クラフトビールの写真 / 和牛バーガーの写真 / 内観の4箇所。

## 10. 計測

`dataLayer` に `store_name` / `store_area` / `brand` / `channel` を積む。
イベント: `reserve_click`（`method` と `location` 付き）/ `tel_click`（access・footer）/ `directions_click`。
`brand.gtm_id` と `brand.ga4_id` が空のあいだはタグ本体を読み込まないので、ID発行前でも公開できる。

## 11. ローカル確認

```bash
npm install
npx @11ty/eleventy --serve
# http://localhost:8080/tokyo/asakusa/
```
