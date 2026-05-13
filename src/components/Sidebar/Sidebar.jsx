import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { toast } from '../../utils/toast';
import './Sidebar.css';

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    active: true,
  },
  {
    label: 'Call Insights',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.23h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.77-.77a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    label: 'Knowledge Base',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    hasInfo: true,
  },
  {
    label: 'Prompts',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    hasInfo: true,
  },
  {
    label: 'Boxy Controls',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    hasInfo: true,
  },
];

const BOTTOM_ITEMS = [
  {
    label: 'Feedback History',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <polyline points="17 8 12 3 7 8"/>
      </svg>
    ),
    id: 'feedback-history',
  },
  {
    label: 'Feedback',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12"/>
        <rect x="2" y="7" width="20" height="5"/>
        <line x1="12" y1="22" x2="12" y2="7"/>
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
      </svg>
    ),
    id: 'feedback',
  },
];

export function Sidebar({ isOpen, onClose, onFeedbackOpen, onFeedbackHistoryOpen }) {
  const navigate = useNavigate();
  const { userId, setUserId } = useUser();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUserId('u2');
    navigate('/login', { replace: true });
    toast('Logged out successfully');
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'sidebar--mobile-open' : ''}`}>
        {/* Mobile close button */}
        <button className="sidebar__mobile-close" onClick={onClose} aria-label="Close menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="sidebar__logo">
          <span className="sidebar__logo-text">Hintro</span>
        </div>

        <nav className="sidebar__nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              className={`sidebar__nav-item ${item.active ? 'sidebar__nav-item--active' : ''}`}
              onClick={() => !item.active && toast("Feature coming soon")}
            >
              <span className="sidebar__nav-icon">{item.icon}</span>
              <span className="sidebar__nav-label">{item.label}</span>
              {item.hasInfo && (
                <span className="sidebar__nav-info">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar__bottom">
          <div className="sidebar__bottom-nav">
            <button
              className="sidebar__nav-item"
              onClick={onFeedbackHistoryOpen}
            >
              <span className="sidebar__nav-icon">{BOTTOM_ITEMS[0].icon}</span>
              <span className="sidebar__nav-label">Feedback History</span>
            </button>
            <button
              className="sidebar__nav-item"
              onClick={onFeedbackOpen}
            >
              <span className="sidebar__nav-icon">{BOTTOM_ITEMS[1].icon}</span>
              <span className="sidebar__nav-label">Feedback</span>
            </button>
          </div>

          {/* User switcher */}
          <div className="sidebar__user-switcher">
            <span className="sidebar__user-label">Switch User</span>
            <div className="sidebar__user-toggle">
              <button
                className={`sidebar__user-btn ${userId === 'u1' ? 'active' : ''}`}
                onClick={() => setUserId('u1')}
              >
                U1 <span className="sidebar__user-hint">Empty</span>
              </button>
              <button
                className={`sidebar__user-btn ${userId === 'u2' ? 'active' : ''}`}
                onClick={() => setUserId('u2')}
              >
                U2 <span className="sidebar__user-hint">Active</span>
              </button>
            </div>
          </div>

          <button className="sidebar__upgrade" onClick={() => toast("Feature coming soon")}>Upgrade</button>
          <button className="sidebar__logout" onClick={handleLogout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
