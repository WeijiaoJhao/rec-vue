import axios from 'axios'

axios.interceptors.request.use((config) => {
  config.method !== 'get' && (config.data = Qs.stringify(config.data))
  return config
}, (error) => {
  return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error)
})

export const Ajax = async (api, params) => {
//   console.log('aaa', api, params)
  let data = await axios({
    data: params,
    ...api
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log(error)
    return false
  })
  return data
}

export const API = {
  youbike: { url: '/data/youbike', method: 'get' }
}
