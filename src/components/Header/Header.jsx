import { toast } from '../../utils/toast';
import './Header.css';

export function Header({ title, profile, onMenuClick }) {
  const initials = profile
    ? `${profile.firstName?.[0] || ''}${profile.lastName?.[0] || ''}`.toUpperCase()
    : '?';

  return (
    <header className="header">
      <div className="header__left">
        <button className="header__menu-btn" onClick={onMenuClick} aria-label="Open menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <h1 className="header__title">{title}</h1>
      </div>

      <div className="header__right">
        <button className="header__tutorial-btn" onClick={() => toast("Feature coming soon")}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          Watch Tutorial
        </button>
        <button className="header__avatar" aria-label="Profile" onClick={() => toast("Feature coming soon")}>
          {initials}
        </button>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="header__chevron">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </header>
  );
}
