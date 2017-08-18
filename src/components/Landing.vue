<template lang="pug">
  .root
    h2 Hello!
    <router-link :to="path" v-for="path in paths" :key="path">{{path}}</router-link>
</template>

<script>
  export default {
    name: "app",
    data: () => ({
      paths: [
        "853e14eb-b1f3", "7022b57c-be7a", "a8f63b84-b5a2", "9e28c2a4-b6b0",
        "4d0ec276-d6dc", "-Kmj-b9lcLgKliiJX-R5", "-Km11G7_58KKweqM6hME",
        "8f7343c0-cda0"
      ]
    })
  }
</script>

<style lang="sass" scoped>

</style>
