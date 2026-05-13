/**
 * Convert seconds to human readable duration
 * e.g. 862 -> "14m 22sec", 7320 -> "2h 2m"
 */
export function secondsToHuman(s) {
  if (!s || s === 0) return '0';
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = Math.floor(s % 60);

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }
  if (minutes > 0) {
    return seconds > 0 ? `${minutes}m ${seconds}sec` : `${minutes}m`;
  }
  return `${seconds}sec`;
}

/**
 * Format ISO date string to readable date
 * e.g. "2026-05-09T..." -> "May 9, 2026"
 */
export function formatDate(isoString) {
  if (!isoString) return '—';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format date for call list group header
 * e.g. "April 29th"
 */
export function formatDateGroup(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  const day = date.getDate();
  const suffix = getDaySuffix(day);
  return date.toLocaleDateString('en-US', { month: 'long' }) + ' ' + day + suffix;
}

function getDaySuffix(day) {
  if (day >= 11 && day <= 13) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

/**
 * Format time from ISO string
 * e.g. "11:00 am"
 */
export function formatTime(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).toLowerCase();
}

/**
 * Relative time from now
 * e.g. "3 days ago", "just now"
 */
export function relativeTime(isoString) {
  if (!isoString) return '—';
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffSeconds < 60) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
  if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  return formatDate(isoString);
}

/**
 * Get date key (YYYY-MM-DD) for grouping
 */
export function getDateKey(isoString) {
  if (!isoString) return '';
  return new Date(isoString).toISOString().split('T')[0];
}
