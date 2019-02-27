<template>
 <div>
   <h1>Logging out</h1>
 </div>
</template>

<script>
import { logOut } from '../utils/api.js'
export default {
  methods: {
    logginOut() {
      logOut()
      this.$router.push({name: 'login'})
    }
  },
  mounted () {
    this.logginOut()
  }
}
</script>
