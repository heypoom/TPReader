<template lang="pug">
  .root
    .container(v-if="stories.title")
      .story_name {{stories.title}}
        small.username by {{author.fullname || author.username}}
      .tagline {{stories.short_description}}
      .stats.item {{stories.taps}} Taps ---- {{stories.views}} Views
      //- .cover(:style="coverImg")
      .desc.item {{stories.description}}
      .sound.item(v-if="stories.has_sound") Sound: ({{stories.sound_id}})
      .scene_jump(v-if="Object.keys(messages).length > 1")
        a(:href="`#${scn + 1}`" v-for="(_, scn) in messages") {{scn + 1}}
      .scene(v-for="(ms, scn) in messages" :id="scn + 1")
        .message(v-for="val in sort(ms)" :style="line(val.character_id)")
          .order {{scn + 1}}.{{val.order}}
          small.name(:style="color(val.character_id)" v-if="name(val.character_id)")
            | {{name(val.character_id)}}
            .typing(v-if="!val.is_typing") ...
          .breakpoint(v-if="val.is_story_breakpoint") Breakpoint!
          .text <b>{{val.text}}</b>
          img.image(v-if="val.image" :src="val.image.link")
    .backdrop(:style="bg" v-if="stories.title")
</template>

<script>
  import {db} from "@/core/firebase"

  function colorHash(value) {
    /* eslint-disable */
    let hash = 0
    if (value.length !== 0) {
      for (let i = 0; i < value.length; i++) {
        hash = value.charCodeAt(i) + ((hash << 5) - hash)
        hash = hash & hash
      }
    }
    return `hsl(${hash % 360}, 60%, 50%)`
  }

  export default {
    name: "hello",
    data: () => ({
      author: ""
    }),
    computed: {
      bg() {
        const scene = this.scenes.filter(scn => scn.background)

        if (scene[0]) {
          return {
            backgroundImage: `url(${scene[0].background.link})`
          }
        }
        return this.coverImg
      },
      coverImg() {
        const stories = this.stories || {}
        const cover = stories.cover && stories.cover.link

        return {
          backgroundImage: `url(${stories.cover_url || cover})`
        }
      }
    },
    methods: {
      color(id) {
        return {color: colorHash(this.name(id))}
      },
      line(id) {
        return {borderBottom: `2px solid ${colorHash(this.name(id))}`}
      },
      name(x) {
        if (this.stories.characters[x]) {
          return this.stories.characters[x].name
        }
        return ""
      },
      sort(chat = {}) {
        return Object.values(chat).filter(x => x.order).sort((a, b) => Number(a.order) - Number(b.order))
      }
    },
    firebase() {
      // -KeJPw3ueMsm-tEI6PmL
      return {
        stories: {
          source: db.ref(`tap_production/stories/${this.$route.params.id}`),
          readyCallback() {
            db.ref(`tap_production/users/${this.stories.author_id}`).on("value", s => {
              this.author = s.val()
            })
          },
          asObject: true
        },
        messages: db.ref(`tap_production/messages/${this.$route.params.id}`),
        scenes: db.ref(`tap_production/scenes/${this.$route.params.id}`)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .root
    display: flex
    align-items: center
    justify-content: center
    background: #ecf0f1
    color: #444
    min-height: 100vh

    b
      font-weight: 300

  [v-cloak]
    display: none

  .container
    display: flex
    flex-direction: column
    justify-content: center
    z-index: 1

    margin: 4em auto
    max-width: 540px

  .story_name
    color: white
    font-weight: 500
    font-size: 2.4em
    line-height: 1.4em
    text-shadow: 0 0 6px rgba(0,0,0,.5)
    text-align: center
    margin-bottom: 0.2em

    small.username
      vertical-align: top
      margin-left: 0.5em
      font-size: 0.4em

  .tagline
    margin: 0em 1.15em 1em 1.15em
    color: white
    font-weight: 500
    font-size: 1.15em
    text-shadow: 0 0 6px rgba(0,0,0,.5)
    text-align: center
    padding: 0 0.8em

  .cover
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    margin: 0 auto
    position: relative
    background-color: #34495e
    background-repeat: no-repeat
    background-position: center 15%
    background-size: cover
    border: 3px solid white
    margin: 0 7% 8% 7%
    text-align: left
    font-size: 1em
    font-family: Helvetica Neue
    border-radius: 8px
    box-shadow: 0 0 1px 0 rgba(0,0,0,.12), 0 1px 1px 0 rgba
    width: 85%
    height: 13em

    .stats
      position: absolute
      left: 15%
      bottom: -1.8em

  .scene_jump
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    position: fixed
    left: 0
    top: 10%
    background: white
    padding: 0em 0.5em
    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.12)
    border-radius: 2px
    border-bottom: 2px solid #468f83

    a
      text-decoration: none
      padding: 0.35em 0
      font-size: 1.15em
      color: #555

  .message, .item
    position: relative
    background: #fafafa
    margin: 0 7% 2.5% 7%
    padding: 2% 3.5%
    text-align: left
    font-size: 1em
    line-height: 1.45em
    font-family: Helvetica Neue
    border-radius: 4px
    box-shadow: 0 0 1px 0 rgba(0,0,0,.12), 0 1px 1px 0 rgba(0,0,0,.12)

    .order
      position: absolute
      right: 0
      top: 0
      font-size: 0.78em
      background: #efefef
      padding: 0em 0.8em
      color: grey

    small.name
      font-family: Helvetica Neue
      font-weight: 600

    img.image
      margin-top: 1em
      width: 100%
      height: auto
      border-radius: 8px
      box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)
      filter: blur(20px)

      &:hover
        filter: initial

    .typing
      display: inline

      &::before
        content: " "

  .backdrop
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    filter: blur(5px)
    background-color: #34495e
    background-repeat: no-repeat
    background-position: center 35%
    background-size: cover
    box-shadow: 0 0 40px 60px #000
</style>
