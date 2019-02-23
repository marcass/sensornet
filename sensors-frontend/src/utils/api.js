import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'
import jwt_decode from 'jwt-decode'

Vue.use(VueAxios, axios)

const BASE_URL = 'http://nuc/kong';
Vue.axios.defaults.baseURL = BASE_URL;
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwt-token')
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

export { testGet, logMeIn }

function simple_get(url) {
  return axios.get(url)
  .then(function (response) {
      return response.data
  });
}

function testGet() {
  const url = BASE_URL+'/test/flask/hello'
  return simple_get(url)
}

function logMeIn (user) {
  console.log(user)
  // axios.post(BASE_URL+'/auth', user, {auth: {username : user.username, password : user.password}})
  axios.post(BASE_URL+'/auth', user)
  .then(resp => {
    console.log(resp)
    const token = resp.data.access_token
    var decoded = jwt_decode(token);
    console.log(decoded)
    //  localStorage.setItem('roles', decoded.roles)
    localStorage.setItem('jwt-token', token) // store the token in localstorage
    localStorage.setItem('user', user.username)
    resolve(resp)
  })
  .catch(err => {
     console.log('oops, login error')
     localStorage.removeItem('jwt-token') // if the request fails, remove any possible user token if possible
     localStorage.removeItem('user')
    //  localStorage.removeItem('roles')
     reject(err)
   })
 }

// can decode with https://www.npmjs.com/package/vue-jwt-decode
// then get the expiration and test for a time near that so that a request can be made for a refresh token
// this can then be sent for a new token to api
// function Login () {
//  const LoginRoutine = user => new Promise ((resolve, reject) => {
//    axios.post(BASE_URL+'/auth', user)
//      .then(resp => {
//        const token = resp.data.access_token
//        var decoded = jwt_decode(token);
//        console.log(decoded)
//       //  localStorage.setItem('roles', decoded.roles)
//        localStorage.setItem('jwt-token', token) // store the token in localstorage
//        localStorage.setItem('user', user.username)
//        resolve(resp)
//      })
//    .catch(err => {
//      console.log('oops, login error')
//      localStorage.removeItem('jwt-token') // if the request fails, remove any possible user token if possible
//      localStorage.removeItem('user')
//     //  localStorage.removeItem('roles')
//      reject(err)
//    })
//  })
// }
