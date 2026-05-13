import { useState } from 'react';
import { formatDateGroup, formatTime, getDateKey } from '../../utils/time';
import { EmptyState } from '../EmptyState/EmptyState';
import { SkeletonCallItem } from '../SkeletonLoader/SkeletonLoader';
import './CallHistoryTable.css';

function groupSessionsByDate(sessions) {
  const groups = {};
  sessions.forEach((session) => {
    const key = getDateKey(session.started_at);
    if (!groups[key]) groups[key] = [];
    groups[key].push(session);
  });
  return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
}

function getClientInitial(session) {
  const clientName = session.client || session.description || 'Call';
  return clientName[0]?.toUpperCase() || 'C';
}

function SessionMenu({ session }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="session-menu">
      <button
        className="session-menu__trigger"
        onClick={() => setOpen(!open)}
        aria-label="Session options"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="1.5"/>
          <circle cx="12" cy="12" r="1.5"/>
          <circle cx="12" cy="19" r="1.5"/>
        </svg>
      </button>
      {open && (
        <div className="session-menu__dropdown" onBlur={() => setOpen(false)}>
          <button onClick={() => setOpen(false)}>View Details</button>
          <button onClick={() => setOpen(false)}>Download Transcript</button>
          <button onClick={() => setOpen(false)}>Delete</button>
        </div>
      )}
    </div>
  );
}

export function CallHistoryTable({ sessions, loading, error, onRetry }) {
  if (loading) {
    return (
      <div className="call-history">
        <h2 className="call-history__title">Recent calls</h2>
        <div className="call-history__list">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCallItem key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="call-history">
        <h2 className="call-history__title">Recent calls</h2>
        <div className="call-history__error">
          <p>Failed to load call history</p>
          <button onClick={onRetry} className="call-history__retry">Retry</button>
        </div>
      </div>
    );
  }

  const sessionList = sessions?.sessions || sessions || [];

  if (!sessionList.length) {
    return (
      <div className="call-history">
        <h2 className="call-history__title">Recent calls</h2>
        <div className="call-history__empty-wrap">
          <EmptyState
            title="No Recent Calls"
            description="Connect your Google Calendar to see upcoming meetings, get reminders, and join calls directly from Hintro."
            action="Start a Call"
          />
        </div>
      </div>
    );
  }

  const grouped = groupSessionsByDate(sessionList);

  return (
    <div className="call-history animate-fade-in">
      <h2 className="call-history__title">Recent calls</h2>
      <div className="call-history__groups">
        {grouped.map(([dateKey, items]) => (
          <div key={dateKey} className="call-history__group">
            <p className="call-history__date-label">
              {formatDateGroup(items[0].started_at)}
            </p>
            {items.map((session) => (
              <div key={session._id} className="call-session">
                <div className="call-session__avatar">
                  {getClientInitial(session)}
                </div>
                <div className="call-session__info">
                  <span className="call-session__name">
                    {session.client || session.description || 'Unnamed Call'}
                  </span>
                  <span className="call-session__participants">
                    {session.participants?.map(() => '👤').join('') || '👤'}
                  </span>
                </div>
                <div className="call-session__meta">
                  <span className="call-session__time">
                    {formatTime(session.started_at)}
                  </span>
                  <SessionMenu session={session} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
