/**
 * 店舗データ定義(pub業態)
 * 新しい店舗を追加するときは、STORES配列に store オブジェクトを追加するだけ。
 *
 * channels配列で、店舗ごとに複数のチャネル別ページを生成:
 *  - default → /{region}/{slug}/         (直接訪問・SEO)
 *  - japan   → /{region}/{slug}/japan/   (日本向け広告)
 *  - global  → /{region}/{slug}/global/  (海外向け広告)
 *  - map     → /{region}/{slug}/map/     (Googleマップ GBP)
 *
 * channel_id が "default" 以外のページには、テンプレ側で
 * noindex + canonical(本番URL) が自動で付く。
 *
 * 【掲載情報のルール】
 * このファイルに書いてよいのは、店舗から提供された事実だけ。
 * 未提供の項目は空文字 "" のままにしておくこと。
 * テンプレート側は空文字の項目を自動的に非表示にする(営業時間・評価・地図リンク等)。
 * 埋まっていない項目の一覧は README「未確定の項目」を参照。
 */

const STORES = [
  // ============================================================
  // 1. 浅草店(東京)
  // ============================================================
  {
    region: "tokyo",
    slug: "asakusa",

    // ▼ 業態
    concept_en: "British Pub · Japanese Craft Beer · Wagyu",
    concept_jp: "ブリティッシュパブ / クラフトビール",

    // ▼ 店名
    // name_full_en に英語+中国語をまとめて1つのフル表記で入れている。
    // ヒーロー等は name_full_en をそのまま1ブロックで表示する。
    name_full_en: "British Pub Asakusa Japanese Craft Beer Bar Wagyu restaurant 东京酒馆",
    name_short: "British Pub Asakusa",
    name_jp: "British Pub Asakusa",
    name_zh: "东京酒馆",

    // ▼ ヒーローの吊り看板。sign_line1 / sign_line2 が看板の大きな文字。
    sign_line1: "British Pub",
    sign_line2: "Asakusa",
    // 看板の下段。フル店名は看板直下に別ブロックで出しているため空にしている。
    // 文字列を入れると看板の中に小さく表示される。
    sign_sub: "",
    sign_zh: "",

    // ▼ 所在地
    city: "Asakusa, Tokyo",
    region_label: "Nishi-Asakusa · Tokyo",
    address_postal: "111-0035",
    address_jp_line1: "東京都台東区西浅草2丁目2−2",
    address_jp_line2: "藤代ビル 1F",
    // ※ 「藤代ビル」の英字表記は未確認。正式表記が判明したら差し替えること。
    address_en_line1: "2-2-2 Nishi-Asakusa, Taito-ku, Tokyo",
    address_en_line2: "Fujishiro Bldg. 1F",

    // ▼ 連絡先
    tel_display: "080-8378-2101",
    tel_raw: "08083782101",

    // ▼ GBP(Googleビジネスプロフィール)から転記。表記はGBP側と一致させること。
    hours: "11:00 – 23:00",
    hours_note: "Open Daily",
    closed_note: "",      // 定休日なし

    // 構造化データ(openingHoursSpecification)用。
    // hours は表示用の文字列なので、Googleに渡す機械可読な形はこちらに持つ。
    // 定休日が確定してから入れる。年中無休なら days に7曜日すべてを書く。
    // 例: { days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    //       opens: "11:00", closes: "23:00" }
    hours_schema: {
      days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      opens: "11:00",
      closes: "23:00"
    },

    // GBP「共有」→ リンクをコピー
    maps_link: "https://maps.app.goo.gl/e8bZ411yJd9Li4zZ9",
    // GBP「共有」→「地図を埋め込む」の src="..." の中身だけ。
    // 取得時は航空写真(!5e1)・日本語(!1sja)だったため、通常地図(!5e0)・英語(!1sen)に直している。
    maps_embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4256.1651313197435!2d139.7908712!3d35.711985899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188fc3673825ab%3A0x13b138ed2b10fd0d!2sBritish%20Pub%20Asakusa%20Japanese%20Craft%20Beer%20Bar%20Wagyu%20restaurant%20%E4%B8%9C%E4%BA%AC%E9%85%92%E9%A6%86!5e0!3m2!1sen!2sjp!4v1788408574637!5m2!1sen!2sjp",

    rating: "",
    rating_count: "",
    rating_source: "",
    // ▼ 予約導線
    // 空 → 「Reserve」ボタンは tel: リンクになり、番号を併記する。
    // TableCheck等のURLを入れると、そのURLへ遷移する形に自動で切り替わる。
    // チャネル別のUTM(?utm_source=lp-japan&utm_medium=referral 等)は自動付与。
    reserve_url: "",

    // ▼ ヒーロー背景画像。空にすると深緑のグラデーション表示に戻る。
    // 横位置(16:9)と縦位置(3:4)の2枚。縦は max-aspect-ratio:1/1 で自動切替。
    //
    // 外観カットに差し替えたい場合はこの2行を
    //   "/images/hero-exterior.jpg" / "/images/hero-exterior-portrait.jpg"
    // に置き換えるだけでよい。
    hero_image: "/images/hero-interior.jpg",
    hero_image_portrait: "/images/hero-interior-portrait.jpg",

    // ▼ セクション写真。空にするとその枠がSVGイラストに戻る。
    // thumb はヒーローの写真ストリップ用の軽量版(480x360)。
    // 省略した場合は src がそのまま使われる。
    photo_beer: {
      src:   "/images/craft-beer.jpg",
      thumb: "/images/craft-beer-thumb.jpg",
      alt:   "A pint of Japanese craft beer on the bar"
    },
    photo_wagyu: {
      src:   "/images/wagyu-burger.jpg",
      thumb: "/images/wagyu-burger-thumb.jpg",
      alt:   "Wagyu burger"
    },
    photo_interior: {
      src:   "/images/interior-detail.jpg",
      thumb: "/images/interior-detail-thumb.jpg",
      alt:   "Green panelling and brass rail in the pub"
    },

    // 地図の検索キーワード。住所の全角ハイフン等を正規化したもの。
    // maps_link / maps_embed が未設定でも、これがあれば地図が出る。
    maps_query: "東京都台東区西浅草2-2-2 藤代ビル",

    // ▼ 表示の切り替え
    // GBP開設・営業時間確定にともない、2026-09-03 に両方 true にした。
    //
    // show_access … Access セクション全体(住所・電話・営業時間・地図カード)
    // show_map    … Access 内の地図埋め込みと「Open in Google Maps」ボタン
    //
    // 両方 false でも、住所と電話はヒーローとフッターに残り、
    // 構造化データ(JSON-LD)にも入る。GBPとサイトのNAP一致を保つため。
    show_access: true,
    show_map: true
  }
];

// maps_embed が未設定の店舗は maps_query から自動生成する。
STORES.forEach((s) => {
  if (!s.maps_embed && s.maps_query) {
    s.maps_embed =
      "https://www.google.com/maps?q=" + encodeURIComponent(s.maps_query) + "&output=embed";
  }
});

// ============================================================
// チャネル定義
// ============================================================
const CHANNELS = [
  { id: "default", suffix: "",        utm_source: "lp" },
];

// 本番LP(全店舗 × 全チャネル)。store.njk が使う。
const pages = [];
STORES.forEach((s) => {
  CHANNELS.forEach((c) => {
    pages.push({
      ...s,
      channel_id: c.id,
      channel_suffix: c.suffix,
      channel_utm_source: c.utm_source
    });
  });
});

module.exports = {
  brand: {
    domain: "british-beer-pub.halal-food-wagyu.com",  // canonical / og / urls.csv に使う
    brand_name: "British Pub Asakusa",
    brand_slug: "pub-beer",
    // GA4(測定ID G-WKH1CC5LZ6 / プロパティ 549444736)は GTM コンテナ側の
    // GA4設定タグから配信する。ここに ga4_id を入れると gtag も直接読み込まれ、
    // page_view が二重計上になるため空のままにしておくこと。
    // GTM側にGA4設定タグが無いことを確認できた場合にだけ、こちらに入れる。
    ga4_id: "",
    gtm_id: "GTM-5DGT9H6L",
    meta_pixel_id: ""      // 空にするとピクセルタグを出力しない(停止できる)
  },
  stores: STORES,
  channels: CHANNELS,
  pages: pages   // 本番用(default/japan/global/map)。store.njk が使う。
};
