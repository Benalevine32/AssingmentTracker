
<template>
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          Assignment Editor
          <button type="button" class="btn-close" @click="close">x</button>
        </header>
  
        <section class="modal-body">
          <ul v-for="(item, index) in allAssignments" v-bind:key="index">
            <assignmentWrapper :description="item.description" :difficulty="item.difficulty" :dueDate="item.dueDate | formatDate" :className="item.className"/>
          </ul>
        </section>
      </div>
    </div>
  </template>
  
  
  <script>
  
  import axios from 'axios';
  import assignmentWrapper from "./assignmentWrapper.vue";

  export default {
    name: "myModal",
    components: {
      assignmentWrapper,
    },
    data() {
      return {
        isModalVisible: false,
        allAssignments: [],
      };
    },
    filters:{
            formatDate(value){
                const date = new Date(value);
                return date.toLocaleDateString();
            }
        },
    mounted()
    {
        axios.get('http://localhost:3001/api/allAssignmentsWithClass')
        .then((response)=>{
          this.allAssignments = response.data
        })
        .catch((error)=>{
                console.error(error);
        });
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