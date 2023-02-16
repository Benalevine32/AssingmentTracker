<template>
  <div id="app">
    <button type="button" class="btn" @click="showModal">
      open modal
    </button>
    <myModal v-show="isModalVisible" @close="closeModal"/>
  </div>
</template>

<script>
import myModal from './components/myModal.vue';


export default {
  name: 'App',
  components: {
    myModal,
  },
  data() {
    return{
      isModalVisible: false,
    };
  },
  methods: {
    showModal(){
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
