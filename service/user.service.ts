import axios from 'axios'
import { baseUrl } from '.'

export const getUser = () => {
  return axios.get(`${baseUrl}/user`)
}
