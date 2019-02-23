<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    We will see if a fetch can happen from various routes
    {{ payload.msg }}
  </div>
</template>

<script>
import { testGet } from '../utils/api.js'
export default {
  name: 'TestPage',
  props: {
    msg: String
  },
  data () {
    return {
      payload: {}
    }
  },
  methods: {
    getStuff () {
      testGet().then((ret) => {
        this.payload = ret
      })
    }
  },
  mounted () {
    this.getStuff()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
