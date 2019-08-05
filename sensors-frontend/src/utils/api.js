import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'
import jwt_decode from 'jwt-decode'
import Router from 'vue-router'

Vue.use(VueAxios, axios, Router)

// const BASE_URL = 'http://localhost:8001/kong';
const BASE_URL = 'https://skibo.duckdns.org/api';
// const BASE_URL = 'http://nuc/kong';
Vue.axios.defaults.baseURL = BASE_URL;
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqMXVnc3hQYll6Nldnb0NtWEtmMHpxb3kwU1NySTdHYSIsIm5iZiI6MTU1MTIxMTYwNywic3ViIjp7InVzZXJuYW1lIjoiYW5keSJ9LCJpYXQiOjE1NTEyMTE2MDcsImV4cCI6MTU1MTIxNTIwNywicm9sZXMiOlsicGxlYiIsImZ1Y2tlciJdfQ.8iRuEICHnueIFrTFwmS2U3y8h4QVsXfIjGg7GhwFy9Q';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

export { testGet, logMeIn, testLogin, logOut, getToken, testToken }

//401 interceptor
// Vue.axios.interceptors.response.use((response) => { // intercept the global error
//     return response
//   }, function (error) {
//     let originalRequest = error.config
//     if (error.response.status === 401 && !originalRequest._retry) { // if the error is 401 and hasent already been retried
//       originalRequest._retry = true // now it can be retried
//       return Vue.axios.post('/users/token', null).then((data) => {
//         store.dispatch('authfalse')
//         store.dispatch('authtruth', data.data)
//         originalRequest.headers['Authorization'] = 'Bearer ' + store.state.token // new header new token
//         return Vue.axios(originalRequest) // retry the request that errored out
//       }).catch((error) => {
//         for (let i = 0; i < error.response.data.errors.length; i++) {
//           if (error.response.data.errors[i] === 'TOKEN-EXPIRED') {
//             auth.logout()
//             return
//           }
//         }
//       })
//     }
//     if (error.response.status === 404 && !originalRequest._retry) {
//       originalRequest._retry = true
//       window.location.href = '/'
//       return
//     }
//     // Do something with response error
//     return Promise.reject(error)
//   })

///////////////////////////////////////////////////////////////////////////////////////
// AUTH
///////////////////////////////////////////////////////////////////////////////////////

// 401 interceptor
Vue.axios.interceptors.response.use((response) => { // intercept the global error
    return response
  }, function (error) {
    // let originalRequest = error.config
    if (error.response.status === 401) {
      console.log('not allowed here- intercepted')
      this.$router.push({name: 'login'})
      return
      // }).catch((error) => {
      //   console.log('401 intercept error')
      //   return
      // })
    }
    if (error.response.status === 404) {
      console.log('404 not found')
      return
    }
    // Do something with response error
    return Promise.reject(error)
  })

// clear toekn data
function clearToken() {
  // token expired need to login
    axios.defaults.headers.common['Authorization'] =  null
    // remove session data
    localStorage.clear()
}

function makeHeader(token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

// get token
function authHeader () {
  var token = localStorage.getItem('access_token')
  if (token == null) {
  // if (typeof sessionStorage.getItem('userData') === 'undefined') {
    console.log('no token')
    clearToken()
    // this.$router.push({name: 'Login'})
  }
  else {
    // test to see if token not expired
    // console.log('we ahve a token')
    // console.log(token)
    var now = new Date().getTime()
    var exp = Number(localStorage.getItem('exp')) * 1000
    // console.log(now)
    // console.log(typeof now)
    // console.log(exp)
    // console.log(typeof exp)
    if (now > exp) {
    // if (now > localStorage.getItem('exp')) {
      console.log('token expired')
      clearToken()
      // this.$router.push({name: 'Login'})
    }
    else {
      // console.log('this is the token' + token)
      makeHeader(token)
    }
  }
}

function testToken () {
  var now = new Date().getTime()
  var exp = Number(localStorage.getItem('exp')) * 1000
  if (now > exp) {
    console.log('token expired, redirect')
    logOut()
    return {'msg': 'expired'}
  }
  else {
    console.log('token OK')
    return {'msg': 'valid'}
  }
}

function logOut() {
  axios.defaults.headers.common['Authorization'] =  null
  // remove session data
  localStorage.clear()
}

function storeToken (result) {
  // console.log(result)
  var tokenData = result.data
  var decoded = jwt_decode(tokenData.access_token)
  console.log(decoded)
  console.log(tokenData.access_token)
  // set items in storage
  // localStorage.setItem('username', user.username)
  localStorage.setItem('roles', decoded.roles)
  localStorage.setItem('access_token', tokenData.access_token)
  localStorage.setItem('exp', decoded.exp)
  return 'success'
}

function tokenError (error) {
  console.log(error)
  return error
}

function getToken(user) {
  testLogin (user).then(storeToken, tokenError);
}

// function getToken(user) {
//   testLogin (user).then(function(result) {
//     return storeToken(result)
//   }).catch(function(error) {
//     return tokenError(error)
//   })
// }

/////////////////////////////////////////////////////////////////////////////////////
// ROUTES
////////////////////////////////////////////////////////////////////////////////////

function simple_get(url) {
  return axios.get(url)
  .then(function (response) {
      return response.data
  });
}

function testGet() {
  authHeader()
  const url = BASE_URL+'/data/values/types'
  return simple_get(url)
}

// function testLogin (user) {
//   // console.log(user)
//   axios.post(BASE_URL+'/auth', user)
//   .then(function (response) {
//     // console.log(response)
//     var tokenData = response.data
//     var decoded = jwt_decode(tokenData.access_token)
//     // console.log(decoded)
//     // set items in storage
//     var userData = {'username': user.username,
//                     'roles': decoded.roles,
//                     'access_token': tokenData.access_token
//                   }
//     console.log(userData)
//     sessionStorage.setItem('user', userData)
//     return 'Good to go'
//   })
//   .catch(function (error) {
//     console.log(error)
//     return error
//   })
// }

function testLogin (user) {
  // console.log(user)
  return axios.post(BASE_URL+'/auth/login', user)
}
