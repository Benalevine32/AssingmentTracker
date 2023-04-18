<template>
    <div class="sortPop">
        <div class="sortPop-inner">
           <button class="exitButton" type="button" @click="close">X</button>
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
                  <div>
                      <button type="button" class="SubmitBut" @click="submit">Submit</button>
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
      axios.get('http://localhost:3001/api/classes',{
        params:{
          userID: localStorage.getItem('user_id'),
        }
      })
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
        location.reload();
        console.log("submitting form...");
      
        const pAssignmentName= this.assignmentName;
        const pSelectedClass= this.selectedClass;
        const pEstimatedTime= this.estimatedTime;
        const pDueDate= this.dueDate;
        const pDifficulty= this.difficulty;
        const UserID = localStorage.getItem('user_id')

        const queryURI = `http://localhost:3001/api/insertAssignment/${pAssignmentName}/${pSelectedClass}/${ pEstimatedTime}/${pDueDate}/${pDifficulty}/${UserID}`
        try
        {
           await fetch(queryURI)
           this.assignmentName = '';
            this.selectedClass = '';
            this.estimatedTime = '';
            this.dueDate = '';
            this.difficulty = '';
        }
        catch{
          throw new Error('Failure with posting new assignment')
        }
      },
    },
  }
</script>



<style>
  @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@600&display=swap");

.sortPop{
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
    font-family: "Nunito", sans-serif;
  }

  .sortPop-inner{
    position: relative;
    width: 60%;
    height: 65%;
    background: #252422;
    box-shadow: 2px 2px 20px 1px;
    display: flex;
    flex-direction: column;
  }
  .exitButton{
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
    z-index: 1; /* Add this line */
}
  .Title{
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #E6E6E6;
    font-size: 25px;
    padding: 55px;
    margin-bottom: 3%;
    display: flex;
    justify-content: center;
    align-items: center;

  }
  .IndInp label{
    text-align: left;
    color:white;

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
.SubmitBut{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto; /* Add this line to center the button horizontally */
  width: fit-content;
  display: flex;
  width: 10%;
  height: 25px;
  margin-top: 5px;
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
</style>
