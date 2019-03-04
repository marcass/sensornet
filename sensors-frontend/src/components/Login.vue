<template>
 <div>
   <h1>Sign in</h1>
   <label>User name</label>
   <input required v-model="username" type="text" placeholder="Snoopy"/>
   <label>Password</label>
   <input required v-model="password" type="password" placeholder="Password"/>
   <hr/>
   <button v-on:click="loginTest({'username': username, 'password': password })">Login</button>
   <p>
     {{ msg }}
   </p>
 </div>
</template>

<script>
import { logMeIn, testLogin, getToken, testToken } from '../utils/api.js'
import jwt_decode from 'jwt-decode'
export default {
  data () {
    return {
      username: '',
      password: '',
      msg: 'trying',
      polling: null
    }
  },
  methods: {
    loginTest(user){
      getToken(user).then((response) => {
        console.log('login test')
        console.log('login test ' + response)
        return
      })
      .catch(fetchFailed)
    },
    fetchFailed () {
      console.log('seomthing went wrong')
    },
    pollData () {
  		this.polling = setInterval(() => {
  	    var response = testToken()
        if (response.msg == 'expired') {
          this.$router.push({name: 'login'})
        }
        else {
          console.log('ive just checked the token')
          // do nothing
        }
  		}, 120000)
  	}
    // loginTest (user) {
    //   // testLogin (user).then(function (response) {
    //   testLogin (user).then((response) => {
    //     console.log(response)
    //     var tokenData = response.data
    //     var decoded = jwt_decode(tokenData.access_token)
    //     // console.log(decoded)
    //     // set items in storage
    //     localStorage.setItem('username', user.username)
    //     localStorage.setItem('roles', decoded.roles)
    //     localStorage.setItem('access_token', tokenData.access_token)
    //     localStorage.setItem('exp', decoded.exp)
    //     // var userData = {'username': user.username,
    //     //                 'roles': decoded.roles,
    //     //                 'access_token': tokenData.access_token,
    //     //                 'exp': decoded.exp
    //     //               }
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //     this.msg = error
    //   })
    // }
  },
  beforeDestroy () {
  	clearInterval(this.polling)
  },
  created () {
  	this.pollData()
  }
}
</script>
<!-- // https://blog.sqreen.com/authentication-best-practices-vue/
// https://itnext.io/managing-and-refreshing-auth0-tokens-in-a-vuejs-application-65eb29c309bc
// https://vuejs.org/v2/guide/state-management.html#Simple-State-Management-from-Scratch
// or use vuex

// can decode with https://www.npmjs.com/package/vue-jwt-decode
// then get the expiration and test for a time near that so that a request can be made for a refresh token
// this can then be sent for a new token to api -->
