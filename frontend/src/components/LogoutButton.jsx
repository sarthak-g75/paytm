import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { authState } from '../state/atoms/AuthState'
const LogoutButton = () => {
  const [auth, setAuth] = useRecoilState(authState)
  const history = useNavigate()
  const handleLogout = () => {
    if (auth) {
      localStorage.removeItem('token')
      setAuth(!auth)
      history('/')
    } else {
      history('/')
    }
  }
  return (
    <button
      onClick={handleLogout}
      className='px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-800'
    >
      Logout
    </button>
  )
}

export default LogoutButton
