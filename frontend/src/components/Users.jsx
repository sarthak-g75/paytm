import React from 'react'
import { UserState } from '../state/atoms/AuthState'
import { Link } from 'react-router-dom'
import { useRecoilValueLoadable } from 'recoil'

const Users = () => {
  const usersLoadable = useRecoilValueLoadable(UserState)

  let content

  if (usersLoadable.state === 'hasValue') {
    const users = usersLoadable.contents
    content = (
      <div className='flex flex-col gap-4'>
        {users.map((elem, index) => {
          return (
            <div
              key={elem._id}
              className='flex flex-row items-center justify-between'
            >
              <div className='flex flex-row items-center gap-4'>
                <h2 className='p-2 font-bold rounded-full bg-slate-300'>
                  U{index + 1}
                </h2>
                <h3 className='text-lg font-semibold'>
                  {elem.fname + ' ' + elem.lname}
                </h3>
              </div>
              <Link
                to={`/send/${elem._id}`}
                className='px-4 py-2 text-lg text-white bg-black rounded-lg '
              >
                Send Money
              </Link>
            </div>
          )
        })}
      </div>
    )
  } else if (usersLoadable.state === 'loading') {
    content = <div>Loading users...</div>
  } else if (usersLoadable.state === 'hasError') {
    content = <div>Error loading users: {usersLoadable.contents}</div>
  }
  return <div>{content}</div>
}

export default Users
