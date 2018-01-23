<template>
  <div id="app">
    <img src="./assets/logo.png"><br/>
    <router-link to="/">Home/Hello</router-link>
    <router-link to="/testme">TEST</router-link>
    <router-link to="/par/123">PARAMS</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
</style>
