import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { FormInput } from '../components/FormInput/FormInput';
import { toast } from '../utils/toast';
import './Login.css';

export function Login() {
  const navigate = useNavigate();
  const { setUserId } = useUser();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Check if user is already logged in
  useEffect(() => {
    const savedUserId = localStorage.getItem('userId');
    if (savedUserId) {
      setUserId(savedUserId);
      navigate('/dashboard', { replace: true });
    }
  }, [navigate, setUserId]);

  // Validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast('Please fix the errors above');
      return;
    }

    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      // Mock authentication logic
      const userId = email.toLowerCase().includes('u1') ? 'u1' : 'u2';
      
      // Save userId to localStorage
      localStorage.setItem('userId', userId);
      
      // Update context
      setUserId(userId);
      
      // Show success message
      toast(`Logged in as ${userId}`);
      
      // Redirect to dashboard
      navigate('/dashboard', { replace: true });
      setIsLoading(false);
    }, 600);
  };

  const isFormValid = email.trim() && password.trim();

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Login</h1>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <FormInput
            label="Email"
            type="email"
            placeholder="Example@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            error={errors.email}
            disabled={isLoading}
          />

          <FormInput
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            error={errors.password}
            disabled={isLoading}
            showPasswordToggle
          />

          <button
            type="submit"
            className={`login-button ${!isFormValid || isLoading ? 'login-button--disabled' : ''}`}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <>
                <span className="login-button__spinner"></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Demo credentials block - quick reference for testers */}
        <div className="login-creds" aria-hidden="false">
          <div className="login-creds__grid">
            <div className="login-creds__item">
              <div className="login-creds__title">Empty user <span className="login-creds__tag">(u1)</span></div>
              <div className="login-creds__details">
                <div className="login-creds__line"><span className="login-creds__label">Email:</span> <strong>user.u1@example.com</strong></div>
                <div className="login-creds__line"><span className="login-creds__label">Password:</span> <strong>password</strong></div>
              </div>
            </div>

            <div className="login-creds__item">
              <div className="login-creds__title">Active user <span className="login-creds__tag">(u2)</span></div>
              <div className="login-creds__details">
                <div className="login-creds__line"><span className="login-creds__label">Email:</span> <strong>user.u2@example.com</strong></div>
                <div className="login-creds__line"><span className="login-creds__label">Password:</span> <strong>password</strong></div>
              </div>
            </div>
          </div>
        </div>

        <div className="login-hint">
          <p className="login-hint__text">
            Demo tip: Use email containing "u1" to login as empty user, otherwise as active user (u2)
          </p>
        </div>
      </div>
    </div>
  );
}
