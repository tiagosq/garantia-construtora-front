import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Menu from './components/Menu'
import Dashboard from './pages/Dashboard'

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
      </Route>
    </Routes>
  )
}

export default AppRouter