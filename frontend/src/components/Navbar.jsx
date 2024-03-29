import React from 'react'
import { Link } from 'react-router-dom'
import SideButtons from './SideButtons'
const Navbar = () => {
  return (
    <div className='fixed flex flex-row items-center justify-between w-full px-6 py-4 bg-white shadow-md h-max'>
      <Link
        to={'/'}
        className='text-2xl font-bold'
      >
        Pay<span className='text-blue-600'>Tm</span>
      </Link>
      <SideButtons />
    </div>
  )
}

export default Navbar
