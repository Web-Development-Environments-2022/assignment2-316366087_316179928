var context;
var shape = new Object(); //pacment location - shape.i, shape.j
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var users;
var packmanFace;
var numberOfMonsters;
var monsters;
var monstersBoard;
var strikes;
var fivePointsColor = "black";
var fifteenPointsColor = "blue";
var twenyFivePointsColor = "red";
var food_remain;
var keyMap;
var upArrow = 38;
var downArrow = 40;
var leftArrow = 37;
var rightArrow = 39;
var gameTime;
var isLoggedIn;
var allScreens = ["welcome", "registrationScreen", "loginPage", "settingsPage", "gameScreen","alreadyLoggedIn"];
var isGameOn = false;
var turnCounter
var movingScore;
var blockMonsters;
var keyMapForGameDisplay;

$(document).ready(function() {
    keyMap = {"up":38,"down":40,"left":37,"right":39};
    isLoggedIn = false;
	users = {"k":"k"}
    keyMapForGameDisplay = {"Up":"ArrowUp", "Right":"ArrowRight", "Left":"ArrowLeft", "Down":"ArrowDown"}
	context = canvas.getContext("2d");
	showOneScreen("welcome")
});



function Start() {
	if (isGameOn){
		return;
	}
    let audio = document.getElementById("audio");
    audio.play();
	showOneScreen("gameScreen");
	isGameOn = true;
    blockMonsters = 0;
    strikes = 5;
    turnCounter = 0;
    movingScore = new Object();
	monsters = new Array();
	monstersBoard = new Array();
	addMonsters();
	packmanFace = 0;
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	// food_remain = 50;
    var balls5points = Math.floor(0.6*food_remain);
    var balls15points = Math.floor(0.3*food_remain);
    var balls25points = Math.floor(0.1*food_remain);
	var pacman_remain = 1;
	var clock = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * balls5points) / cnt) {
					food_remain--;
                    balls5points--;
					board[i][j] = 5; //food
				} else if (randomNum <= (1.0 * balls5points+balls15points) / cnt) {
					food_remain--;
                    balls15points--;
					board[i][j] = 15; //food
				}
                else if (randomNum <= (1.0 * balls5points+balls15points+balls25points) / cnt) {
					food_remain--;
                    balls25points--;
					board[i][j] = 25; //food
				}
                 else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt && pacman_remain > 0 ) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2; //pacman
				} else {
					board[i][j] = 0; //empty
				}
				cnt--;
			}
		}
	}
	while (balls5points > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 5;
		balls5points--;
        food_remain--;
	}
    while (balls15points > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 15;
		balls15points--;
        food_remain--;
	}
    while (balls25points > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 25;
		balls25points--;
        food_remain--;
	}
	addClock();
    addMedicine();
    addIce();
    addMovingScore();
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function addClock(){
	emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = "clock";
}

function addMedicine(){
    for (let i=0; i<2; i++) {
        emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = "medicine";
    }
}

function addIce(){
    emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = "ice";
}

function addMovingScore() {
    while(true) {
        let i = Math.floor(Math.random() * 9 + 1);
        let j = Math.floor(Math.random() * 9 + 1);
        if (board[i][j]!=4 && board[i][j]!=2 && monstersBoard[i][j]!=1) {
            movingScore.i=i
            movingScore.j=j
            monstersBoard[i][j] = "movingScore"
            break;
        }
    }
}

function addMonsters(){
	initiateMonstersBoard();
	for (var i = 0; i<numberOfMonsters; i++){
		monsters[i] = new Object();
		switch(i){
			case 0:
				monsters[i].i = 0;
				monsters[i].j = 0;
				monstersBoard[0][0] = 1;
				break;
			case 1:
				monsters[i].i = 9;
				monsters[i].j = 0;
				monstersBoard[9][0] = 1;
				break;
			case 2:
				monsters[i].i = 0;
				monsters[i].j = 9;
				monstersBoard[0][9] = 1;
				break;
			case 3:
				monsters[i].i = 9;
				monsters[i].j = 9;
				monstersBoard[9][9] = 1;
				break;
			
		}
        monsters[i].lastMove="noMove"
	}
	
}

function initiateMonstersBoard(){
	for (var i = 0; i < 10; i++) {
		monstersBoard[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) 
				monstersBoard[i][j] = 4;
			else
				monstersBoard[i][j] = 0;
		}
	}
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[upArrow]) {
		packmanFace = 1.5;
		return 1; //up
	}
	if (keysDown[downArrow]) {
		packmanFace = 0.5;
		return 2; //down
	}
	if (keysDown[leftArrow]) {
		packmanFace = 1;
		return 3; //left
	}
	if (keysDown[rightArrow]) {
		packmanFace = 0;
		return 4; //right
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) { //up
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) { //down
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {//left
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {//right
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 5 || board[shape.i][shape.j] == 15 || board[shape.i][shape.j] == 25) {
		score+=board[shape.i][shape.j];
	}
    if (board[shape.i][shape.j] == "clock") {
        gameTime=gameTime + 100
    }
    else if (board[shape.i][shape.j] == "medicine") {
        strikes+=1
    }
    else if (board[shape.i][shape.j] == "ice") {
        blockMonsters=10
    }
    if (monstersBoard[shape.i][shape.j] == "movingScore") {
        score+=50
        monstersBoard[shape.i][shape.j] = 0
        movingScore = null;

    }
	board[shape.i][shape.j] = 2;
    for (let i=0;i<monsters.length;i++) {
        checkIfStrike(monsters[i])
    }
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
    if (checkTime())
        return;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	// if (score == 50) {
	// 	window.clearInterval(interval);
	// 	window.alert("Game completed");
	// } 
    if (movingScore!=null)
        updateMovingScore();
    if (blockMonsters>0)
        blockMonsters--;
    else if (turnCounter%2==0)
        updateMonsterPosition();
    turnCounter+=1
    if (isGameOn)
		Draw();
	
}

function checkTime() {
    if (gameTime <= time_elapsed){
        if (score < 100){
            endGame(`You are better than ${score} points!`)
        }
        else{
            endGame("Winner!!!")
        }
        return true;
    }
    return false;
}

function endGame(str){
    Draw()
	isGameOn = false;
    audio.pause();
    audio.currentTime = 0;
	window.clearInterval(interval);
	context.beginPath();
	context.rect(canvas.width/4, canvas.height/4, canvas.height/2, canvas.height/2);
	context.fillStyle = "rgba(0,0,0,0.4)"; //color
	context.fill();
	context.font = "30px Arial";
	context.fillStyle = "red";
	context.textAlign = "center";
	context.fillText(str, canvas.width/2, canvas.height/2);
	context.strokeText(str, canvas.width/2, canvas.height/2);
}


function showOneScreen(screenID) {
    if (screenID=="settingsPage" && !isLoggedIn) {
        alert("Please log-in first!")
        return;
    }
	if(isGameOn){
        audio.pause();
        audio.currentTime = 0;
		isGameOn = false;
		clearInterval(interval);
	}
	if (screenID == "gameScreen"){
		document.getElementById("html").style.position = "fixed";
		document.getElementById("body").style.position = "fixed";
	}
	else{
		document.getElementById("html").style.position = "static";
		document.getElementById("body").style.position = "static";
	}
    if (isLoggedIn && screenID=="loginPage") {
        screenID="alreadyLoggedIn"
        document.getElementById("loggedInAs").innerHTML=loggedInUser
    }
	for (index = 0; index < allScreens.length; index++) {
		if (allScreens[index]==screenID) 
			document.getElementById(allScreens[index]).style.display= "block";
		else
			document.getElementById(allScreens[index]).style.display = "none";
	}
}

function newGame(){
    audio.pause();
    audio.currentTime = 0;
	clearInterval(interval);
	isGameOn = false;
	showOneScreen("settingsPage");	
}