import { Outlet } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';

const AuthLayout = () => (
  <div className="min-h-screen">
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/" element={<Login />} />
    </Routes>
  </div>
);

export default AuthLayout;
