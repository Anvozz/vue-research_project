<template>
  <div id="app">
    <Navbars/>
    <router-view/>
    <notifications group="notifyy" />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Sarabun&display=swap');
#app {
  font-family: 'Sarabun', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
