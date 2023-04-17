<template>
  <div class="sortPop">
      <div class="sortPop-inner">
          <div class="exitButton">
              <button  @click="close">X</button>
          </div>
          <div class="Title">
              <b>Add Assignment</b>
              <p>{{ submissionMessage }}</p>
          </div>
          <div class="InputList">
              <div class="IndInp">
                  <label for="Name">Assignment Name:</label><br>
                  <input type="text" id="Name" name="Name" v-model="assignmentName" ><br>
              </div>
              <div class="IndInp">
                <label for="Class">Class:</label><br>
                    <select name="classSelect" id ="selectedClass" v-model="selectedClass">
                      <option v-for="(item, index) in classesList" :value="item.class_id" :key="index">{{ item.className }}</option>                      
                    </select>
              </div>
              <div class="IndInp">
                <label for="Difficulty">Estimated Time:</label><br>
                  <select name="Time" id="Time" v-model="estimatedTime">
                    <option value="30">30 mins</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                    <option value="150">2.5 hours</option>
                    <option value="180">3 hours</option>
                    <option value="210">3.5 hours</option>
                    <option value="240">4 hours</option>
                    <option value="270">4.5 hours</option>
                    <option value="300">5 hours</option>
                  </select>
              </div>
              <div class="IndInp">
                  <label for="DueDate">Due Date:</label><br>
                  <input type="date" id="DueDate" name="DueDate" v-model="dueDate"><br>
              </div>
              <div class="IndInp">
                  <label for="Difficulty">Difficulty:</label><br>
                  <select name="cars" id="cars" v-model="difficulty">
                    <option value="1">Very Easy</option>
                    <option value="2">Easy</option>
                    <option value="3">Medium</option>
                    <option value="4">Hard</option>
                    <option value="5">Very Hard</option>
                  </select>                
                </div>
                <div class="IndInp">
                    <button @click="submit">Submit</button>
                 </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
export default
{
  name: "AddAssignPop",
  data(){
    return{
      arrayOfClasses: [],
      classesList: [],
      assignmentName: '',
      selectedClass: '',
      estimatedTime: '',
      dueDate: '',
      difficulty: '',
      submissionMessage:'',
    }
  },
  mounted()
  {
    const user_id = localStorage.getItem('user_id')
      axios.get(`http://localhost:3001/api/classes/${user_id}`)
          .then((response)=>{
              this.classesList = response.data;
              console.log(response.data)
      })    
    },
  methods:
  {
    close() {
      this.$emit("close");
    },
    async submit()
    {
      console.log("submitting form...");
      const user_id = localStorage.getItem('user_id')
      const pAssignmentName= this.assignmentName;
      const pSelectedClass= this.selectedClass;
      const pEstimatedTime= this.estimatedTime;
      const pDueDate= this.dueDate;
      const pDifficulty= this.difficulty;

      const queryURI = `http://localhost:3001/api/insertAssignment/${pAssignmentName}/${pSelectedClass}/${pEstimatedTime}/${pDueDate}/${pDifficulty}/${user_id}`
      try
      {
         await fetch(queryURI)
      }
      catch{
        throw new Error('Failure with posting new assignment')
      }
          // this.submissionMessage='Submission Sucessful'
          this.assignmentName = '';
          this.selectedClass = '';
          this.estimatedTime = '';
          this.dueDate = '';
          this.difficulty = '';
          window.location.reload();
    },
  },
}
</script>



<style>
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
  width: 60%;
  height: 60%;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  text-align: center;
  color: white;
}
.exitButton{
  text-align: right;
}
.Title{
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5%;
  align-content: center;
  font-size: 30px;
}
.IndInp label{
  text-align: left;
}
.InputList {
  font-size: 20px;
}
.InputList input {
  position: relative;
  text-align: center;
  justify-content: center;
}
.IndInp {
  display: flex;
  justify-content: space-between;
  padding-bottom: 40px;
}

.IndInp label {
  flex: 1;
  text-align: right;
  margin-right: 15px;
}

.IndInp input {
  flex: 2;
  align-items: center;
  text-align: left;
  margin-right: 25%;
  width: calc(50% - 30px); /* add this line to set the width */
}
.IndInp select {
  flex: 2;
  text-align: left;
  margin-right: 25%;
  width: calc(50% - 30px); /* add this line to set the width */
}
.dropdown-content {
display: none;
position: absolute;
background-color: #f9f9f9;
min-width: 160px;
box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
z-index: 1;
}
.dropdown:hover .dropdown-content {
display: block;
}
</style>
