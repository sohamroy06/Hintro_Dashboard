const BASE_URL = import.meta.env.VITE_API_URL || 'https://mock-backend-hintro.vercel.app';

async function apiFetch(endpoint, userId) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'x-user-id': userId,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  getProfile: (userId) => apiFetch('/api/auth/profile', userId),
  getDashboard: (userId) => apiFetch('/api/auth/dashboard', userId),
  getStats: (userId) => apiFetch('/api/call-sessions/stats', userId),
  getCallSessions: (userId, limit = 10) =>
    apiFetch(`/api/call-sessions?limit=${limit}`, userId),
};
