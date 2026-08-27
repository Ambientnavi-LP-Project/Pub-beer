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

    // ▼ ヒーローの吊り看板に出す2行。name_short を分割したもの。
    sign_line1: "British Pub",
    sign_line2: "Asakusa",
    sign_sub: "Japanese Craft Beer Bar · Wagyu Restaurant",

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

    // ▼ 未提供のため空。値を入れるとテンプレ側で自動的に表示される。
    hours: "",            // 例: "17:00 – 24:00"
    hours_note: "",       // 例: "Open Daily"
    closed_note: "",      // 例: "定休日 月曜"
    maps_link: "",        // Googleマップの共有リンク(https://maps.app.goo.gl/...)
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
    photo_beer:     { src: "/images/craft-beer.jpg",      alt: "A pint of Japanese craft beer on the bar" },
    photo_wagyu:    { src: "/images/wagyu-burger.jpg",    alt: "Wagyu burger" },
    photo_interior: { src: "/images/interior-detail.jpg", alt: "Green panelling and brass rail in the pub" },

    // 地図の検索キーワード。住所の全角ハイフン等を正規化したもの。
    // maps_link / maps_embed が未設定でも、これがあれば地図が出る。
    maps_query: "東京都台東区西浅草2-2-2 藤代ビル",

    // ▼ 表示の切り替え
    // GBP(Googleビジネスプロフィール)開設中のため、アクセス欄と地図は非表示。
    // 準備ができたら true に戻すだけでよい。
    //
    // show_access … Access セクション全体(住所・電話・営業時間・地図カード)
    // show_map    … Access 内の地図埋め込みと「Open in Google Maps」ボタン
    //
    // 両方 false でも、住所と電話はヒーローとフッターに残り、
    // 構造化データ(JSON-LD)にも入る。GBPとサイトのNAP一致を保つため。
    show_access: false,
    show_map: false
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
    domain: "",            // 本番ドメイン。決まり次第記入(canonical と urls.csv に使う)
    brand_name: "British Pub Asakusa",
    brand_slug: "pub-beer",
    ga4_id: "",            // 空のあいだは計測タグを出力しない
    gtm_id: "",            // 空のあいだは計測タグを出力しない
    meta_pixel_id: ""      // 空にするとピクセルタグを出力しない(停止できる)
  },
  stores: STORES,
  channels: CHANNELS,
  pages: pages   // 本番用(default/japan/global/map)。store.njk が使う。
};
