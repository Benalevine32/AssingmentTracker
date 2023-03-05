<template>
  <div id="app">
    <h1>Vue Popups</h1>
    <button @click="() => TogglePopUp('buttonTrigger')">Open Popups</button>
    <sortPop v-if="popupTrigger.buttonTrigger" :TogglePopUp="() => TogglePopUp('buttonTrigger')"/>
  </div>
</template>

<script>
import {ref} from 'vue'
import sortPop from './components/PopSort.vue'
export default {
  name: "app",
  components: {
    sortPop
  },
  setup() {
    const popupTrigger = ref({
      buttonTrigger: false,
      timedTrigger: false
    })

    const TogglePopUp = (trigger) => {
      popupTrigger.value[trigger] = !popupTrigger.value[trigger]
    }
    return {
      sortPop,
      popupTrigger,
      TogglePopUp
    }
  }
   
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