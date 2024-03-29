import React from 'react'
import { Link } from 'react-router-dom'
const Button = ({ path, value }) => {
  return (
    <Link
      className='px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-800'
      to={`/${path}`}
    >
      {value}
    </Link>
  )
}

export default Button
