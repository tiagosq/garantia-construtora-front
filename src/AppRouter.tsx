import { Route, Routes } from 'react-router-dom'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<></>} />
      <Route path="/login" element={<></>} />
      <Route path="/forgot-password" element={<></>} />
      <Route path="/reset-password/:token" element={<></>} />
      <Route path="/dashboard" element={<></>}>
        <Route path="/" element={<></>} index />
        <Route path="/maintenance" element={<></>} />
        <Route path="/maintenance/:id" element={<></>} />
        <Route path="/maintenance/:id/edit" element={<></>} />
        <Route path="/maintenance/new" element={<></>} />
        <Route path="/buildings" element={<></>} />
        <Route path="/buildings/:id" element={<></>} />
        <Route path="/buildings/:id/edit" element={<></>} />
        <Route path="/buildings/new" element={<></>} />
        <Route path="/business" element={<></>} />
        <Route path="/business/:id" element={<></>} />
        <Route path="/business/:id/edit" element={<></>} />
        <Route path="/business/new" element={<></>} />
        <Route path="/profile" element={<></>} />
        <Route path="/logs" element={<></>} />
      </Route>
    </Routes>
  )
}

export default AppRouter