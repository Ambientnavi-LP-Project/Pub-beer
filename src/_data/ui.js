/**
 * UI copy. All page text lives in this one file.
 * Do not hard-code strings in the template — edits would scatter.
 *
 * The site is English-first (inbound). To add a language later, wrap this
 * object as { en: {...}, ja: {...} } and read ui[lang] in store.njk.
 *
 * CONTENT RULE
 * Only facts supplied by the venue may appear here: type of venue, full name,
 * address, phone, and the wagyu-burger pairing. Do not add opening hours,
 * prices, menu items, seat counts, awards, facilities, reviews or socials.
 */

module.exports = {
  // ---------- hero ----------
  hero_eyebrow: "Asakusa · Tokyo",
  hero_lead_1: "A British pub in Asakusa,",
  hero_lead_2: "pouring Japanese craft beer.",

  // ヒーローの写真ストリップ。どんな店かを一目で伝えるための3枚。
  // 画像は stores.js の photo_* を参照する。
  hero_strip: [
    { photo: "photo_beer",     caption: "Craft beer" },
    { photo: "photo_wagyu",    caption: "Wagyu burger" },
    { photo: "photo_interior", caption: "British pub" }
  ],

  // ---------- reserve ----------
  reserve_label: "Reserve",
  reserve_sub_tel: "Call",          // 電話フォールバック時、番号の前に付く語
  reserve_sticky_note: "Wagyu &amp; craft beer",

  // ---------- rail ----------
  rail: ["British pub", "Japanese craft beer", "Wagyu"],

  // ---------- concept ----------
  concept_label: "Concept",
  concept_title: "A British pub with wagyu on the counter.",
  concept_body:
    "A pub in the British manner, Japanese craft beer on tap, and wagyu. " +
    "We borrow the English way of drinking without letting go of Japanese food.",

  pillars: [
    {
      icon: "pint",
      title: "British pub",
      text: "An evening spent the way an English pub does it."
    },
    {
      icon: "glass",
      title: "Japanese craft beer",
      text: "Japanese craft beer, poured as a pub pint."
    },
    {
      icon: "burger",
      title: "Wagyu",
      text: "Japanese beef, with the wagyu burger at its centre."
    }
  ],

  // ---------- craft beer ----------
  beer_label: "Craft beer",
  beer_title_1: "The pint here is",
  beer_title_2: "Japanese craft beer.",
  beer_body:
    "British pubs have always poured what the land around them brews. " +
    "This one pours Japanese craft beer — a pint to drink in Asakusa.",

  // ---------- wagyu ----------
  wagyu_label: "Wagyu",
  wagyu_title: "Wagyu burger, and a pint.",
  wagyu_body:
    "The wagyu burger is pub food here — Japanese beef put on the counter " +
    "as the plate that goes with the beer.",
  pairing_left: { name: "Wagyu burger", note: "和牛バーガー" },
  pairing_right: { name: "Japanese craft beer", note: "クラフトビール" },

  // ---------- name plate ----------
  plate_label: "The house",

  // ---------- access ----------
  access_label: "Access",
  access_title: "Nishi-Asakusa, Taito-ku, Tokyo",
  access_k_name: "Name",
  access_k_address: "Address",
  access_k_tel: "Tel",
  access_k_hours: "Hours",
  access_map_note: "Open the address in your maps app.",
  access_map_btn: "Open in Google Maps",

  // ---------- meta ----------
  meta_description:
    "British Pub Asakusa Japanese Craft Beer Bar Wagyu restaurant 东京酒馆. " +
    "A British pub in Nishi-Asakusa, Tokyo, pouring Japanese craft beer and " +
    "serving a wagyu burger."
};
