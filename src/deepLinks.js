export function getOS() {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "desktop";
}

export function isMobile() {
  return getOS() !== "desktop";
}

export function isRestrictedWebView() {
  const ua = navigator.userAgent.toLowerCase();
  return /micromessenger|wechat|weixin|douyin|aweme|bytedance|toutiao|newsarticle|qqbrowser/i.test(ua);
}

export function launch(url) {
  if (!url) return;
  if (/^https?:\/\//i.test(url)) {
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
  } else {
    window.location.href = url;
  }
}

export function buildAppleUrl(item) {
  const query = encodeURIComponent(item.title || "目的地");
  if (getOS() === "ios") {
    return `maps://?ll=${item.lat},${item.lng}&q=${query}`;
  }
  return `https://maps.apple.com/?ll=${item.lat},${item.lng}&q=${query}`;
}

export function buildGoogleUrl(item) {
  if (getOS() === "ios" || getOS() === "android") {
    return `comgooglemaps://?q=${item.lat},${item.lng}&center=${item.lat},${item.lng}&zoom=16`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`;
}

export function buildAmapUrl(item) {
  const name = encodeURIComponent(item.title || "目的地");
  if (getOS() === "ios") {
    return `iosamap://navi?sourceApplication=qingdao_travel_plan&poiname=${name}&lat=${item.lat}&lon=${item.lng}&dev=0&style=2`;
  }
  if (getOS() === "android") {
    return `androidamap://navi?sourceApplication=qingdao_travel_plan&poiname=${name}&lat=${item.lat}&lon=${item.lng}&dev=0&style=2`;
  }
  return `https://uri.amap.com/navigation?to=${item.lng},${item.lat},${name}&mode=car&coordinate=gaode`;
}

export function buildXhsUrl(item) {
  const keyword = encodeURIComponent(item.xhsKeyword || item.title || "青岛旅行");
  if (!isMobile() || isRestrictedWebView()) {
    return `https://www.xiaohongshu.com/search_result?keyword=${keyword}`;
  }
  return `xhsdiscover://search/result?keyword=${keyword}`;
}

export function buildDianpingUrl(item) {
  const keyword = encodeURIComponent(item.dianpingKeyword || item.title || "青岛");
  return `dianping://search?keyword=${keyword}`;
}
