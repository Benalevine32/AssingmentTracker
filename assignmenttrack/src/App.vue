<template>
  <div id="app">
    <MainPage />
  </div>
</template>

<script>
import MainPage from './components/MainPage.vue';
export default {
  name: "app",
  components: {
    MainPage
  },
   
};
</script>

<style>
body {
  background-color: #f0f0f0;
}

#app {
  width: 1024px;
  margin: auto;
  text-align: center;
}
</style>