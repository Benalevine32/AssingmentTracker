<template>
  <button id="complete" @click="celebrate()">Done ✓</button>
</template>

<script>
import VueConfetti from "vue-confetti";
import Vue from "vue";
import axios from "axios";
Vue.use(VueConfetti);

export default {
  name: "mark-complete",
  props: {
    assId: Number
  },
  methods: {
    async celebrate() {
      var id = this.assId;
      axios.get("http://localhost:3001/api/markComplete/" + id);
      this.$confetti.start();
      await new Promise((resolve) => setTimeout(resolve, 1500));
      this.$confetti.stop();
      window.location.reload();
    },
  },
};
</script>
