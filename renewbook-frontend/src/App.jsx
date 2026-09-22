import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import Resources from './Components/Resources'
import Login from './Components/Login'
import Register from './Components/Register'
import Dashboard from './Components/Dashboard'
import ShareResource from './Components/ShareResource'
import AdminDashboard from './Components/AdminDashboard'
import AdminLogin from './Components/AdminLogin'
import ViewRequests from './Components/ViewRequest'
import IncomingRequests from './Components/IncomingRequests'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/resources' element={<Resources />} />
        <Route path='/login' element={<Login />} />
         <Route path='/register' element={<Register />} />
         <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/share' element={<ShareResource/>} />
          <Route path='/admin' element={<AdminDashboard/>} />
           <Route path='/adminlogin' element={<AdminLogin/>} />
           <Route path='/view-request' element={<ViewRequests/>} />
           <Route path='/incoming-request' element={<IncomingRequests/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App