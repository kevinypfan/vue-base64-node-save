<template>
  <div id="app">
    <div class="hello">
      <picture-input
        ref="pictureInput"
        @change="onChange"
        width="600"
        height="600"
        margin="16"
        accept="image/jpeg,image/png"
        size="10"
        buttonClass="btn"
        :customStrings="{
          upload: '<h1>Bummer!</h1>',
          drag: 'Drag a 😺 GIF or GTFO'
        }">
      </picture-input>
    </div>
    <button @click="sendPhoto">Send</button>
    <button @click="sendTxt">Send</button>
  </div>
</template>

<script>

import PictureInput from 'vue-picture-input'
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      data: null
    }
  },
  components: {
    PictureInput
  },
  methods: {
    onChange () {
      console.log('New picture selected!')
      if (this.$refs.pictureInput.image) {
        this.data = this.$refs.pictureInput.image
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    },
    sendPhoto() {
      console.log('click')
      axios.post('/sendPhoto', {data: this.data}).then((result) => {
        console.log(result)
      }).catch((err) => {
        console.log(err)
      })
    },
    sendTxt() {
      axios.post('/sendBase64ToTxt', {data: this.data}).then((result) => {
        console.log(result)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
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
