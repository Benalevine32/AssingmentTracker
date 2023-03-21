<template>

    <body>
        <div id="bg">
            <div v-if="sidePanel" id = "sidePanel">
                <button id="sortBy">
                    Sort By...
                </button>
                <button id="viewTasks">
                    View All Tasks
                </button>
            </div>

    
        <div id="restOfScreen">
            <button id="menu" v-on:click="toggleDiv()">
                    {{ sidePanelButton }}
            </button>
            <div id="task-row-1">
                    <div class="task" id="taskRow1">
                        <div id="main-task-title">
                            MAIN TASK TITLE
                        </div>
                        <div id="time-estimate">
                            Time Estimate:
                            01h 30m
                        </div>
                        <div id="total-difficulty">
                            <div id="difficulty-estimate">
                                
                            </div>
                        </div>
                    </div>
                
                    <div class="task">
                        <div id="main-task-title">
                            MAIN TASK TITLE
                        </div>
                        <div id="time-estimate">
                            Time Estimate:
                            3h 00m
                        </div>
                        <div id="total-difficulty">
                            <div id="difficulty-estimate">
                                
                            </div>
                        </div>
                    </div> 
                </div> 
    
                <div id="task-row-2">
                    <div class="task" id="taskRow2">
                        <div id="main-task-title">
                            MAIN TASK TITLE
                        </div>
                    <div id="time-estimate">
                            Time Estimate:
                            0h 45m
                    </div>
                    <div id="total-difficulty">
                        <div id="difficulty-estimate">
                            
                        </div>
                    </div>
                </div>
            </div>
    
    
                <button id="addAssignment">
                    +
                </button>
            </div>
        </div>
    </body>
        
</template>

<script>

export default{
    name: 'MainPage',
    data: function(){
        return{
            sidePanel: false,
            sidePanelButton: "Menu",
        }
    },
    methods: {
        toggleDiv: function() {
            this.sidePanel = !this.sidePanel;
            if (this.sidePanel){
                this.sidePanelButton = "X";
            }else{
                this.sidePanelButton = "Menu";
            }
        }
    }
}

</script>




<style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600&display=swap');

    body{
        margin: 0;
    }
    
    #bg{
        margin: 0;
        width: 100vw;
        height: 100vh;
        background-color: red;
        position: relative;
    }
    
    #menu {
        font-family: 'Nunito', sans-serif;
        font-weight: 700;
        border: none;
        cursor: pointer;
        backdrop-filter: blur(5px); background-color: rgba(235, 94, 40, 1); border-radius: 29px; box-shadow: -10px 10px 40px 0px rgb(0, 0, 0, 1), inset 5px -5px 16px 0px rgba(0, 0, 0, 0.4), inset 0px 11px 28px 0px rgb(255, 255, 255, 0.4);  

        width: 50px;
        height: 50px;
        margin: 10px;
        top: 0px;

    }
    
    #sidePanel{
        position: absolute;
        width: 20%;
        height: 100vh;
        background-color: #252422;
        left: 0px;
        top: 0px;
        padding-top: 100px;

    }
    
    #sideButtons{
        width: 100px;
        height: 100px;
        background-color: #252422;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

    }
    
    #restOfScreen{
        width: 1fr;
        height: 100%;
            
        background: -webkit-linear-gradient(to top, #ffffff, #ccc5b9);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to top, #ffffff, #ccc5b9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

        /* position: absolute; */
        right: 0px;
        top: 0px;
    }
    
        #sortBy,
        #viewTasks{
            width: 200px;
            height: 50px;
            margin: 20px;
            font-family: 'Nunito', sans-serif;            
            
            border: none;
            cursor: pointer;

            backdrop-filter: blur(5px); background-color: rgba(255, 252, 242, 0.8); border-radius: 29px; box-shadow: -10px 10px 40px 0px rgba(0, 0, 0, 1), inset 5px -5px 16px 0px rgb(138, 136, 131), inset 0px 11px 28px 0px rgb(255, 252, 242, 1);  
        }  
    
        .task{
            position: relative;
            width: 200px;
            height: 190px;
    
            margin-top: 10px; 
    
            display: inline-block;
            backdrop-filter: blur(5px); background-color: rgba(253, 253,96); border-radius: 29px; box-shadow: -10px 10px 40px 0px rgb(161, 161, 161, 0.8), inset 5px -5px 16px 0px rgba(253, 253,96), inset 0px 11px 28px 0px rgb(255, 255, 255, 0.7);  
            
        }
    
        #taskRow1{
            margin-top: 90px;
            margin-left: 40%;
            margin-right: 10px;
            margin-bottom: 0;
            height: 1fr;
            
        }
    
        #taskRow2{
            top: 0;
            margin-left: 50%;
            margin-right: 10px;
            height: 1fr;
        }
    
        #main-task-title{
            position: relative;
            width: 178px;
            height: 40px;
            top: 5%;
            text-align: center;
            vertical-align: middle;
            font-family: 'Nunito', sans-serif;
            font-style: normal;
            font-weight: bolder;
            font-size: 24px;
            line-height: 29px;
            left: 10px;
    
    
            color: #252422;
        }
    
        #time-estimate{
            position: absolute;
            width: 167px;
            height: 35px;
    
            top: 40%;
            text-align: center;
            vertical-align: text-bottom; 
            font-family: 'Nunito', sans-serif;
            font-style: normal;
            font-weight: 100;
            font-size: 20px;
            line-height: 24px;
            left: 20px;
    
            color: #252422;
        }
    
        #total-difficulty{
            position: absolute;
            width: 163px;
            height: 23px;
    
            background: #D9D9D9;
            bottom: 20px;
            margin-left: 10%;
        }
    
        #difficulty-estimate{
            width: 92px;
            height: 23px;
    
            background: #57B02D;
            bottom: 20px;
        }
    
        #addAssignment{
            width: 95px;
            height: 95px;
    
            position: absolute;
            
            backdrop-filter: blur(5px); background-color: rgba(93, 250, 108, 1); border-radius: 29px; box-shadow: -10px 10px 40px 0px rgb(161, 161, 161, 0.8), inset 5px -5px 16px 0px rgba(93, 250, 108, 1), inset 0px 11px 28px 0px rgb(255, 255, 255, 0.7);  
            border: none;
            cursor: pointer;
           
            right: 0;
            bottom: 0px;;
            margin: 20px;
    
            font-family: 'Nunito', sans-serif;
            font-weight: 700;
            font-size: 70px;
            display: inline-flex;
            justify-content: center;
            align-items: center;

        }   
    </style>