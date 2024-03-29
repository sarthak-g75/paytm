import React from 'react'
import SignIn from './screen/SignIn'
import Dashboard from './screen/Dashboard'
import SignUp from './screen/SignUp'
import SendMoney from './screen/SendMoney'
import Navbar from './components/Navbar'
import Landing from './screen/Landing'
import { Routes, Route } from 'react-router-dom'
function App() {
  return (
    <div className='h-screen'>
      <Navbar />
      <Routes>
        <Route
          path={'/'}
          element={<Landing />}
        />
        <Route
          path={'/signin'}
          element={<SignIn />}
        />
        <Route
          path={'/signup'}
          element={<SignUp />}
        />
        <Route
          path={'/dashboard'}
          element={<Dashboard />}
        />
        <Route
          path={'/send/:id'}
          element={<SendMoney />}
        />
      </Routes>
    </div>
  )
}

export default App
