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
      const user_id = localStorage.getItem('user_id')
      axios.get(`http://localhost:3001/api/classes/${user_id}`)
      .then((response)=>{
        this.options = response.data;
        this.selectedClasses = this.options.map(option => option.className);
      })
      .catch((error)=>{
        console.error(error);
      })
      // make the GET request when the component is mounted
      axios.get('/api/top3Assignments', {
        params: {
          selectedClasses: this.selectedClasses.join(','),
          selectedPriorities: this.selectedPriorities
        }
      })
      .then(response => {
        // set the assignments data from the response
        this.assignments = response.data;
      })
      .catch(error => {
        console.error('Error executing query top 3 Assignments:', error);
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
        console.log("POPSORT close");
        this.$emit("close");
        console.log("Does it even reach here? *thinking emoji*")
        console.log(`selectedClasses IN POP SORT BEFORE this.$emit: ${this.selectedClasses}`)
        console.log(`selectedPriorities IN POP SORT BEFORE this.$emit: ${this.selectedPriorities}`)
        this.$emit("update-selection", {
          selectedClasses: this.selectedClasses,
          selectedPriorities: this.selectedPriorities,
          options: this.options
        });
        console.log(`selectedClasses IN POP SORT: ${this.selectedClasses}`)
        console.log(`selectedPriorities IN POP SORT: ${this.selectedPriorities}`)
        console.log(`This is what is in selectedPriotieies: ${this.selectedPriorities}`);
      }
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
      }
      // else if {
        
      // } 
      else {
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
      background-color:#403D39;
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
    align-items: center;
  }
  .sortingMeths {
    display: flex;
    position: relative;
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
    width: 60%;
    align-items: center;
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
    width: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
    align-items: center;
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