import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Menu from './components/Menu'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import Logs from './pages/Logs'
import Logout from './pages/Logout'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<Navigate to="/login" />} />
      <Route path="/reset-password/:hash" element={<ResetPassword />} />
      <Route element={<Menu />}>
        <Route path="/dashboard" index element={<Dashboard />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter