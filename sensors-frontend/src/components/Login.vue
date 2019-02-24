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
import { logMeIn, testLogin } from '../utils/api.js'
import jwt_decode from 'jwt-decode'
export default {
  data () {
    return {
      username: '',
      password: '',
      msg: 'trying'
    }
  },
  methods: {
    loginTest (user) {
      // testLogin (user).then(function (response) {
      testLogin (user).then((response) => {
        console.log(response)
        var tokenData = response.data
        var decoded = jwt_decode(tokenData.access_token)
        // console.log(decoded)
        // set items in storage
        var userData = {'username': user.username,
                        'roles': decoded.roles,
                        'access_token': tokenData.access_token
                      }
        console.log(userData)
        sessionStorage.setItem('user', userData)
        this.msg = 'Good to go'
      })
      .catch((error) => {
        console.log(error)
        this.msg = error
      })
    }
  // loginTest (user) {
  //   console.log(user)
  //     testLogin(user).then((ret) => {
  //       console.log(ret)
  //       // console.log(ret.data)
  //       if (ret.status == 200) {
  //         this.msg = 'Good to go'
  //         this.tokenData = ret.data
  //         var decoded = jwt_decode(this.tokenData.access_token)
  //         console.log(decoded)
  //         // set items in storage
  //         var userData = {'username': user.username,
  //                         'roles': decoded.roles,
  //                         'access_token': this.tokenData.access_token
  //                       }
  //         console.log(userData)
  //         sessionStorage.setItem('user', userData)
  //       }
  //       else if (ret.status == 401) {
  //         this.msg = 'Bad username'
  //       }
  //       else {
  //         this.msg = 'Something went wrong'
  //       }
  //     },
  //     function(error) {
  //       console.log(error)
  //     }
  //   )
  //   }
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
