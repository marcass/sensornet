import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'
// import jwt_decode from 'jwt-decode'
import Router from '../router.js'

Vue.use(VueAxios, axios, Router)

const BASE_URL = 'http://localhost:8001/kong';
Vue.axios.defaults.baseURL = BASE_URL;
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwt-token')
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

export { testGet, logMeIn, testLogin }

// get token
function authHeader () {
  var userData = localStorage.getItem('user')
  if (userData === null) {
  // if (typeof sessionStorage.getItem('userData') === 'undefined') {
    console.log('no token')
    this.$router.push({name: 'Login'})
  }
  else {
    // test to see if token not expired
    console.log('we ahve a token')
    console.log(userData)
    var now = new Date().getTime()
    if (now > userData.exp) {
      // token expired need to login
      axios.defaults.headers.common['Authorization'] =  null
      // remove session data
      localStorage.removeItem('userData')
      this.$router.push({name: 'Login'})
    }
    else {
      console.log('this is the token' + userData.access_token)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + userData.access_token
    }
  }
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
