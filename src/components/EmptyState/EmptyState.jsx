import './EmptyState.css';

export function EmptyState({ title, description, action, onAction }) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      </div>
      <p className="empty-state__title">{title}</p>
      {description && (
        <p className="empty-state__desc">{description}</p>
      )}
      {action && (
        <button className="empty-state__btn" onClick={onAction}>
          {action}
        </button>
      )}
    </div>
  );
}
