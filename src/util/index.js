import base64 from 'hi-base64'
import moment from 'moment'

export const setCookie = (cname, cvalue) => {
  document.cookie = cname + '=' + base64.encode(encodeURIComponent(JSON.stringify(cvalue))) + ';' + ';path=/'
}

export const getCookie = (cname) => {
  let name = cname + '='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return JSON.parse(decodeURIComponent(base64.decode(c.substring(name.length, c.length))))
    }
  }
  return ''
}

export const delCookie = (cname) => {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = getCookie(cname)
  document.cookie = cname + '=' + cval + '; expires=' + exp.toGMTString()
}

export const formatDate = (date) => {
  return moment(date.replace(/(\d{8})(\d{6})/, '$1 $2')).format('YYYY-MM-DD hh:mm:ss A')
}
