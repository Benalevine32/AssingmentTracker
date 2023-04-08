<template>
    <div class="AssignmentBox">
        <div class="description">
            {{ description }}
        </div>
        <div class="diffTime">
            <div class="Difficulty">
                difficulty:
                <input type="text" :disabled="noEdit" v-model="diff">
            </div>
            <div class="dueDate">
                    Due Date: {{ dueDate }}
            </div>
            <div class = "className">
                    Class : {{ className }}
            </div>
        </div>

        <button type="button" class="editbtn" @click="editAssignment()">
        </button>
    </div>
</template>


<script>
import axios from 'axios';


export default{
    name: "assignmentWrapper",
    props:{
        description: {required: true, type: String},
        difficulty: {required: true, type: Number},
        dueDate: {required: true, type: Date},
        className: {required: true, type: String},
    },
    data(){
        return{
            noEdit: true,
            desc: this.description,
            diff: this.difficulty,
            due: this.dueDate,
        }
    },
    methods:{
        editAssignment(){
            if(this.noEdit){
                this.noEdit = !this.noEdit;
            }
            else{
                this.noEdit = !this.noEdit;

                var diff = this.diff;
                var desc = this.desc;
                var due = this.due;
                var assId = this.assignment_id;
                axios.get('http://localhost:3001/api/edit/'+ assId + '/' + diff + '/' + desc + '/' + due ,  {
                    headers: {
                    "Content-type": "application/json",
                    }
                    }).then((res) => {
                    console.log(res);
                });
                window.location.reload();
            }
        }

    },

}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&display=swap');
.AssignmentBox{
    -webkit-box-shadow: 3px 15px 30px -1px rgba(0,0,0,0.57); 
box-shadow: 3px 15px 30px -1px rgba(0,0,0,0.57);
    color: #FFFCF2;
    font-family: Roboto;
    position: relative;
    width: 75%;
    height: 175px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    background: #403D39;
    border-radius: 20px;
    
}
.Title{
    position: relative;
    width: 195px;
    height: 40px;
    font-weight: 700;
    font-size: 14px;
    line-height: 29px;
    color: #E6E6E6;
}
.Description{
    position: relative;
    align-content: center;
    overflow-wrap: break-word;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #E6E6E6;
}
.editbtn{
    background-image: url(https://www.svgrepo.com/show/505639/edit-4.svg);
    background-size: 100%;
    width: 60px;
    height: 60px;
    border: 1px solid #000000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    position: absolute;
    right: 10px;
    top: 30%;
    cursor: pointer;
}
.diffTime{
    position: relative;
    display: block;
    margin: auto;
}
.Time{
    position: relative;
    margin-top: 20px;
    display: inline-block;
    flex-direction: column;
    
}
</style>