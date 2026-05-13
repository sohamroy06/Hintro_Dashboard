import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import './styles/global.css';

function ProtectedRoute({ children }) {
  const userId = localStorage.getItem('userId');
  
  if (!userId) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
