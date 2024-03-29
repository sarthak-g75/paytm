import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div
      className='flex flex-col items-center justify-center min-h-screen'
      style={{ background: 'linear-gradient(to right, #4F3A65, #151515)' }}
    >
      <header className='text-center'>
        <h1 className='mb-4 text-4xl font-bold text-white'>
          Welcome to Payment Web App
        </h1>
        <p className='text-lg text-white'>
          Effortless and secure payments made simple.
        </p>
      </header>

      <section className='mt-8'>
        <Link
          to='/signup'
          className='px-6 py-3 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700'
        >
          Sign Up Now
        </Link>
      </section>
    </div>
  )
}

export default Landing
