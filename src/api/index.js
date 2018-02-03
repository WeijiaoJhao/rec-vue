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
  // console.log('aaa', api, params, process.env.API_HOST)
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

const domain = (url) => { return process.env.API_HOST + url }

export const API = {
  youbike: { url: domain('youbike'), method: 'get' }
}
