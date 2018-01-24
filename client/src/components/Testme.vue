<template>
  <div class="testme">
    <h1>{{ msg }} <i class="fas fa-american-sign-language-interpreting"></i></h1>
    <p>teste de cenas</p>
    <button class="btn btn-primary btn-lg" v-on:click="sendMsg">SEND MESSAGE</button>
  </div>
</template>

<script>
export default {
  name: 'Testme',
  data () {
    return {
      msg: 'Welcome to Testme'
    }
  },
  sockets: {
      connect(){
          console.log('socket connected');
      },
      response(data){
          console.log(data);
      }
  },
  methods: {
      sendMsg(){
          this.$socket.emit('msg', 'Refresh!!');
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
