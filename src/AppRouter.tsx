import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Menu from './components/Menu'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import Logs from './pages/Logs'
import Logout from './pages/Logout'
import Buildings from './pages/Buildings'
import Users from './pages/Users'
import Roles from './pages/Roles'
import Business from './pages/Business'
import Profile from './pages/Profile'
import Maintenance from './pages/Maintenance'
import FormBuildings from './pages/Forms/FormBuildings'
import FormUsers from './pages/Forms/FormUsers'
import FormRoles from './pages/Forms/FormRoles'
import FormBusiness from './pages/Forms/FormBusiness'
import FormMaintenance from './pages/Forms/FormMaintenance'
import Answer from './pages/Answer'

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

        <Route path="/business" element={<Business />} />
        <Route path="/business/create" element={<FormBusiness type="edit" />} />
        <Route path="/business/:id/view" element={<FormBusiness type="view" />} />
        <Route path="/business/:id/edit" element={<FormBusiness type="edit" />} />

        <Route path="/buildings" element={<Buildings />} />
        <Route path="/buildings/create" element={<FormBuildings type="edit" />} />
        <Route path="/buildings/:id/view" element={<FormBuildings type="view" />} />
        <Route path="/buildings/:id/edit" element={<FormBuildings type="edit" />} />

        <Route path="/users" element={<Users />} />
        <Route path="/users/create" element={<FormUsers type="edit" />} />
        <Route path="/users/:id/view" element={<FormUsers type="view" />} />
        <Route path="/users/:id/edit" element={<FormUsers type="edit" />} />

        <Route path="/roles" element={<Roles />} />
        <Route path="/roles/create" element={<FormRoles type="edit" />} />
        <Route path="/roles/:id/view" element={<FormRoles type="view" />} />
        <Route path="/roles/:id/edit" element={<FormRoles type="edit" />} />
        
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/maintenance/create" element={<FormMaintenance type="edit" />} />
        <Route path="/maintenance/:id/view" element={<FormMaintenance type="view" />} />
        <Route path="/maintenance/:id/edit" element={<FormMaintenance type="edit" />} />

        <Route path="/maintenance/:business/:maintenance" element={<Answer />} />

        <Route path="/logs" element={<Logs />} />
        <Route path="/settings" element={<Profile />} />
      </Route>
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter