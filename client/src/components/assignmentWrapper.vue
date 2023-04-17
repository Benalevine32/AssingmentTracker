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
                    Due Date: {{ formattedDate }}
                    
            </div>
            <div class = "className">
                    Class: {{ className }}
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
        assignment_id: {required: true, type: Number},
    },
    data(){
        return{
            noEdit: true,
            desc: this.description,
            diff: this.difficulty,
            due: this.dueDate,
            formattedDate: "",
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
        },
        toFriendlyFormat(date){
            var formatted = "";
            var mm, dd, yyyy;
            yyyy = date[0] + date[1] + date[2] + date[3];
            mm = date[5] + date[6];
            dd = date[8] + date[9];
            formatted = mm + "/" + dd + "/" + yyyy;
            return formatted;
        }

    },
    created(){
        this.formattedDate = this.toFriendlyFormat(this.due)
    }

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
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    background: #403D39;
    border-radius: 20px;
    
}

.description{
    width: 100%;
    margin-top: 3%;
    overflow-wrap: break-word;
    font-weight: 520;
    font-size:18px;
    color: #E6E6E6;
    display: flex;
    justify-content: center;
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