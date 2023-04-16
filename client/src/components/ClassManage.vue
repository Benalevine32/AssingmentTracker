<template>
    <div class="ClassManage">
        <div class="ClassManage-inner">
            <header class="Class-head">
                <div class="class-header-container">
                    <div>Classes</div>
                </div>
                <div class="AddClassSection" v-show="showAddClass">
                    <div class="AddInputs">
                        <div class="ClassNum">
                            <label for="Name">Class Num:</label><br>
                            <input type="text" id="ClassIDInput" v-model="classNameVal">
                        </div>
                        <div class="ClassName">
                            <label for="Name">Class Name:</label><br>
                            <input type="text" id="ClassNameInput" v-model="classDescriptionVal">
                        </div>
                    </div>
                    <div class="AddButtons">
                        <button type="button" @click="AddClassFunction" class="AddClassEnter">Add Class</button>
                        <button type="button" @click="AddClassShow" class="CancelAddClass">Cancel</button>
                    </div>
                </div>
                <button type="button" class="btn-close" @click="close">x</button>
            </header>
            <section class="Class-body">
            <ul v-for="(ClassInd, index) in classes" v-bind:key="index">
                <ClassDisplay v-if="isDataLoaded" :AssignmentNum="ClassInd.assignmentCount" :class_id="ClassInd.class_id" :className="ClassInd.className" :classDescription="ClassInd.classDescription"   @class-deleted="handleClassDeleted"/>
            </ul>
            </section>
            <div class="button-container">
                <button type="button" class="AddClass" @click="AddClassShow">Add Class</button>
            </div>
        </div>
    </div>
</template>


<script>
import ClassDisplay from './ClassDisplay.vue';
import axios from 'axios';
export default{
    name: "ClassManage",
    components: {
    ClassDisplay
},  
    data() {
      return {
        classes: [],
        showAddClass: false,
        classNameVal : '',
        classDescriptionVal : '',
        isDataLoaded: false // Add this line
      };
    },
    async mounted() {
        try {
            const response = await axios.get('http://localhost:3001/api/classes',{
                params:{
                    userID: localStorage.getItem('user_id')
                }
            });

            this.classes = response.data;
            for (let i = 0; i < this.classes.length; i++) {
            const assignmentCount = await this.fetchAssignmentCount(this.classes[i].class_id);
            console.log(`Assignment count for class ${this.classes[i].class_id}: ${assignmentCount}`);
            this.classes[i].assignmentCount = assignmentCount;
            console.log(`Classes var ${this.classes[i].assignmentCount}`);
            }
            this.isDataLoaded = true; // Add this line
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        close() {
            this.$emit("close");
        },
        AddClassShow(){
            this.showAddClass = !this.showAddClass;
        },
        AddClassFunction() {
        var userID = 1;
            if (this.classDescriptionVal !== null && this.classNameVal !== null) {
                axios.post("http://localhost:3001/api/insertClasses",
                    {
                    className: this.classNameVal,
                    classDescription: this.classDescriptionVal,
                    userID: userID
                    },
                    {
                    headers: {
                        "Content-type": "application/json",
                    },
                    }
                )
                .then((res) => {
                    console.log(res);
                    this.classes.push({
                        className: this.classNameVal,
                        classDescription: this.classDescriptionVal,
                        user_id: userID,
                        assignmentCount: 0
                        
                    });  
                    this.classDescriptionVal = "";
                    this.classNameVal = "";
                    this.showAddClass = false;
                })
                .catch((error) => {
                    console.error(error);
                });

            }
        },
        handleClassDeleted(deletedClassId) {
            this.classes = this.classes.filter((classItem) => classItem.class_id !== deletedClassId);
        },
        async fetchAssignmentCount(class_id) {
            try {
                const response = await axios.get(`http://localhost:3001/api/numAssignments/${class_id}`);
                console.log(`fetchAssignmentCount response.data for class ${class_id}:`, response.data);
                return response.data;
            } catch (error) {
                console.error(error);
                return 0;
            }
        },
        
    },
}
</script>

<style>

.ClassManage{
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
.ClassManage-inner{
    width: 30%;
    height: 50%;
    background: #252422;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
}
.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: #252422; /* Match the background color of .ClassManage-inner */
}
.Class-head {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #E6E6E6;
  font-size: 25px;
  padding: 55px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.class-header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.AddClassSection {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  font-size: 15px;
  text-align: center;
}

.AddClassSection header{
    font-size: 20px;
    margin-bottom: 5%;
}

.AddInputs {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 15px;
}
.Class-body {
    position: relative;
    display: flex;
    flex-direction: column;
    align-content: center;
    margin: 0; /* Add this to remove default margin */
    padding: 0; /* Add this to remove default padding */
    flex-grow: 1; /* Add this to make the Class-body take up the remaining space */
    overflow-y: auto;
}

.Class-body ul {
    list-style-type: none; /* Remove bullet points */
    margin: 1%;
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
.AddClass{
    width: 15%;
    height: 20px;
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

.AddInputs label{
    text-align: left;
    font-size: 15px;
}
.AddInputs input {
    width: 75%;
    position: relative;
    text-align: center;
    justify-content: center;
    font-size: 15px;
}
.AddButtons{
    margin-top: 10%;
}
</style>