import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useFeedback } from '../../hooks/useFeedback';
import './FeedbackModal.css';

const STEP_RATE = 'rate';
const STEP_TEXT = 'text';
const STEP_DONE = 'done';

const STAR_RATINGS = [1, 2, 3, 4, 5];
const STAR_LABELS = {
  1: 'Poor',
  2: 'Fair',
  3: 'Okay',
  4: 'Good',
  5: 'Great',
};

export function FeedbackModal({ onClose }) {
  const { userId } = useUser();
  const { submitFeedback } = useFeedback();
  const [step, setStep] = useState(STEP_RATE);
  const [rating, setRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);
  const [text, setText] = useState('');

  function handleSubmit() {
    submitFeedback({ userId, rating, text });
    setStep(STEP_DONE);
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="feedback-modal">
        <button className="feedback-modal__close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {step === STEP_RATE && (
          <div className="feedback-modal__step animate-fade-in">
            <h3 className="feedback-modal__title">Share your feedback</h3>
            <p className="feedback-modal__subtitle">How would you rate your experience with Hintro?</p>
            <div className="feedback-modal__ratings">
              {STAR_RATINGS.map((value) => {
                const preview = hoverRating ?? rating;
                const filled = preview >= value;
                return (
                  <button
                    key={value}
                    type="button"
                    className={`feedback-modal__star-btn ${rating === value ? 'selected' : ''}`}
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHoverRating(value)}
                    onMouseLeave={() => setHoverRating(null)}
                    aria-label={`${value} star${value > 1 ? 's' : ''} - ${STAR_LABELS[value]}`}
                  >
                    <svg className={`feedback-modal__star ${filled ? 'filled' : 'empty'}`} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.172L12 18.897l-7.336 3.873 1.402-8.172L.132 9.21l8.2-1.192z" />
                    </svg>
                  </button>
                );
              })}
            </div>
            <button
              className="feedback-modal__next"
              disabled={!rating}
              onClick={() => setStep(STEP_TEXT)}
            >
              Next
            </button>
          </div>
        )}

        {step === STEP_TEXT && (
          <div className="feedback-modal__step animate-fade-in">
            <h3 className="feedback-modal__title">Tell us more</h3>
            <p className="feedback-modal__subtitle">Any additional thoughts? (optional)</p>
            <div className="feedback-modal__selected-rating">
              <div className="feedback-modal__selected-stars">
                {STAR_RATINGS.map((v) => (
                  <svg key={v} width="16" height="16" viewBox="0 0 24 24" className={`feedback-modal__star ${v <= rating ? 'filled' : 'empty'}`} fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.172L12 18.897l-7.336 3.873 1.402-8.172L.132 9.21l8.2-1.192z" />
                  </svg>
                ))}
              </div>
              <div className="feedback-modal__selected-label">{STAR_LABELS[rating]}</div>
            </div>
            <textarea
              className="feedback-modal__textarea"
              placeholder="What could we improve? What did you love?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
            />
            <div className="feedback-modal__actions">
              <button className="feedback-modal__back" onClick={() => setStep(STEP_RATE)}>
                Back
              </button>
              <button className="feedback-modal__submit" onClick={handleSubmit}>
                Submit Feedback
              </button>
            </div>
          </div>
        )}

        {step === STEP_DONE && (
          <div className="feedback-modal__step feedback-modal__done animate-fade-in">
            <div className="feedback-modal__done-icon">🎉</div>
            <h3 className="feedback-modal__title">Thank you!</h3>
            <p className="feedback-modal__subtitle">Your feedback has been recorded and will help us improve Hintro.</p>
            <button className="feedback-modal__next" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function FeedbackHistoryModal({ onClose }) {
  const { feedbackList, clearFeedback } = useFeedback();

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="feedback-modal feedback-history-modal">
        <button className="feedback-modal__close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <h3 className="feedback-modal__title">Feedback History</h3>
        <p className="feedback-modal__subtitle">
          {feedbackList.length} submission{feedbackList.length !== 1 ? 's' : ''} saved
        </p>

        {feedbackList.length === 0 ? (
          <div className="feedback-history__empty">
            <p>No feedback submitted yet.</p>
          </div>
        ) : (
          <div className="feedback-history__list">
            {[...feedbackList].reverse().map((item, i) => (
              <div key={i} className="feedback-history__item">
                <div className="feedback-history__item-header">
                  <span className="feedback-history__stars">
                    {STAR_RATINGS.map((v) => (
                      <svg key={v} width="14" height="14" viewBox="0 0 24 24" className={`feedback-modal__star ${v <= item.rating ? 'filled' : 'empty'}`} fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.172L12 18.897l-7.336 3.873 1.402-8.172L.132 9.21l8.2-1.192z" />
                      </svg>
                    ))}
                  </span>
                  <span className="feedback-history__user">User: {item.userId}</span>
                  <span className="feedback-history__date">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </div>
                {item.text && (
                  <p className="feedback-history__text">"{item.text}"</p>
                )}
              </div>
            ))}
            <button className="feedback-history__clear" onClick={clearFeedback}>
              Clear all feedback
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
