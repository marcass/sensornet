import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'
// import jwt_decode from 'jwt-decode'
import Router from '../router.js'

Vue.use(VueAxios, axios, Router)

const BASE_URL = 'http://nuc/kong';
Vue.axios.defaults.baseURL = BASE_URL;
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqMXVnc3hQYll6Nldnb0NtWEtmMHpxb3kwU1NySTdHYSIsIm5iZiI6MTU1MTIxMTYwNywic3ViIjp7InVzZXJuYW1lIjoiYW5keSJ9LCJpYXQiOjE1NTEyMTE2MDcsImV4cCI6MTU1MTIxNTIwNywicm9sZXMiOlsicGxlYiIsImZ1Y2tlciJdfQ.8iRuEICHnueIFrTFwmS2U3y8h4QVsXfIjGg7GhwFy9Q';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

export { testGet, logMeIn, testLogin }

// get token
function authHeader () {
  var token = localStorage.getItem('access_token')
  if (typeof token === 'undefined') {
  // if (typeof sessionStorage.getItem('userData') === 'undefined') {
    console.log('no token')
    // this.$router.push({name: 'Login'})
  }
  else {
    // test to see if token not expired
    console.log('we ahve a token')
    // console.log(token)
    var now = new Date().getTime()
    var exp = Number(localStorage.getItem('exp')) * 1000
    console.log(now)
    console.log(typeof now)
    console.log(exp)
    console.log(typeof exp)
    if (now > exp) {
    // if (now > localStorage.getItem('exp')) {
      console.log('token expired')
      // token expired need to login
      axios.defaults.headers.common['Authorization'] =  null
      // remove session data
      localStorage.clear()
      // this.$router.push({name: 'Login'})
    }
    else {
      // console.log('this is the token' + token)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    }
  }
}

function tokenAtt () {
  return localStorage.getItem('access_token')
}

function simple_get(url) {
  return axios.get(url)
  .then(function (response) {
      return response.data
  });
}

function testGet() {
  authHeader()
  const url = BASE_URL+'/test/flask/hello'
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
  return axios.post(BASE_URL+'/auth', user)
}
