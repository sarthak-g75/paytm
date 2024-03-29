import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../App.css'
import axios from 'axios'
const url = 'http://localhost:5000/api/account'
const url2 = 'http://localhost:5000/api/auth'

const SendMoney = () => {
  const { id } = useParams()
  const [user, setUser] = useState({ fname: '', lname: '' })
  const history = useNavigate()
  const [Amount, setAmount] = useState('')
  useEffect(() => {
    return async () => {
      try {
        const response = await axios.get(`${url2}/get-user/${id}`)
        // console.log
        const { data } = response
        if (data.success) {
          setUser({ fname: data.user.fname, lname: data.user.lname })
          // console.log(user)
        } else {
          console.log(data.message)
        }
      } catch (error) {
        alert(error.response.data.message)
      }
    }
  }, [])

  const handleTransfer = async () => {
    try {
      const response = await axios.post(
        `${url}/transfer`,
        { amount: parseInt(Amount), to: id },

        { headers: { token: `${localStorage.getItem('token')}` } }
      )
      if (response.data.success) {
        alert(response.data.message)
        history('/dashboard')
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='flex flex-col items-center justify-center gap-20 w-[25%] border-slate-300 border-[1px] rounded-md shadow-xl py-14 px-14 '>
        <h2 className='text-4xl font-bold'>Send Money</h2>
        <div className='flex flex-col w-full gap-2'>
          <div className='flex flex-row items-center gap-2'>
            <div className='flex items-center justify-center p-2 text-lg font-semibold text-center text-white bg-green-500 rounded-full w-11 h-11'>
              {user.fname.substring(0, 1).toUpperCase()}
            </div>
            <div className='text-2xl font-bold'>
              {user.fname + ' ' + user.lname}
            </div>
          </div>
          <label className='text-xl font-semibold'>Amount (in Rs)</label>
          <input
            type='number'
            onChange={(e) => {
              setAmount(e.target.value)
            }}
            value={Amount}
            className='p-2 border-slate-300 border-[1px] rounded-md'
            placeholder='Enter Amount'
          />
          <button
            onClick={handleTransfer}
            className='py-2 font-semibold text-white bg-green-500 rounded-md'
          >
            Initiate Transfer
          </button>
        </div>
      </div>
    </div>
  )
}

export default SendMoney
