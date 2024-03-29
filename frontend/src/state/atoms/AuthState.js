import { atom, selector } from 'recoil'

const url = 'http://localhost:5000/api/auth'
import axios from 'axios'
export const authState = atom({
  key: 'auth',
  default: !!localStorage.getItem('token'),
})

export const filterState = atom({
  key: 'filter',
  default: '',
})
export const UserState = atom({
  key: 'user',
  default: selector({
    key: 'userSelector',
    get: async ({ get }) => {
      const filterVal = get(filterState)
      try {
        const response = await axios.get(`${url}/bulk/?filter=${filterVal}`)
        const { users } = response.data
        return users
      } catch (error) {
        alert(error.response.data.message)
      }
    },
  }),
})
