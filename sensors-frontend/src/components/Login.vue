<template>
 <div>
   <form class="login" @submit.prevent="login">
     <h1>Sign in</h1>
     <label>User name</label>
     <input required v-model="username" type="text" placeholder="Snoopy"/>
     <label>Password</label>
     <input required v-model="password" type="password" placeholder="Password"/>
     <hr/>
     <button v-on:click="login({'username': username, 'pasword': password })">Login</button>
   </form>
 </div>
</template>

<script>
import { logMeIn } from '../utils/api.js'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
   login (user) {
     console.log(user)
     logMeIn(user).then(() => {
       this.$router.push('/test')
     })
   }
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
