<template lang="pug">
  .root
    .container
      h2 Tap Reader
      input(v-model="link" placeholder="Paste Your taptaptap.co URL" @keyup.enter="go")
      <router-link :to="path" :key="path">{{path}}</router-link>
</template>

<script>
const parse = async link => link.replace("https://taptaptap.co/story/", "").replace(/\?.*/g, "")

export default {
  name: "app",
  data: () => ({
    path: "",
    link: ""
  }),
  methods: {
    async go() {
      this.$router.push(await parse(this.link))
    }
  }
}
</script>

<style lang="sass" scoped>
  .root
    text-align: center
    margin: 0 auto
    max-width: 600px
    min-height: 100vh

  .container
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    min-height: 100vh

  h2
    font-weight: 300
    font-family: 'Roboto'
    font-size: 1.8em
    color: #777

  input
    background: #ffffff
    border: none
    border-bottom: 2px solid #555
    padding: 0.3em 1em
    font-size: 1.2em
    font-family: Roboto, Sukhumvit Set, Helvetica Neue, sans-serif
    font-weight: 300
    outline: none
    color: #333
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)
    transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all

    &:hover
      transform: scale(1.1)
      border-bottom: 2px solid #9b59b6
</style>
