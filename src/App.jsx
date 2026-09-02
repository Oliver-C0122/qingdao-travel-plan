import { useCallback, useEffect, useRef, useState } from "react";
import { TRAVEL_DATA } from "../data.js";
import TravelMap from "./components/TravelMap.jsx";
import DayTabs from "./components/DayTabs.jsx";
import PlaceCard from "./components/PlaceCard.jsx";
import NavActionSheet from "./components/NavActionSheet.jsx";
import NoteModal from "./components/NoteModal.jsx";
import Toast from "./components/Toast.jsx";
import {
  launch,
  buildAppleUrl,
  buildGoogleUrl,
  buildAmapUrl,
  buildXhsUrl,
  buildDianpingUrl,
  isMobile,
  isRestrictedWebView
} from "./deepLinks.js";

function getInitialTheme() {
  try {
    return localStorage.getItem("qingdao-travel-theme") === "md" ? "md" : "apple";
  } catch {
    return "apple";
  }
}

function App() {
  const [activeDay, setActiveDay] = useState(0);
  const [activeItem, setActiveItem] = useState(TRAVEL_DATA.days[0].items[0]);
  const [theme, setTheme] = useState(getInitialTheme);
  const [navItem, setNavItem] = useState(null);
  const [note, setNote] = useState(null);
  const [toast, setToast] = useState("");
  const toastTimerRef = useRef(null);

  const day = TRAVEL_DATA.days[activeDay];

  const showToast = useCallback((message) => {
    setToast(message);
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(""), 2600);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("theme-apple", theme === "apple");
    document.body.classList.toggle("theme-md", theme === "md");
    try {
      localStorage.setItem("qingdao-travel-theme", theme);
    } catch {
      // 忽略隐私模式下的存储错误
    }
  }, [theme]);

  useEffect(() => {
    if (!activeItem) return;
    const element = document.getElementById(activeItem.id);
    element?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeItem]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setNavItem(null);
      setNote(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleDayChange = (index) => {
    setActiveDay(index);
    setActiveItem(TRAVEL_DATA.days[index].items[0]);
  };

  const handleSelect = useCallback((item) => {
    setActiveItem(item);
  }, []);

  const handleNavOption = (type) => {
    if (!navItem) return;
    const item = navItem;
    const navMap = {
      apple: { url: buildAppleUrl(item), label: "Apple Maps" },
      google: { url: buildGoogleUrl(item), label: "Google Maps" },
      amap: { url: buildAmapUrl(item), label: "高德地图" }
    };
    const target = navMap[type];
    setNavItem(null);
    if (!target) return;
    launch(target.url);
    showToast(`正在打开 ${target.label}${isMobile() ? "" : "（桌面端使用网页地图）"}`);
  };

  const handleXhs = (item) => {
    const restricted = isRestrictedWebView();
    launch(buildXhsUrl(item));
    if (restricted) {
      showToast("检测到微信 / 抖音 WebView，已降级到小红书 H5。");
    } else if (!isMobile()) {
      showToast("桌面端已打开小红书网页搜索。");
    } else {
      showToast("正在打开小红书 App。");
    }
  };

  const handleDianping = (item) => {
    launch(buildDianpingUrl(item));
    showToast(isMobile() ? "正在打开大众点评 App。" : "桌面端请确认已安装大众点评 App。");
  };

  const handleBooking = (item) => {
    if (!item.booking) return;
    if (item.booking.mode === "note") {
      setNote({
        title: item.booking.label || "预约提示",
        body: item.booking.note || "请在官方渠道确认预约。"
      });
      return;
    }
    launch(item.booking.url);
    showToast("正在打开预约页面…");
  };

  const handleThemeToggle = () => {
    setTheme((current) => (current === "md" ? "apple" : "md"));
  };

  return (
    <>
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">🗺</div>
          <div className="brand-copy">
            <h1>{TRAVEL_DATA.meta.title}</h1>
            <p>{TRAVEL_DATA.meta.subtitle}</p>
          </div>
        </div>
        <button
          className="theme-toggle"
          type="button"
          aria-pressed={theme === "md"}
          aria-label="切换界面风格"
          onClick={handleThemeToggle}
        >
          <span className="theme-toggle-dot" aria-hidden="true" />
          <span>{theme === "md" ? "Apple 设计系统" : "awesome-design-md"}</span>
        </button>
      </header>

      <main className="layout">
        <aside className="panel" aria-label="旅行时间轴">
          <DayTabs
            days={TRAVEL_DATA.days}
            activeDay={activeDay}
            onChange={handleDayChange}
          />
          <section className="day-heading" aria-live="polite">
            <p className="day-date">{day.date}</p>
            <h2>{day.title}</h2>
            <p>{day.subtitle}</p>
          </section>
          <ol className="timeline" style={{ "--day-accent": day.accent }}>
            {day.items.map((item, itemIndex) => (
              <PlaceCard
                key={item.id}
                item={item}
                itemIndex={itemIndex}
                active={activeItem?.id === item.id}
                onSelect={() => handleSelect(item)}
                onNav={setNavItem}
                onXhs={handleXhs}
                onDianping={handleDianping}
                onBooking={handleBooking}
              />
            ))}
          </ol>
        </aside>

        <section className="map-wrap" aria-label="青岛旅行地图">
          <TravelMap day={day} activeItem={activeItem} onSelect={handleSelect} />
          <div className="map-hint">
            <span>📍 点击卡片可定位</span>
            <span>🔄 按天切换路线</span>
          </div>
        </section>
      </main>

      <NavActionSheet item={navItem} onClose={() => setNavItem(null)} onNavigate={handleNavOption} />
      <NoteModal note={note} onClose={() => setNote(null)} />
      <Toast message={toast} />
    </>
  );
}

export default App;
