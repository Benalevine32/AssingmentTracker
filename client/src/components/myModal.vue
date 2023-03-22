
<template>
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          Assignment Editor
          <button type="button" class="btn-close" @click="close">x</button>
        </header>
  
        <section class="modal-body">
          <ul v-for="(asmt, index) in asmts" v-bind:key="index">
            <assignmentWrapper :title="asmt.title" :description="asmt.description" :difficulty="asmt.difficulty" :time="asmt.time"/>
          </ul>
          
        </section>
      </div>
    </div>
  </template>
  
  
  <script>
  
  import assignmentWrapper from "./assignmentWrapper.vue";
  const asmts = [
    {title: "stack project", description: "create stack", difficulty: 4, time: 45},
    {title: "CS 204", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam", difficulty: 10, time: 60},
    {title: "Exam 1", description: "study", difficulty: 5, time: 30}
  ];
  export default {
    name: "myModal",
    components: {
      assignmentWrapper,
    },
    data() {
      return {
        asmts,
        isModalVisible: false,
      };
    },
    methods: {
      close() {
      this.$emit("close");
    },
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
    width: 50%;
    height: 50%;
    background: #252422;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }
  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #E6E6E6;
    font-size: 25px;
    justify-content: center;
    display: flex;
    padding: 50px;
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
    color: #E6E6E6;
    background: transparent;
  }
  </style>