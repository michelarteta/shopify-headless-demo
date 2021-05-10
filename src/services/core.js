import axios from 'axios'

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

export const coreInstance = axios.create({
  baseURL: `https://${process.env.REACT_APP_SERVER_HOST}/api`,
  headers
})

export const storefrontInstace = axios.create({
  baseURL: `https://${process.env.REACT_APP_SERVER_HOST}/storefront`,
  headers
})
