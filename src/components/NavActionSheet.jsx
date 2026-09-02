import { useEffect, useRef } from "react";

function NavActionSheet({ item, onClose, onNavigate }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (item && closeRef.current) {
      closeRef.current.focus();
    }
  }, [item]);

  if (!item) return null;

  return (
    <div
      className="sheet-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <section
        className="action-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="actionSheetTitle"
      >
        <div className="sheet-grabber" aria-hidden="true" />
        <div className="sheet-header">
          <div>
            <p className="sheet-eyebrow">选择导航方式</p>
            <h2 id="actionSheetTitle">📍 {item.title}</h2>
          </div>
          <button
            ref={closeRef}
            className="icon-button"
            type="button"
            aria-label="关闭"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="sheet-actions">
          <button className="nav-option" type="button" onClick={() => onNavigate?.("apple")}>
            <span className="nav-icon apple-icon" aria-hidden="true">🍎</span>
            <span className="nav-copy">
              <strong>Apple Maps</strong>
              <small>使用系统地图 App</small>
            </span>
            <span className="nav-arrow" aria-hidden="true">›</span>
          </button>
          <button className="nav-option" type="button" onClick={() => onNavigate?.("google")}>
            <span className="nav-icon google-icon" aria-hidden="true">📍</span>
            <span className="nav-copy">
              <strong>Google Maps</strong>
              <small>使用 Google 地图 App</small>
            </span>
            <span className="nav-arrow" aria-hidden="true">›</span>
          </button>
          <button className="nav-option" type="button" onClick={() => onNavigate?.("amap")}>
            <span className="nav-icon amap-icon" aria-hidden="true">🧭</span>
            <span className="nav-copy">
              <strong>高德地图 App</strong>
              <small>直接唤起高德导航</small>
            </span>
            <span className="nav-arrow" aria-hidden="true">›</span>
          </button>
        </div>
        <button className="sheet-cancel" type="button" onClick={onClose}>
          取消
        </button>
      </section>
    </div>
  );
}

export default NavActionSheet;
