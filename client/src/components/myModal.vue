
<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        Assignment Editor {{ numAssignments }}
        <button type="button" class="btn-close" @click="close">x</button>
      </header>

      <section class="modal-body">
        <ul v-for="(asmt, index) in asmts" v-bind:key="index">
          <assignmentWrapper
            :assignment_id="asmt.assignment_id"
            :description="asmt.description"
            :difficulty="asmt.difficulty"
            :dueDate="asmt.dueDate"
          />
        </ul>
      </section>
    </div>
  </div>
</template>
          
<script>
import assignmentWrapper from "./assignmentWrapper.vue";

export default {
  name: "myModal",
  components: {
    assignmentWrapper,
  },
  data() {
    return {
      asmts: [],
      isModalVisible: false,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
  async created() {
    const userId = localStorage.getItem('user_id')
    if (!userId) {
      localStorage.clear()
      this.$router.push('/')
      return
    }
    const queryURI = `http://localhost:3001/api/edit/assignments/${userId}`
    const response = await fetch(queryURI)
    const incomingAssignments = await response.json()
    this.asmts = incomingAssignments
  },
};
</script>
  
  
  <style>
.modal-backdrop {
  z-index: 10; /* Set a high z-index value */
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  width: 65%;
  height: 75%;
  background: #252422;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}
.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #e6e6e6;
  font-size: 25px;
  font-weight: 600;
  justify-content: center;
  display: flex;
  padding: 50px;
  font-family: Roboto;

}
.modal-body {
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: center;
}
.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #e6e6e6;
  background: transparent;
}
</style>