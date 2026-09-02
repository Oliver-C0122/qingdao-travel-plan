function DayTabs({ days, activeDay, onChange }) {
  return (
    <nav className="day-tabs" aria-label="按天切换">
      {days.map((day, index) => (
        <button
          key={day.id}
          className={`day-tab${index === activeDay ? " active" : ""}`}
          type="button"
          onClick={() => onChange(index)}
        >
          <strong>Day {index + 1}</strong>
          <small>{day.date.split(" ")[0]}</small>
        </button>
      ))}
    </nav>
  );
}

export default DayTabs;
