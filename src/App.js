import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddForm from './pages/AddForm';
import SharePage from './pages/SharePage';
import Login from './pages/Login';
import Register from './pages/Register';

const ProtectedRoute = ({ element, ...rest }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/add" element={<ProtectedRoute element={<AddForm />} />} />
        <Route path="/share" element={<ProtectedRoute element={<SharePage />} />} />
      </Routes>
    </Router>
  );
}

export default App;
