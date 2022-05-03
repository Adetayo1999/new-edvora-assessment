import axios from 'axios'
import { baseUrl } from '.'

export const getRides = () => {
  return axios.get(`${baseUrl}/rides`)
}
