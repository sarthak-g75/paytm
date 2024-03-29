import React, { useState, useEffect } from 'react'
import axios from 'axios'

const url2 = 'http://localhost:5000/api/account'

const Balance = () => {
  const [balance, setBalance] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(`${url2}/balance`, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        setBalance(response.data.balance.toFixed(2))
      } catch (error) {
        setError(error.response.data.message)
      }
    }

    fetchBalance()
  }, [])

  if (error) {
    return <div>Error: {error}</div>
  }

  if (balance === null) {
    return <div>Loading...</div>
  }

  return <div className='text-3xl font-bold'>Balance: {balance}</div>
}

export default Balance
