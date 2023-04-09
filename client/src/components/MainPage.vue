<template>
  <body>

    <div id="bg">
      <div v-if="sidePanel" id="sidePanel">
        <button id="sortBy" @click="showSort()">Sort By...</button>
        <button id="viewTasks" @click="showModal()">View All Tasks</button>\
        <button id="Classes" @click="showClasses()">Classes</button>
      </div>

      <div id="restOfScreen">
        <myModal v-show="isModalVisible" @close="closeModal()"/>
        <PopSort   @update-selection="updateSelection" v-show="isSortVisible" @close="closeSort()"/>
        <AddAssignPop v-show="isAddVisible" @close="closeAdd()" />
        <ClassManage v-show="isClassesVisible" @close="closeClass()"/>
        <button id="menu" v-on:click="toggleDiv()">
          {{ sidePanelButton }}
        </button>
        <div id="task-row-1">
          <div 
            v-for="item in top3AssignmentsList"
            :key="item.description"
            class="task" 
            id="taskRow1"
          >
            <div id="main-task-title">
             <p>{{ item.description }}</p>
             <p>{{ item.dueDate | formatDate }}</p>
             <p>{{ item.difficulty }}</p>

            </div>
          </div>
          <button id="addAssignment" @click="showAdd()">+</button>
        </div>
      </div>
    </div>
  </body>
</template>




<script>
import myModal from './myModal.vue';
import PopSort from './PopSort.vue';
import AddAssignPop from './AddAssignPop.vue';
import ClassManage from './ClassManage.vue';
import axios from 'axios';
export default {
  name: "MainPage",
  components: {
    myModal,
    PopSort,
    AddAssignPop,
    ClassManage
  },
  data() {
    return {
      isAddVisible: false,
      isSortVisible: false,
      isModalVisible: false,
      isClassesVisible: false,
      sidePanel: false,
      sidePanelButton: "Menu",
      classesList: [],
      top3AssignmentsList: []
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
    const userId = localStorage.getItem('user_id')
      axios.get(`http://localhost:3001/api/classes/${userId}`)
      .then((response)=>{
          this.classesList = response.data;
      })    
      .catch((error)=>{
          console.error(error);
      });
      axios.get(`http://localhost:3001/api/top3Assignments/${userId}`)
      .then((response)=>{
          this.top3AssignmentsList = response.data;
          console.log(`Top 3 assignments ${this.top3AssignmentsList}`)
      })
      .catch((error)=>{
          console.error(error);
      })
  },
  methods: {
    showAdd(){
      this.isAddVisible = true;
    },
    closeAdd(){
      this.isAddVisible = false;
    },
    closeClass(){
      this.isClassesVisible = false;
    },
    showSort(){
      this.isSortVisible = true;
    },
    showClasses(){
      this.isClassesVisible = true;
    },
    closeSort(){
      this.isSortVisible = false;
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    toggleDiv() {
      this.sidePanel = !this.sidePanel;
      if (this.sidePanel) {
        this.sidePanelButton = "X";
      } else {
        this.sidePanelButton = "Menu";
      }
    },
    logout() {
      localStorage.clear()
      this.$router.push('/')
    },
    updateSelection({ selectedClasses, selectedPriorities, options}) {
      // Use selectedClasses and selectedPriorities here
      this.top3AssignmentsList = []
      const user_id = localStorage.getItem('user_id')
      if (selectedClasses.length === options.length && selectedPriorities.length === 3){
        axios.get(`http://localhost:3001/api/top3Assignments/${user_id}`)
            .then((response)=>{
                this.top3AssignmentsList = response.data;
            })
            .catch((error)=>{
                console.error(error);
            })
      }
      else if(selectedClasses.length != options.length && selectedPriorities.length === 3){
        console.log("Bum");
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@600&display=swap");

body {
  margin: 0;
}

#bg {
  margin: 0;
  width: 100vw;
  height: 100vh;
  background-color: red;
  position: relative;
}

#menu {
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  border: none;
  cursor: pointer;
  backdrop-filter: blur(5px);
  background-color: rgba(235, 94, 40, 1);
  border-radius: 29px;
  box-shadow: -10px 10px 40px 0px rgb(0, 0, 0, 1),
    inset 5px -5px 16px 0px rgba(0, 0, 0, 0.4),
    inset 0px 11px 28px 0px rgb(255, 255, 255, 0.4);

  width: 50px;
  height: 50px;
  margin: 10px;
  top: 0px;
}

#sidePanel {
  position: absolute;
  width: 20%;
  height: 100vh;
  background-color: #252422;
  left: 0px;
  top: 0px;
  padding-top: 100px;
}

#sideButtons {
  width: 100px;
  height: 100px;
  background-color: #252422;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#restOfScreen {
  width: 1fr;
  height: 100%;

  background: -webkit-linear-gradient(
    to top,
    #ffffff,
    #ccc5b9
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top,
    #ffffff,
    #ccc5b9
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  /* position: absolute; */
  right: 0px;
  top: 0px;
}

#sortBy,
#viewTasks,
#Classes {
  width: 200px;
  height: 50px;
  margin: 20px;
  font-family: "Nunito", sans-serif;

  border: none;
  cursor: pointer;

  backdrop-filter: blur(5px);
  background-color: rgba(255, 252, 242, 0.8);
  border-radius: 29px;
  box-shadow: -10px 10px 40px 0px rgba(0, 0, 0, 1),
    inset 5px -5px 16px 0px rgb(138, 136, 131),
    inset 0px 11px 28px 0px rgb(255, 252, 242, 1);
}

.task {
  position: relative;
  width: 200px;
  height: 190px;

  margin-top: 10px;

  display: inline-block;
  backdrop-filter: blur(5px);
  background-color: rgba(253, 253, 96);
  border-radius: 29px;
  box-shadow: -10px 10px 40px 0px rgb(161, 161, 161, 0.8),
    inset 5px -5px 16px 0px rgba(253, 253, 96),
    inset 0px 11px 28px 0px rgb(255, 255, 255, 0.7);
}

#taskRow1 {
  margin-top: 5px;
  margin-left: 40%;
  margin-right: 10px;
  height: 1fr;
}

#taskRow2 {
  top: 0;
  margin-left: 50%;
  margin-right: 10px;
  height: 1fr;
}

#main-task-title {
  position: relative;
  width: 178px;
  height: 40px;
  top: 5%;
  text-align: center;
  vertical-align: middle;
  font-family: "Nunito", sans-serif;
  font-style: normal;
  font-weight: bolder;
  font-size: 24px;
  line-height: 29px;
  left: 10px;

  color: #000000;
}

#time-estimate {
  position: absolute;
  width: 167px;
  height: 35px;

  top: 40%;
  text-align: center;
  vertical-align: text-bottom;
  font-family: "Nunito", sans-serif;
  font-style: normal;
  font-weight: 100;
  font-size: 20px;
  line-height: 24px;
  left: 20px;

  color: #252422;
}

#total-difficulty {
  position: absolute;
  width: 163px;
  height: 23px;

  background: #d9d9d9;
  bottom: 20px;
  margin-left: 10%;
}

#difficulty-estimate {
  width: 92px;
  height: 23px;

  background: #57b02d;
  bottom: 20px;
}

#addAssignment {
  width: 95px;
  height: 95px;

  position: absolute;

  backdrop-filter: blur(5px);
  background-color: rgba(93, 250, 108, 1);
  border-radius: 29px;
  box-shadow: -10px 10px 40px 0px rgb(161, 161, 161, 0.8),
    inset 5px -5px 16px 0px rgba(93, 250, 108, 1),
    inset 0px 11px 28px 0px rgb(255, 255, 255, 0.7);
  border: none;
  cursor: pointer;

  right: 0;
  bottom: 0px;
  margin: 20px;

  font-family: "Nunito", sans-serif;
  font-weight: 700;
  font-size: 70px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
