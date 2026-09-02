(function () {
  "use strict";

  const data = window.TRAVEL_DATA;
  if (!data) {
    document.body.innerHTML = "<p style='padding: 24px'>未找到行程数据，请确认 data.js 已正确加载。</p>";
    return;
  }

  const els = {
    brandTitle: document.getElementById("brandTitle"),
    brandSubtitle: document.getElementById("brandSubtitle"),
    themeToggle: document.getElementById("themeToggle"),
    themeToggleText: document.getElementById("themeToggleText"),
    dayTabs: document.getElementById("dayTabs"),
    dayHeading: document.getElementById("dayHeading"),
    timeline: document.getElementById("timeline"),
    actionSheetBackdrop: document.getElementById("actionSheetBackdrop"),
    actionSheet: document.getElementById("actionSheet"),
    actionSheetTitle: document.getElementById("actionSheetTitle"),
    actionSheetClose: document.getElementById("actionSheetClose"),
    actionSheetCancel: document.getElementById("actionSheetCancel"),
    noteModal: document.getElementById("noteModal"),
    noteTitle: document.getElementById("noteTitle"),
    noteBody: document.getElementById("noteBody"),
    noteClose: document.getElementById("noteClose"),
    noteConfirm: document.getElementById("noteConfirm"),
    toast: document.getElementById("toast")
  };

  let currentDay = 0;
  let currentNavItem = null;
  let toastTimer = null;

  const map = L.map("map", {
    zoomControl: true,
    scrollWheelZoom: true,
    attributionControl: true
  }).setView(data.meta.center, data.meta.zoom);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 20,
    minZoom: 3
  }).addTo(map);

  let mapLayers = [];
  let mapMarkers = [];

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getOS() {
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
    if (/Android/i.test(ua)) return "android";
    return "desktop";
  }

  function isMobile() {
    return getOS() !== "desktop";
  }

  function isRestrictedWebView() {
    const ua = navigator.userAgent.toLowerCase();
    return /micromessenger|wechat|weixin|douyin|aweme|bytedance|toutiao|newsarticle|qqbrowser/i.test(ua);
  }

  function showToast(message) {
    if (!els.toast) return;
    els.toast.textContent = message;
    els.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      els.toast.classList.remove("show");
    }, 2600);
  }

  function launch(url) {
    if (!url) return;
    try {
      if (/^https?:\/\//i.test(url)) {
        const win = window.open(url, "_blank", "noopener,noreferrer");
        if (!win) {
          window.location.href = url;
        }
      } else {
        window.location.href = url;
      }
    } catch (error) {
      showToast("未能打开链接，请确认已安装对应 App。");
    }
  }

  function buildAppleUrl(item) {
    const query = encodeURIComponent(item.title || "目的地");
    const os = getOS();
    if (os === "ios") {
      return `maps://?ll=${item.lat},${item.lng}&q=${query}`;
    }
    return `https://maps.apple.com/?ll=${item.lat},${item.lng}&q=${query}`;
  }

  function buildGoogleUrl(item) {
    const query = encodeURIComponent(item.title || "目的地");
    const os = getOS();
    if (os === "ios" || os === "android") {
      return `comgooglemaps://?q=${item.lat},${item.lng}&center=${item.lat},${item.lng}&zoom=16`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`;
  }

  function buildAmapUrl(item) {
    const name = encodeURIComponent(item.title || "目的地");
    const os = getOS();
    if (os === "ios") {
      return `iosamap://navi?sourceApplication=qingdao_travel_plan&poiname=${name}&lat=${item.lat}&lon=${item.lng}&dev=0&style=2`;
    }
    if (os === "android") {
      return `androidamap://navi?sourceApplication=qingdao_travel_plan&poiname=${name}&lat=${item.lat}&lon=${item.lng}&dev=0&style=2`;
    }
    return `https://uri.amap.com/navigation?to=${item.lng},${item.lat},${name}&mode=car&coordinate=gaode`;
  }

  function getXhsUrl(item) {
    const keyword = encodeURIComponent(item.xhsKeyword || item.title || "青岛旅行");
    if (!isMobile() || isRestrictedWebView()) {
      return `https://www.xiaohongshu.com/search_result?keyword=${keyword}`;
    }
    return `xhsdiscover://search/result?keyword=${keyword}`;
  }

  function getDianpingUrl(item) {
    const keyword = encodeURIComponent(item.dianpingKeyword || item.title || "青岛");
    return `dianping://search?keyword=${keyword}`;
  }

  function openNavActionSheet(item) {
    currentNavItem = item;
    els.actionSheetTitle.textContent = `📍 ${item.title}`;
    els.actionSheetBackdrop.hidden = false;
    document.body.style.overflow = "hidden";
    els.actionSheetClose.focus();
  }

  function closeNavActionSheet() {
    currentNavItem = null;
    els.actionSheetBackdrop.hidden = true;
    document.body.style.overflow = "";
  }

  function handleNavOption(type) {
    if (!currentNavItem) return;
    const item = currentNavItem;
    let url = "";
    let label = "";

    if (type === "apple") {
      url = buildAppleUrl(item);
      label = "Apple Maps";
    } else if (type === "google") {
      url = buildGoogleUrl(item);
      label = "Google Maps";
    } else if (type === "amap") {
      url = buildAmapUrl(item);
      label = "高德地图";
    }

    closeNavActionSheet();
    launch(url);
    showToast(`正在打开 ${label}${isMobile() ? "" : "（桌面端使用网页地图）"}`);
  }

  function openXhs(item) {
    const restricted = isRestrictedWebView();
    const url = getXhsUrl(item);
    launch(url);
    if (restricted) {
      showToast("检测到微信 / 抖音 WebView，已降级到小红书 H5。");
    } else if (!isMobile()) {
      showToast("桌面端已打开小红书网页搜索。");
    } else {
      showToast("正在打开小红书 App。");
    }
  }

  function openDianping(item) {
    launch(getDianpingUrl(item));
    showToast(isMobile() ? "正在打开大众点评 App。" : "桌面端请确认已安装大众点评 App。");
  }

  function openBooking(item) {
    if (!item.booking) return;
    if (item.booking.mode === "note") {
      openNoteModal(item.booking.label || "预约提示", item.booking.note || "请在官方渠道确认预约。");
      return;
    }
    launch(item.booking.url);
    showToast("正在打开预约页面…");
  }

  function openNoteModal(title, body) {
    els.noteTitle.textContent = title;
    els.noteBody.textContent = body;
    els.noteModal.hidden = false;
    document.body.style.overflow = "hidden";
    els.noteConfirm.focus();
  }

  function closeNoteModal() {
    els.noteModal.hidden = true;
    document.body.style.overflow = "";
  }

  function renderDayTabs() {
    els.dayTabs.innerHTML = data.days
      .map((day, index) => {
        const number = index + 1;
        return `
          <button class="day-tab${index === currentDay ? " active" : ""}" type="button" data-day-index="${index}">
            <strong>Day ${number}</strong>
            <small>${escapeHtml(day.date.split(" ")[0])}</small>
          </button>
        `;
      })
      .join("");
  }

  function renderDayHeading() {
    const day = data.days[currentDay];
    els.dayHeading.innerHTML = `
      <p class="day-date">${escapeHtml(day.date)}</p>
      <h2>${escapeHtml(day.title)}</h2>
      <p>${escapeHtml(day.subtitle)}</p>
    `;
    document.querySelector(".timeline").style.setProperty("--day-accent", day.accent);
  }

  function isDianpingEnabled(item) {
    return (
      (item.type === "food" || item.type === "drink") &&
      item.dianping !== false
    );
  }

  function renderPaymentTags(item) {
    if (!Array.isArray(item.payments) || item.payments.length === 0) return "";
    return `
      <div class="payments" aria-label="支付方式">
        ${item.payments
          .map((key) => {
            const label = data.paymentLabels[key] || key;
            return `<span class="payment-tag" data-payment="${escapeHtml(key)}">${escapeHtml(label)}</span>`;
          })
          .join("")}
      </div>
    `;
  }

  function renderCard(day, item, dayIndex, itemIndex) {
    const typeLabel = data.typeLabels[item.type] || item.type || "地点";
    const payments = renderPaymentTags(item);
    const dianpingButton = isDianpingEnabled(item)
      ? `<button class="action-button dianping" type="button" data-action="dianping">🍜 大众点评</button>`
      : "";
    const bookingButton = item.booking
      ? `<button class="action-button" type="button" data-action="booking">📅 ${escapeHtml(item.booking.label || "预约")}</button>`
      : "";

    return `
      <li class="timeline-item">
        <span class="timeline-dot">${itemIndex + 1}</span>
        <article class="card" data-card="${dayIndex}-${itemIndex}" tabindex="0" role="button" aria-label="${escapeHtml(item.title)}">
          <div class="card-top">
            <span class="time-chip">${escapeHtml(item.time)}</span>
            <span class="type-badge">${escapeHtml(typeLabel)}</span>
          </div>
          <h3>${escapeHtml(item.title)}</h3>
          <p class="address">${escapeHtml(item.address || "")}</p>
          ${item.note ? `<p class="note">${escapeHtml(item.note)}</p>` : ""}
          ${payments}
          <div class="card-actions">
            <button class="action-button" type="button" data-action="nav">📍 导航</button>
            <button class="action-button" type="button" data-action="xhs">📕 小红书</button>
            ${dianpingButton}
            ${bookingButton}
          </div>
        </article>
      </li>
    `;
  }

  function renderTimeline() {
    const day = data.days[currentDay];
    els.timeline.innerHTML = day.items
      .map((item, itemIndex) => renderCard(day, item, currentDay, itemIndex))
      .join("");
  }

  function clearMapLayers() {
    mapLayers.forEach((layer) => {
      if (layer && layer.remove) layer.remove();
    });
    mapLayers = [];
    mapMarkers = [];
  }

  function renderMap() {
    const day = data.days[currentDay];
    clearMapLayers();

    const coords = [];
    day.items.forEach((item, itemIndex) => {
      const latLng = [item.lat, item.lng];
      coords.push(latLng);

      const marker = L.circleMarker(latLng, {
        radius: 8,
        color: "#ffffff",
        weight: 2,
        fillColor: day.accent,
        fillOpacity: 1,
        stroke: true
      }).addTo(map);

      marker.bindTooltip(`${itemIndex + 1}. ${item.title}`, {
        direction: "top",
        offset: [0, -8],
        className: "map-tooltip"
      });

      marker.on("click", () => {
        selectCard(itemIndex, true);
      });

      marker.on("mouseover", () => {
        marker.setStyle({ radius: 10, weight: 3 });
      });
      marker.on("mouseout", () => {
        marker.setStyle({ radius: 8, weight: 2 });
      });

      mapLayers.push(marker);
      mapMarkers.push(marker);
    });

    if (coords.length > 1) {
      const route = L.polyline(coords, {
        color: day.accent,
        weight: 4,
        opacity: 0.58,
        lineJoin: "round",
        dashArray: "6 6"
      }).addTo(map);
      mapLayers.push(route);
    }

    if (coords.length) {
      map.fitBounds(L.latLngBounds(coords), {
        padding: [48, 48],
        maxZoom: 14,
        animate: true,
        duration: 0.65
      });
    }
  }

  function selectCard(itemIndex, flyTo) {
    const day = data.days[currentDay];
    const item = day.items[itemIndex];
    if (!item) return;

    document.querySelectorAll(".card").forEach((card) => card.classList.remove("is-active"));
    const target = document.querySelector(`[data-card="${currentDay}-${itemIndex}"]`);
    if (target) {
      target.classList.add("is-active");
      target.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    if (mapMarkers[itemIndex]) {
      mapMarkers[itemIndex].setStyle({ radius: 10, weight: 3 });
    }

    if (flyTo) {
      map.flyTo([item.lat, item.lng], 15, { duration: 0.65 });
    }
  }

  function renderDay(index) {
    currentDay = index;
    renderDayTabs();
    renderDayHeading();
    renderTimeline();
    renderMap();
  }

  function setTheme(mode) {
    const isMd = mode === "md";
    document.body.classList.toggle("theme-md", isMd);
    document.body.classList.toggle("theme-apple", !isMd);
    els.themeToggle.setAttribute("aria-pressed", String(isMd));
    els.themeToggleText.textContent = isMd ? "Apple 设计系统" : "awesome-design-md";
    try {
      localStorage.setItem("qingdao-travel-theme", mode);
    } catch (error) {
      // 忽略隐私模式下的存储错误
    }
  }

  function bindEvents() {
    els.dayTabs.addEventListener("click", (event) => {
      const tab = event.target.closest("[data-day-index]");
      if (!tab) return;
      renderDay(Number(tab.dataset.dayIndex));
    });

    els.timeline.addEventListener("click", (event) => {
      const action = event.target.closest("[data-action]");
      const card = event.target.closest("[data-card]");

      if (action) {
        event.stopPropagation();
        const [, itemIndex] = card.dataset.card.split("-").map(Number);
        const item = data.days[currentDay].items[itemIndex];
        const actionName = action.dataset.action;

        if (actionName === "nav") openNavActionSheet(item);
        if (actionName === "xhs") openXhs(item);
        if (actionName === "dianping") openDianping(item);
        if (actionName === "booking") openBooking(item);
        return;
      }

      if (card) {
        const [, itemIndex] = card.dataset.card.split("-").map(Number);
        selectCard(itemIndex, true);
      }
    });

    els.timeline.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        const card = event.target.closest("[data-card]");
        if (card) {
          event.preventDefault();
          const [, itemIndex] = card.dataset.card.split("-").map(Number);
          selectCard(itemIndex, true);
        }
      }
    });

    document.querySelectorAll("[data-nav]").forEach((button) => {
      button.addEventListener("click", () => handleNavOption(button.dataset.nav));
    });

    els.actionSheetClose.addEventListener("click", closeNavActionSheet);
    els.actionSheetCancel.addEventListener("click", closeNavActionSheet);
    els.actionSheetBackdrop.addEventListener("click", (event) => {
      if (event.target === els.actionSheetBackdrop) closeNavActionSheet();
    });

    els.noteClose.addEventListener("click", closeNoteModal);
    els.noteConfirm.addEventListener("click", closeNoteModal);
    els.noteModal.addEventListener("click", (event) => {
      if (event.target === els.noteModal) closeNoteModal();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if (!els.actionSheetBackdrop.hidden) closeNavActionSheet();
        if (!els.noteModal.hidden) closeNoteModal();
      }
    });

    els.themeToggle.addEventListener("click", () => {
      const next = document.body.classList.contains("theme-md") ? "apple" : "md";
      setTheme(next);
    });

    window.addEventListener("resize", () => {
      map.invalidateSize();
    });
  }

  function initTheme() {
    let saved = "apple";
    try {
      saved = localStorage.getItem("qingdao-travel-theme") || "apple";
    } catch (error) {
      saved = "apple";
    }
    setTheme(saved === "md" ? "md" : "apple");
  }

  function init() {
    els.brandTitle.textContent = data.meta.title;
    els.brandSubtitle.textContent = data.meta.subtitle;
    initTheme();
    bindEvents();
    renderDay(0);
    setTimeout(() => map.invalidateSize(), 80);
  }

  init();
})();
