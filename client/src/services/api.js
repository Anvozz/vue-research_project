import axios from 'axios'
import config from '../assets/config.json'

export default () => {
  return axios.create({
    baseURL: config.base_url
  })
}
