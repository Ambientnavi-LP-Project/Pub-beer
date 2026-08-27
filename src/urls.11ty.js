// src/urls.11ty.js
// stores.js の全ページ定義から URL 一覧 CSV を生成し /urls.csv として出力する。
// 店舗を stores.js に追加してデプロイすると、このCSVが自動で更新される。
// Googleスプレッドシートからは =IMPORTDATA("https://<domain>/urls.csv") で自動取り込み可能。
//
// 出力列: 店舗 / 地域 / slug / 状態 / 種別 / 用途 / LP_URL / Google広告用URL / GBP用URL

const stores = require("./_data/stores.js");

const USE = {
  default: "直接訪問・SEO",
  japan: "日本向け広告",
  global: "海外向け広告",
  map: "GBP経由",
};

const AD_CHANNELS = new Set(["japan", "global"]);
const AD_SUFFIX =
  "?utm_source=google-ads-website&utm_medium=cpc&utm_campaign=store";
const GBP_SUFFIX =
  "?utm_source=google-maps-hp&utm_medium=organic&utm_campaign=profile";

module.exports = class {
  data() {
    return {
      permalink: "/urls.csv",
      eleventyExcludeFromCollections: true,
    };
  }

  render() {
    // ドメイン未確定のあいだは相対パスで出す。
    const domain = stores.brand.domain;
    const base = domain ? `https://${domain}` : "";

    const header = [
      "店舗", "地域", "slug", "状態", "種別", "用途",
      "LP_URL", "Google広告用URL", "GBP用URL",
    ];

    const rows = [header];
    (stores.pages || []).forEach((p) => {
      const lp = `${base}/${p.region}/${p.slug}/${p.channel_suffix}`;
      const ch = p.channel_id;
      rows.push([
        p.name_jp || p.slug, p.region, p.slug, "live", ch, USE[ch] || "",
        lp,
        AD_CHANNELS.has(ch) ? lp + AD_SUFFIX : "",
        ch === "map" ? lp + GBP_SUFFIX : "",
      ]);
    });

    return rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
  }
};
