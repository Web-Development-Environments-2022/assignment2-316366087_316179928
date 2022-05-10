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
var allScreens = ["welcome", "registrationScreen", "loginPage", "settingsPage", "gameScreen"];
var isGameOn = false;


var clockImage = new Image();
clockImage.src = "photos/packmanClock.JPG";



$(document).ready(function() {
    keyMap = {"up":38,"down":40,"left":37,"right":39};
    isLoggedIn = false;
	users = {"k":"k"}
	context = canvas.getContext("2d");
	showOneScreen("welcome")
});




function authenticate(user,pass){
	if (user.value in users){
		if (users[user.value] == pass.value){
            isLoggedIn = true;
			showOneScreen("settingsPage");
		}
	}

}


function Start() {
	if (isGameOn){
		return;
	}
	showOneScreen("gameScreen");
	isGameOn = true;
    strikes = 5;
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

function Draw() {
	// canvas.width = canvas.width; //clean board
	canvas.height = window.innerHeight*0.75;
	canvas.width = canvas.height;
	lblScore.value = score;
	lblTime.value = time_elapsed;
	lblStrikes.value = strikes;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * canvas.width/10 + canvas.width/20;
			center.y = j * canvas.height/10 + canvas.height/20;
			if (monstersBoard[i][j] == 1)
					drawMonster(center);
			else if (board[i][j] == 2) { // pacmen
				drawPackman(center);
			} 
			else if (board[i][j] == 5 || board[i][j] == 15 || board[i][j] == 25) { //food
				if (monstersBoard[i][j] != 1)
					drawFood(center, board[i][j]);
				else
					drawMonster(center);
			} 
			else if (board[i][j] == 4) { //wall
				drawWalls(center);
			}
			if (board[i][j] == "clock"){				
				drawClock(center);
			}
		}
	}
}

function drawClock(center){
	// context.drawImage(clockImage,0,0,50,50)
	// alert(center-canvas.height/20)
	context.drawImage(clockImage,center.x-canvas.height/20,center.y-canvas.height/20,canvas.height/10,canvas.height/10)
}

function drawPackman(center){
	context.beginPath();
	context.arc(center.x, center.y, canvas.height/20, (0.15 + packmanFace) * Math.PI, (1.85 +packmanFace) * Math.PI); // half circle
	context.lineTo(center.x, center.y);
	context.fillStyle = pac_color; //color
	context.fill(); //pacmen body
	context.beginPath();
	if (packmanFace == 1.5){
		context.arc(center.x - canvas.height/40, center.y + canvas.height/120, canvas.height/120, 0, 2 * Math.PI); // circle
	}
	else{
		context.arc(center.x + canvas.height/120, center.y - canvas.height/40, canvas.height/120, 0, 2 * Math.PI); // circle
	}
	context.fillStyle = "black"; //color
	context.fill(); //pacmen eye
}

function drawFood(center, foodType){
	context.beginPath();
	context.arc(center.x, center.y, canvas.height/40, 0, 2 * Math.PI); // circle
    let foodColor;
    switch (foodType) {
        case 5:
            context.fillStyle = fivePointsColor;
            break;
        case 15:
            context.fillStyle = fifteenPointsColor;
            break;
        case 25:
            context.fillStyle = twenyFivePointsColor;
            break;
            
    }
	context.fill();
}

function drawMonster(center){
	context.beginPath();
	context.rect(center.x - canvas.height/20, center.y - canvas.height/20, canvas.height/10, canvas.height/10);
	context.fillStyle = "purple"; //color
	context.fill();
}

function drawWalls(center){
	context.beginPath();
	context.rect(center.x - canvas.height/20, center.y - canvas.height/20, canvas.height/10, canvas.height/10);
	context.fillStyle = "grey"; //color
	context.fill();
}

function UpdatePosition() {
	updateMonsterPosition();
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
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	// if (score == 50) {
	// 	window.clearInterval(interval);
	// 	window.alert("Game completed");
	// } 
    if (isGameOn)
		Draw();
	
}

function updateMonsterPosition(){
	for (var i=0; i<numberOfMonsters;i++){
		let movement = calculateMonsterLocation(monsters[i]);
		setMonsterLocation(monsters[i], movement);
        
	}
}

function calculateMonsterLocation(monster){
	let i = shape.i - monster.i;
	let j = shape.j - monster.j;
	let neighbours = getMonsterNeighbours(monster);
	let movement;
	if (Math.abs(i) < Math.abs(j)){
		movement = tryEatPackmanHorizontaly(monster, i, j, neighbours);
	}
	else{
		movement = tryEatPackmanVerticaly(monster, i, j, neighbours);
	}
		
	
	
	return movement;
}

function tryEatPackmanHorizontaly(monster, i, j, neighbours){
	let movment;
	if (i > 0 && neighbours.includes("right")){
		movment = "right";
	}
	else if (i < 0 && neighbours.includes("left")){
		movment = "left";
	}
	else if (j > 0 && neighbours.includes("down")){
		movment = "down";
	}
	else if (j < 0 && neighbours.includes("up")){
		movment = "up";
	}
	else{
		movment = neighbours[Math.floor(Math.random() * neighbours.length)];
	}
	return movment;
}


function tryEatPackmanVerticaly(monster, i, j, neighbours){
	let movment;
	if (j > 0 && neighbours.includes("down")){
		movment = "down";
	}
	else if (j < 0 && neighbours.includes("up")){
		movment = "up";
	}
	else if (i > 0 && neighbours.includes("right")){
		movment = "right";
	}
	else if (i < 0 && neighbours.includes("left")){
		movment = "left";
	}
	else{
		movment = neighbours[Math.floor(Math.random() * neighbours.length)];
	}
	return movment;
}


function setMonsterLocation(monster,movement){
	monstersBoard[monster.i][monster.j] = 0;
	switch (movement){
		case "left":
			monster.i = monster.i - 1;
			break;
		case "right":
			monster.i = monster.i + 1;
			break;
		case "up":
			monster.j = monster.j - 1;
			break;
		case "down":
			monster.j = monster.j + 1;
			break;
	}
	monstersBoard[monster.i][monster.j] = 1;
    checkIfStrike(monster)
}

function checkIfStrike(monster) {
    if(monster.i==shape.i && monster.j == shape.j) {
        strikes--;
        score-=10;
        if (strikes ==0){
            // alert("GAME IS OVER!");
			endGame("Loser!");
		}
		else if (gameTime <= time_elapsed){
			if (score < 100){
				endGame(`You are better than ${score} points!`)
			}
			else{
				endGame("Winner!!!")
			}
		}
        else {
            board[shape.i][shape.j]=0
            addMonsters();
            pacmanLocation = findRandomEmptyCell(board);
            shape.i = pacmanLocation[0];
            shape.j = pacmanLocation[1];
            board[shape.i][shape.j]=2
        }
    }
}

function endGame(str){
	isGameOn = false;
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
function getMonsterNeighbours(monster){
	let arr = new Array();
	let i = monster.i
	let j = monster.j
	if ( i+1 <= 9 && monstersBoard[i+1][j] !=4 && monstersBoard[i+1][j] != 1)
		arr.push("right") 
	if ( j+1 <= 9 && monstersBoard[i][j+1] != 4 && monstersBoard[i][j+1] != 1)
		arr.push("down")	
	if ( j-1 >= 0 && monstersBoard[i][j-1] != 4 && monstersBoard[i][j-1] != 1)
		arr.push("up")	
	if ( i-1 >= 0 && monstersBoard[i-1][j] != 4 && monstersBoard[i-1][j] != 1)
		arr.push("left")	
	return arr;
}

function showOneScreen(screenID) {
	if(isGameOn){
		isGameOn = false;
		clearInterval(interval);
	}
	for (index = 0; index < allScreens.length; index++) {
		if (allScreens[index]==screenID) 
			document.getElementById(allScreens[index]).style.display= "block";
		else
			document.getElementById(allScreens[index]).style.display = "none";
	}
}

function newGame(){
	clearInterval(interval);
	isGameOn = false;
	showOneScreen("settingsPage");	
}