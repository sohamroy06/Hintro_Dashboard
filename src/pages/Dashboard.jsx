import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useApi } from '../hooks/useApi';
import { api } from '../utils/api';
import { secondsToHuman, relativeTime } from '../utils/time';
import { Header } from '../components/Header/Header';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { StatsCard } from '../components/StatsCard/StatsCard';
import { CallHistoryTable } from '../components/CallHistoryTable/CallHistoryTable';
import { FeedbackModal, FeedbackHistoryModal } from '../components/FeedbackModal/FeedbackModal';
import { SkeletonStatCard } from '../components/SkeletonLoader/SkeletonLoader';
import './Dashboard.css';

// Icons as inline SVG components
const IconTotalSessions = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 20V10"/>
    <path d="M12 20V4"/>
    <path d="M6 20v-6"/>
  </svg>
);

const IconDuration = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconAI = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5"/>
    <path d="M2 12l10 5 10-5"/>
  </svg>
);

const IconCalendar = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

export function Dashboard() {
  const { userId } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackHistoryOpen, setFeedbackHistoryOpen] = useState(false);

  const profileApi = useApi(api.getProfile, userId);
  const statsApi = useApi(api.getStats, userId);
  const sessionsApi = useApi((uid) => api.getCallSessions(uid, 20), userId);

  const profile = profileApi.data;
  const stats = statsApi.data;
  const sessions = sessionsApi.data;

  const firstName = profile?.firstName || '{{Name}}';

  // Format stats
  const totalSessions = stats?.totalSessions ?? 0;
  const avgDuration = stats?.averageDuration
    ? secondsToHuman(stats.averageDuration)
    : '0';
  const totalAI = stats?.totalAIInteractions ?? 0;
  const lastSession = stats?.lastSession?.length
    ? relativeTime(stats.lastSession[0])
    : '—';

  return (
    <div className="app-layout">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onFeedbackOpen={() => { setFeedbackOpen(true); setSidebarOpen(false); }}
        onFeedbackHistoryOpen={() => { setFeedbackHistoryOpen(true); setSidebarOpen(false); }}
      />

      {sidebarOpen && (
        <div
          className="mobile-overlay active"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="app-main">
        <Header
          title="Dashboard"
          profile={profile}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="app-content">
          {/* Welcome section */}
          <div className="dashboard__welcome">
            <div className="dashboard__welcome-text">
              <h2 className="dashboard__greeting">
                Hi, {firstName} 👋 Welcome to Hintro
              </h2>
              <p className="dashboard__tagline">Ready to make your next call smarter ?</p>
            </div>
            <button className="dashboard__start-btn">
              Start New Call
            </button>
          </div>

          {/* Stats grid */}
          <div className="dashboard__stats">
            {statsApi.loading ? (
              <>
                <SkeletonStatCard />
                <SkeletonStatCard />
                <SkeletonStatCard />
                <SkeletonStatCard />
              </>
            ) : statsApi.error ? (
              <div className="dashboard__error">
                <span>Failed to load stats</span>
                <button onClick={statsApi.refetch} className="dashboard__retry-btn">Retry</button>
              </div>
            ) : (
              <>
                <StatsCard
                  label="Total Sessions"
                  value={String(totalSessions)}
                  icon={<IconTotalSessions />}
                  iconBg="var(--color-icon-pink)"
                  iconColor="var(--color-icon-pink-text)"
                />
                <StatsCard
                  label="Average Duration"
                  value={avgDuration}
                  icon={<IconDuration />}
                  iconBg="var(--color-icon-teal)"
                  iconColor="var(--color-icon-teal-text)"
                />
                <StatsCard
                  label="AI Used"
                  value={totalAI > 0 ? `${totalAI} times` : String(totalAI)}
                  icon={<IconAI />}
                  iconBg="var(--color-icon-green)"
                  iconColor="var(--color-icon-green-text)"
                />
                <StatsCard
                  label="Last Session"
                  value={lastSession}
                  icon={<IconCalendar />}
                  iconBg="var(--color-icon-purple)"
                  iconColor="var(--color-icon-purple-text)"
                />
              </>
            )}
          </div>

          {/* Call history */}
          <CallHistoryTable
            sessions={sessions}
            loading={sessionsApi.loading}
            error={sessionsApi.error}
            onRetry={sessionsApi.refetch}
          />
        </div>
      </div>

      {feedbackOpen && (
        <FeedbackModal onClose={() => setFeedbackOpen(false)} />
      )}
      {feedbackHistoryOpen && (
        <FeedbackHistoryModal onClose={() => setFeedbackHistoryOpen(false)} />
      )}
    </div>
  );
}
