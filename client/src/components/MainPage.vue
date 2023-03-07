<template>
    <body>
        <div id="bg">
            <div id="sidePanel">
                <button id="menu">
                    X
                </button>
                <div id="sideButtons">
                    <button id="sortBy">
                        Sort By...
                    </button>
                    <button id="viewTasks">
                        View All Tasks
                    </button>
            </div>
        </div>
    
        <div id="restOfScreen">
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
    
    <style>
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
            font-family: 'Eurostile Extended', sans-serif;
            font-weight: 700;
        }
    
        #sidePanel{
            position: absolute;
            width: 20%;
            height: 100%;
            background-color: #403D39;
        }
    
        #sideButtons{
            width: 100%;
            height: 20%;
            background-color: #403D39;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    
        #restOfScreen{
            width: 1fr;
            height: 100%;
            background-color: #CCC5B9;
            /* position: absolute; */
            right: 0px;
            top: 0px;
        }
    
        #sortBy,
        #viewTasks{
            width: 100px;
            height: 100px;
            background: #FFFCF2;
            border-radius: 70px;
            margin: 10px;
            font-family: 'Eurostile Extended', sans-serif;
            font-weight: 700;
        }
    
        #menu{
            width: 50px;
            height: 50px;
            background: #FFFCF2;
            border-radius: 70px;
            margin: 10px;
            top: 0px;
        }
    
        .task{
            position: relative;
            width: 200px;
            height: 190px;
    
            margin-top: 10px;
    
            background: #ECC22E;    
    
            display: inline-block;
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
            font-family: 'Eurostile Extended', sans-serif;
            font-style: normal;
            font-weight: 800;
            font-size: 24px;
            line-height: 29px;
            left: 10px;
    
    
            color: #000000;
        }
    
        #time-estimate{
            position: absolute;
            width: 167px;
            height: 35px;
    
            top: 40%;
            text-align: center;
            vertical-align: text-bottom; 
            font-family: 'Eurostile Extended', sans-serif;
            font-style: normal;
            font-weight: 700;
            font-size: 20px;
            line-height: 24px;
            left: 20px;
    
            color: #FFFFFF;
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
            width: 97px;
            height: 95px;
    
            position: absolute;
            
            background: #5DFA6C;
            border: 4px solid #5DFA6C;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 20px;
            margin: 20px;
            bottom: 0px;
            right: 0px;
    
            font-family: 'Eurostile Extended', sans-serif;
            font-weight: 700;
            font-size: 70px;
        }   
    </style>