<template>
  <div class="home">
    <TestPage msg="This is a fucking test"/>
  </div>
</template>

<script>
// @ is an alias to /src
import TestPage from '@/components/TestPage.vue'

export default {
  name: 'home',
  components: {
    TestPage
  }
}
</script>
