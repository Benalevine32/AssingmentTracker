  <template>
      <div class="sortPop">
          <div class="sortPop-inner">
              <button class="exitButton" type="button" @click="close">X</button>
              <h1 id="SortHead"> Sort Tasks</h1>
              <div class="sortingMeths">
                  <div id="PrioList" class="PriorityDrop" tabindex="100" >
                    <span class="anchor" @click="togglePrioDropdown">Select Priority</span>
                      <ul class="PrioItems" v-show="showPrioDropdown">
                        <li><input type="checkbox" id="all" value="all" v-model="selectAllPrio">
                        <label for="all">All</label></li>
                          <li><input type="checkbox" value="Difficulty" v-model="selectedPriorities"/>Difficulty</li>
                          <li><input type="checkbox" value="Due Date" v-model="selectedPriorities"/>Due Date</li>
                          <li><input type="checkbox" value="Time" v-model="selectedPriorities"/>Time</li>
                      </ul>
                  </div>
                <div id="ClassList" class="PriorityDrop" tabindex="100" >
                    <div class="Scroll"> 
                      <span class="anchor" @click="toggleClassDropdown">Select Class</span>
                      <ul class="PrioItems" v-show="showClassDropdown">
                        <li>
                            <input type="checkbox" id="all-classes" value="all" v-model="selectAllClasses">
                            <label for="all-classes">All</label>
                        </li>
                        <li v-for="(option, index) in options" :key="index">
                          <input type="checkbox" :id="index" :value="option.className" v-model="selectedClasses">
                          <label :for="index">{{ option.className }}</label>
                        </li>
                      </ul>
                  </div>
                </div>
              </div>
          </div>
      </div>

  </template>

  <script>
  import axios from 'axios'; 
  export default {
    name: "PopSort",
    props: ['TogglePopUp'],
    data() {
      return {
        showPrioDropdown: false,
        showClassDropdown: false,
        options: [],
        isSortPopVisible: false,
        selectedPriorities: [],
        selectedClasses: [],
        selectAllClasses: true,
        selectAllPrio: false
      };
    },
    mounted() {
      axios.get('http://localhost:3001/api/classes', {
        params: {
          userID: localStorage.getItem('user_id'),
        },
      })
      .then((response) => {
        this.options = response.data;
        this.selectedClasses = this.options.map(option => option.className);
      })
      .catch((error) => {
        console.error(error);
      });
    },
    methods: {
      togglePrioDropdown() {
        this.showPrioDropdown = !this.showPrioDropdown;
      },
      toggleClassDropdown() {
        this.showClassDropdown = !this.showClassDropdown;
      },
      close() {
        this.$emit("close");
      },
      
  },
    computed: {
      checkLengths() {
        return this.options.length === this.selectedClasses.length;
      },
    },
    watch: {
      selectAllClasses: function(value) {
        if (value) {
          this.selectedClasses = this.options.map(option => option.className);
        } else {
          this.selectedClasses = [];
        }
      },
    selectAllPrio: function(value) {
      if (value) {
        
        this.selectedPriorities = ["Difficulty", "Due Date", "Time"];
        this.selectAllPrio = true; 
      } else {
        
        this.selectedPriorities = [];
        this.selectAllPrio = false; 
      }
    },
    selectedClasses: {
      handler() {
        if (this.selectedClasses.length !== this.options.length && this.selectAllClasses) {
          this.selectAllClasses = false;
        } else if (this.selectedClasses.length === this.options.length && !this.selectAllClasses) {
          this.selectAllClasses = true;
        }
      },
      immediate: true,
    },
  }
}
  </script>

  <style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@600&display=swap");

  .sortPop{
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    overflow-y: hidden;
    margin: 0;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    text-align: center;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    font-family: "Nunito", sans-serif;
  }

  .sortPop-inner{
    padding: 20px;
    position: relative;
    background: #252422;
    position: fixed;
    margin: 0;
    flex-direction: column;
    max-height: 30vh;
    max-width: 50vh;
  }
  .exitButton {
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
  #SortHead{
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #E6E6E6;
    font-size: 25px;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;

  }
  .sortingMeths {
    display: flex;
    position: relative;
    justify-content: center;
    padding: 5px;
    color: #000000;
  }

  .PriorityDrop {
    align-items: center;
    margin: 10px;
    padding: 5px;
    top: 100%;
    width: 80%; 
    
  }
  .PriorityDrop .anchor {
    position: relative;
    width: 60%;
    align-items: center;
    text-align: left;
    cursor: pointer;
    display: inline-block;
    padding: 5px 50px 5px 10px;
    border: 1px solid #000000;
    background-color: rgba(67, 135, 232, 1);
    color:white;
  }

  .PriorityDrop .anchor:after {
    position: absolute;
    content: "";
    border-left: 2px solid rgb(0, 0, 0);
    border-top: 2px solid rgb(0, 0, 0);
    padding: 5px;
    right: 10px;
    top: 20%;
    -moz-transform: rotate(-135deg);
    -ms-transform: rotate(-135deg);
    -o-transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
  }

  .PriorityDrop .anchor:active:after {
    right: 8px;
    top: 21%;
  }

  .PriorityDrop ul.PrioItems {
    position: static;
    top: 100%;
    width: 115%;
    list-style-type: none;
    margin: 0;
    padding: 0;
    align-items: center;
    background-color: rgba(67, 135, 232, 1);
    outline:1px solid black;
    color:white;
    max-height: 80%; 
    width: auto;
  }

  .PriorityDrop .Scroll ul.PrioItems {
    overflow-y: scroll;
  }

  .PriorityDrop ul.PrioItems li {
    font-size: 18px;
    text-align: left;
    padding: 5px;
  }

  .PriorityDrop ul.PrioItems li input[type="checkbox"] {
    margin-right: 5px;
  }
  </style>