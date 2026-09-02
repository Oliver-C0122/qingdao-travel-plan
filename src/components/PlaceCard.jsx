import { TRAVEL_DATA } from "../../data.js";

function isDianpingEnabled(item) {
  return (
    (item.type === "food" || item.type === "drink") &&
    item.dianping !== false
  );
}

function PlaceCard({
  item,
  itemIndex,
  active,
  onSelect,
  onNav,
  onXhs,
  onDianping,
  onBooking
}) {
  const typeLabel = TRAVEL_DATA.typeLabels[item.type] || item.type || "地点";
  const hasDianping = isDianpingEnabled(item);

  const stop = (event, handler) => {
    event.stopPropagation();
    handler?.();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect?.();
    }
  };

  return (
    <li className="timeline-item">
      <span className="timeline-dot">{itemIndex + 1}</span>
      <article
        id={item.id}
        className={`card${active ? " is-active" : ""}`}
        role="button"
        tabIndex="0"
        onClick={() => onSelect?.()}
        onKeyDown={handleKeyDown}
      >
        <div className="card-top">
          <span className="time-chip">{item.time}</span>
          <span className="type-badge">{typeLabel}</span>
        </div>
        <h3>{item.title}</h3>
        {item.address ? <p className="address">{item.address}</p> : null}
        {item.note ? <p className="note">{item.note}</p> : null}

        {Array.isArray(item.payments) && item.payments.length > 0 ? (
          <div className="payments" aria-label="支付方式">
            {item.payments.map((key) => (
              <span className="payment-tag" data-payment={key} key={key}>
                {TRAVEL_DATA.paymentLabels[key] || key}
              </span>
            ))}
          </div>
        ) : null}

        <div className="card-actions">
          <button
            className="action-button"
            type="button"
            onClick={(event) => stop(event, () => onNav?.(item))}
          >
            📍 导航
          </button>
          <button
            className="action-button"
            type="button"
            onClick={(event) => stop(event, () => onXhs?.(item))}
          >
            📕 小红书
          </button>
          {hasDianping ? (
            <button
              className="action-button dianping"
              type="button"
              onClick={(event) => stop(event, () => onDianping?.(item))}
            >
              🍜 大众点评
            </button>
          ) : null}
          {item.booking ? (
            <button
              className="action-button"
              type="button"
              onClick={(event) => stop(event, () => onBooking?.(item))}
            >
              📅 {item.booking.label || "预约"}
            </button>
          ) : null}
        </div>
      </article>
    </li>
  );
}

export default PlaceCard;
