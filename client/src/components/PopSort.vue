  <template>
      <div class="sortPop">
          <div class="sortPop-inner">
            <div class="exitButton">
              <button @click="close">X</button>
            </div>
              <h1 id="SortHead"> Sort Tasks</h1>
              <div class="sortingMeths">
                  <div id="PrioList" class="PriorityDrop" tabindex="100" >
                      <span class="anchor" @click="togglePrioDropdown">Select Priority</span>
                      <ul class="PrioItems" v-show="showPrioDropdown">
                        <li><input type="checkbox" id="all" value="all" v-model="selectAllPrio">
                        <label for="all">All</label></li>
                          <li><input type="checkbox" value="Difficulty" v-model="sortByDifficulty"/>Difficulty</li>
                          <li><input type="checkbox" value="Due Date" v-model="sortByDueDate"/>Due Date</li>
                          <li><input type="checkbox" value="Time" v-model="sortByTime"/>Time</li>
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
                          <input type="checkbox" :id="index" :value="option.value" v-model="selectedClasses">
                          <label :for="index">{{ option.text }}</label>
                        </li>
                      </ul>
                  </div>
                </div>
                <button style="display: block" @click="onSubmit()">SUBMIT</button>
              </div>
          </div>
      </div>

  </template>

  <script>
  import axios from 'axios';
  export default {
    name: "PopSort",
    props: {
      TogglePopUp: Boolean,
      getSortedAssignments: Function
    },
    data() {
      return {
        showPrioDropdown: false,
        showClassDropdown: false,
        sortByDifficulty: false,
        sortByDueDate: false,
        sortByTime: false,
        options: [
        {
          text: 'Class 1',
          value: 1
        },
        {
          text: 'Class 2',
          value: 2
        },
        {
          text: 'Class 3',
          value: 3
        }
        ],
        isSortPopVisible: false,
        selectedPriorities: [],
        selectedClasses: [],
        selectAllClasses: false,
        selectAllPrio: false
      };
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
      sortedAssignments(selectedPrios, selectedClasses) {
        if(selectedClasses.length == 0){
          console.log("selectedClasses is empty")
          // Make a GET request and use the class_id
          axios.get('/api/assignments', {
            params: {
              class_id: selectedClasses
            }
          })
          .then(response => {
            // ouput to the console the data of the response  
            console.log(response.data);
          })
          .catch(error => {
            // ouput to the console any error that shows up
            console.error(error);
          });
        }
        else {
          console.log("selectedClasses is NOT empty");
          console.log(`attempting the sortedAssignments function with ${selectedClasses[0]}`);
          
          axios.get(`http://localhost:3001/api/top3AssignmentsByDifficulty/${selectedClasses[0]}`)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
        }
      },

      onSubmit() {
        // Determine the selected priorities
        const selectedPrios = this.selectedPriorities.map(prio => {
          if (prio === 'Due Date') {
            return 'due_date';
          } else if (prio === 'Difficulty') {
            return 'difficulty';
          } else if (prio === 'Time') {
            return 'time';
          }
        }).filter(Boolean);

        // selectedPrios returns the priority.
        // selectedClasses is an array
        this.sortedAssignments(selectedPrios, this.selectedClasses);
        this.$emit('close');
      }
    },
    watch: {
    selectAllClasses: function(value) {
      if (value) {
        this.selectedClasses = this.options.map(option => option.value);
        this.selectAllClasses = true; 
      } else {
        this.selectedClasses = [];
        this.selectAllClasses = false; 
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
    }
  }
}
  </script>

  <style scoped>
  .sortPop{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99;
      background-color: rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: auto;
      margin-right: auto;
  }

  .sortPop-inner{
      position: fixed;
      background-color: rgb(49, 49, 49);
      color: rgb(3, 0, 0);
      padding: 16px;
      width: 30%;
      height: 30%;
      box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
      text-align: center;
  }
  .exitButton{
    text-align: right;
  }
  #SortHead{
    color: rgb(255, 255, 255);
    margin-left: auto;
    margin-right: auto;
    align-content: center;
  }
  .sortingMeths {
    display: flex;
    position: relative;
    align-items: top;
    justify-content: center;
    left: 5px;
    right: 5px;
    padding: 5px;
  }

  .PriorityDrop {
    position: relative;
    align-items: center;
    margin-left: 10px;
    padding: 5px;
    top: 100%;
  }

  .PriorityDrop .anchor {
    position: relative;
    width: 100px;
    text-align: left;
    cursor: pointer;
    display: inline-block;
    padding: 5px 50px 5px 10px;
    border: 1px solid #000000;
    background-color: rgb(202, 202, 202);
  }

  .PriorityDrop .anchor:after {
    position: absolute;
    content: "";
    border-left: 2px solid rgb(255, 255, 255);
    border-top: 2px solid rgb(255, 255, 255);
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
    list-style-type: none;
    margin: 0;
    padding: 0;
    background-color: rgb(202, 202, 202);
    outline:1px solid black;
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