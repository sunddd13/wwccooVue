// 封装axios请求
import axios from 'axios'

const request = axios.create({

  baseURL: '/',

  timeout: 90000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Accept": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
})

const errorHandler = (error: any) => {
  return Promise.reject(error)
}

request.interceptors.request.use((config) => {
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  return response.data
}, errorHandler)

export default request