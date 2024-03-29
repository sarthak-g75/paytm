import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { authState, filterState } from '../state/atoms/AuthState'
import Balance from '../components/Balance'
import Users from '../components/Users'
import '../index.css'

const Dashboard = () => {
  // console.log('hello')
  const history = useNavigate()
  const [filter, setFilter] = useRecoilState(filterState)
  const auth = useRecoilValue(authState)
  useEffect(() => {
    if (!auth) {
      history('/signin')
    }
  }, [auth])

  return (
    <div className='flex flex-col gap-10 px-10 py-28 '>
      <Balance />
      <div className='flex flex-col gap-6 '>
        <h2 className='text-2xl font-bold'>Users</h2>
        <input
          className='px-4 py-2 border-slate-400 border-[1px] rounded-md'
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          type='text'
          placeholder='Enter first name or the last name'
        />
        <Users />
      </div>
    </div>
  )
}

export default Dashboard
