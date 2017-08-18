<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  export default {
    name: "app"
  }
</script>

<style lang="sass">
  body
    margin: 0
    font-family: Helvetica Neue
    font-weight: 300
</style>
