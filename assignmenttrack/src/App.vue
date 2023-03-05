<template>
  <div id="app">
    <h1>Vue Popups</h1>
    <button>Open Popups</button>
    <sortPop/>
  </div>
</template>

<script>
import sortPop from './components/PopSort.vue'
export default {
  name: "app",
  components: {
    sortPop
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