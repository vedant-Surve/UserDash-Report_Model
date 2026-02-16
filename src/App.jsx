import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Signup from './pages/Signup';
import Login from './pages/Login'; // Capitalized L to match standard naming
import ProtectedRoute from './components/ProtectedRoute'; // Lowercase 'c' for components folder

// Import the actual Dashboard component you created
import UserDashboard from './pages/UserDashboard'; 

// Import the CSS file
import './App.css';

// Admin and Authority placeholders (You can move these to separate files later)
const AdminDB = () => <div className="dashboard"><h1>Admin Panel</h1><p>System Management.</p></div>;
const AuthDB = () => <div className="dashboard"><h1>Authority Portal</h1><p>Review Reports.</p></div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Requirement: Signup appears first */}
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Role-based Protected Routes */}
          <Route path="/user" element={
            <ProtectedRoute allowedRole="Normal User">
              {/* Using the actual imported Dashboard instead of UserDB */}
              <UserDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute allowedRole="Admin">
              <AdminDB />
            </ProtectedRoute>
          } />

          <Route path="/authority" element={
            <ProtectedRoute allowedRole="Government Authority">
              <AuthDB />
            </ProtectedRoute>
          } />

          {/* Prevent "No routes matched" errors */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;