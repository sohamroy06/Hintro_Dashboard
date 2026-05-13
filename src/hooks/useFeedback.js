import { useState, useCallback } from 'react';

const STORAGE_KEY = 'hintro_feedback';

export function useFeedback() {
  const [feedbackList, setFeedbackList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  });

  const submitFeedback = useCallback(({ userId, rating, text }) => {
    const entry = {
      userId,
      rating,
      text,
      timestamp: new Date().toISOString(),
    };
    const updated = [...feedbackList, entry];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setFeedbackList(updated);
    return entry;
  }, [feedbackList]);

  const clearFeedback = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setFeedbackList([]);
  }, []);

  return { feedbackList, submitFeedback, clearFeedback };
}
