<template>
    <div class="ClassInd">
        <div class="ClassName">
            {{ className }}
            <div class="ClassDescription">
                {{ classDescription }}
            </div>
        </div>
        <div class="ClassAssignNum">
            Assignment Count: 
            <div class="NumofAssignments">
                {{ AssignmentNum }} 
            </div>
        </div>
        <div >
            <button class="DeleteButton" type="button" @click="DeleteClassAssignments">X</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default{
    name: "ClassDisplay",
    props:{
        class_id: {required: true, type: String},
        className: {required: true, type: String},
        classDescription: {required: true, type: String},
        AssignmentNum: {required: true},
    },
    
    methods:{
        DeleteClassAssignments(){
            axios
            .delete(`http://localhost:3001/api/deleteAssignmentToClass/${this.class_id}`)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.error(error);
            });
            axios
            .delete(`http://localhost:3001/api/deleteClass/${this.class_id}`)
            .then((res) => {
                console.log(res);
                this.$emit('class-deleted', this.class_id);
            })
            .catch((error) => {
                console.error(error);
            });
        },
    },
    mounted(){
        console.log("AssignmentNum in ClassDisplay:", this.AssignmentNum);
    }
    
}
</script>

<style>
.ClassInd{
    -webkit-box-shadow: 3px 15px 30px -1px rgba(0,0,0,0.57); 
    box-shadow: 3px 15px 30px -1px rgba(0,0,0,0.57);
    color: #FFFCF2;
    font-family: Roboto;
    position: relative;
    width: 85%;
    height: 80px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    background: #403D39;
    border-radius: 20px;
    padding-left: 5px;
    
}
.ClassName{
    position: relative;
    width: 195px;
    height: 40px;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    color: #E6E6E6;
    justify-content: center;
}
.ClassDescription{
    position: relative;
    align-content: center;
    overflow-wrap: break-word;
    font-weight: 400;
    font-size: 20px;
    line-height: 17px;
    color: #E6E6E6;
    justify-content: center;

}
.DeleteButton{
    position: absolute;
    top: 22.5%;
    right: 1px;
    border: none;
    font-size: 30px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #E6E6E6;
    background: transparent;
}
.ClassAssignNum {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    margin-right: 20%;
}
.NumofAssignments{
    position: relative;
    align-content: center;
    font-weight: 400;
    font-size: 20px;
    line-height: 17px;
    color: #E6E6E6;
    text-align: center;
}
.DeleteButton:hover{
    color: red;
}

</style>