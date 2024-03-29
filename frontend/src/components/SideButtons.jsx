import React from 'react'
import Button from './Button'

import LogoutButton from './LogoutButton'
import { useRecoilValue } from 'recoil'
import { authState } from '../state/atoms/AuthState'
const SideButtons = () => {
  const auth = useRecoilValue(authState)
  return (
    <div>
      {auth ? (
        <div className='flex items-center justify-center gap-4 text-xl'>
          <Button
            path='dashboard'
            value='Dashboard'
          />
          <LogoutButton />
        </div>
      ) : (
        <div className='flex items-center justify-center gap-4 text-xl'>
          <Button
            path='signin'
            value='Login'
          />
          <Button
            path='signup'
            value='Sign Up'
          />
        </div>
      )}
    </div>
  )
}

export default SideButtons
