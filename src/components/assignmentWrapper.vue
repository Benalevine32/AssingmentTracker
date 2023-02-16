<template>
    <div class="AssignmentBox">
        <div class="Title">
            {{ title }}
            <div class="Description">
                {{ description }}
            </div>
        </div>
        <div class="diffTime">
            <div class="Difficulty">
                Difficulty: {{ difficulty }}
            </div>
            <div class="Time">
                    Time: {{ time }}
            </div>
        </div>

        <button type="button" class="editbtn" @click="editAssignment">
            Edit
        </button>
    </div>
</template>


<script>

export default{
    name: 'assignmentWrapper',
    props:{
        title: {required: true, type: String},
        description: {required: true, type: String},
        difficulty: {required: true, type: Number},
        time: {required: true, type: Number},
    },
    methods:{
        editAssignment(){
        }
    }
}
</script>


<style>
.AssignmentBox{
    position: relative;
    width: 75%;
    height: 175px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    background: #4589EF;
    border: 3px solid #4589EF;
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

    color: #000000;
}

.editbtn{
    box-sizing: border-box;

    width: 67px;
    height: 30px;

    background: #5DFA6C;
    border: 1px solid #000000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    position: absolute;
    right: 0;
    top: 40%;
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
