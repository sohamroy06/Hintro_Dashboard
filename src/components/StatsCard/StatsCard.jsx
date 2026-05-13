import './StatsCard.css';

export function StatsCard({ label, value, icon, iconBg, iconColor }) {
  return (
    <div className="stats-card animate-fade-in">
      <div
        className="stats-card__icon"
        style={{ background: iconBg, color: iconColor }}
      >
        {icon}
      </div>
      <div className="stats-card__content">
        <span className="stats-card__label">{label}</span>
        <span className="stats-card__value">{value}</span>
      </div>
    </div>
  );
}
