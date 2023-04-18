<template>
  <body>
    <div id="bg">
      <div id="bannerContainer">
        <div id="left">
          <button id="menu" v-on:click="toggleDiv()">
            {{ sidePanelButton }}
          </button>
        </div>

        <div id="center">
          <img :src="image" id="img" />
        </div>
      </div>

      <div
        id="restOfScreen"
        :style="{
          'background-image': 'url(' + require('@/assets/ceta.jpg') + ')',
        }"
      >
        <myModal v-show="isModalVisible" @close="closeModal()" />
        <PopSort v-show="isSortVisible" @close="closeSort()" />
        <AddAssignPop v-show="isAddVisible" @close="closeAdd()" />
        <ClassManage v-show="isClassesVisible" @close="closeClass()" />
        <center>
          <div id="task-row-1">
            <div
              v-for="item in top3AssignmentsList"
              :key="item.description"
              class="task"
              id="taskItem"
            >
              <div id="taskArea">
                <div id="title">
                  <p>{{ item.description }}</p>
                </div>
                <div id="dueDate">
                  <p>{{ item.dueDate | formatDate }}</p>
                </div>
                <div id="difficulty">
                  <radial-progress-bar
                    :diameter="150"
                    :completed-steps="item.difficulty*20"
                    :total-steps="totalSteps"
                  >
                    <p>{{ item.difficulty *20 }}% Difficulty</p>
                  </radial-progress-bar>
                </div>
                
                <markComplete :assId="item.assignment_id"></markComplete>
              </div>
            </div>
          </div>
        </center>
        <button id="addAssignment" @click="showAdd()">+</button>
      </div>
      <div v-if="sidePanel" id="sidePanel">
        <button id="sortBy" @click="showSort()">Sort By...</button>
        <button id="viewTasks" @click="showModal()">Edit Tasks</button>
        <button id="Classes" @click="showClasses()">Classes</button>
      </div>
    </div>
  </body>
</template>




<script>

import RadialProgressBar from "vue-radial-progress";
import myModal from "./myModal.vue";
import PopSort from "./PopSort.vue";
import AddAssignPop from "./AddAssignPop.vue";
import ClassManage from "./ClassManage.vue";
import axios from "axios";
import markComplete from './mark-complete.vue';


export default {
  name: "MainPage",
  components: {
    myModal,
    PopSort,
    AddAssignPop,
    ClassManage,
    RadialProgressBar,
    markComplete,
  },
  data() {
    return {
      totalSteps: 100,
      isAddVisible: false,
      isSortVisible: false,
      isModalVisible: false,
      isClassesVisible: false,
      sidePanel: false,
      sidePanelButton: "Menu",
      classesList: [],
      top3AssignmentsList: [],
      image: require("@/assets/goodLogo.png"),
    };
  },
  filters: {
    formatDate(value) {
      const date = new Date(value);
      return date.toLocaleDateString();
    },
  },
  mounted() {
    axios
      .get("http://localhost:3001/api/classes")
      .then((response) => {
        this.classesList = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("http://localhost:3001/api/top3Assignments", {
        params: {
          userID: localStorage.getItem("user_id"),
        },
      })
      .then((response) => {
        this.top3AssignmentsList = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {

    showAdd() {
      this.isAddVisible = true;
    },
    closeAdd() {
      this.isAddVisible = false;
    },
    closeClass() {
      this.isClassesVisible = false;
    },
    showSort() {
      this.isSortVisible = true;
    },
    showClasses() {
      this.isClassesVisible = true;
    },
    closeSort() {
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
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@600&display=swap");

#complete {
  background: transparent;
  border: none;
  color: rgb(93, 250, 108);
  cursor: pointer;
}

#taskArea {
  position: absolute;
  width: 100%;
  height: 100%;
  font-family: "Nunito", sans-serif;
}

head,
body {
  margin: 0;
  overflow-y: hidden;
}

#img {
  height: 100%;
  width: auto;
  margin-top: 10px;
}

#center {
  width: 100%;
  display: flex;
  justify-content: center;
}
#left {
  height: 100%;
  display: flex;
  align-items: center;
}

#bannerContainer {
  position: absolute;
  width: 100%;
  height: 20%;
  background: rgb(131, 58, 180);
  background: linear-gradient(
    7deg,
    rgba(131, 58, 180, 1) 0%,
    rgba(29, 128, 253, 1) 0%,
    rgba(252, 176, 69, 1) 100%
  );
  display: flex;
}

#bg {
  margin: 0;
  width: 100vw;
  height: 100vh;
  background-color: red;
  position: absolute;
  max-height: 100%;
  max-width: 100%;
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
  position: relative;
  left: 35%;
  z-index: 2;
}

#sidePanel {
  position: absolute;
  width: 20%;
  height: 100vh;
  background-color: #252422;
  left: 0px;
  top: 0px;
  padding-top: 100px;
  z-index: 1;
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
  position: absolute;
  left: 0px;
  bottom: 0px;
  height: 80%;
  width: 100%;
  overflow: hidden;
  background-size: cover;
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
  border-radius: 29px;
  backdrop-filter: blur(5px);
  background-color: rgba(67, 135, 232, 1);
  border-radius: 29px;
  box-shadow: -10px 10px 40px 0px rgb(161, 161, 161, 0.2),
    inset 5px -5px 16px 0px rgba(67, 135, 232, 1),
    inset 0px 11px 28px 0px rgb(255, 255, 255, 0.4);
}

.task {
  position: relative;
  margin: 20px;
  width: 270px;
  height: 270px;
  backdrop-filter: blur(5px);
  background-color: rgba(253, 253, 96);
  border-radius: 29px;
  box-shadow: -10px 10px 40px 0px rgb(161, 161, 161, 0.2),
    inset 5px -5px 16px 0px rgba(253, 253, 96),
    inset 0px 11px 28px 0px rgb(255, 255, 255, 0.4);
}

#task-row-1 {
  display: flex;
  justify-content: center;
  padding-top: 10%;
}

#addAssignment {
  width: 95px;
  height: 95px;

  position: absolute;

  backdrop-filter: blur(5px);
  background-color: rgba(93, 250, 108, 1);
  border-radius: 29px;
  box-shadow: -10px 10px 40px 0px rgb(161, 161, 161, 0.2),
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

