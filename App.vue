<template>
  <div id="app">
    <SignIn></SignIn>
  </div>
</template>

<script>
import SignIn from "./components/SignIn.vue";
export default {
  name: "app",
  components: {
    SignIn,
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
}
</style>