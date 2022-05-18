
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


function getMonsterNeighbours(monster){
	let arr = new Array();
	let i = monster.i
	let j = monster.j
	if ( i+1 <= 9 && monstersBoard[i+1][j] !=4 && monstersBoard[i+1][j] != 1 && monstersBoard[i+1][j] != "movingScore")
		arr.push("right") 
	if ( j+1 <= 9 && monstersBoard[i][j+1] != 4 && monstersBoard[i][j+1] != 1 && monstersBoard[i][j+1] != "movingScore")
		arr.push("down")	
	if ( j-1 >= 0 && monstersBoard[i][j-1] != 4 && monstersBoard[i][j-1] != 1 && monstersBoard[i][j-1] != "movingScore")
		arr.push("up")	
	if ( i-1 >= 0 && monstersBoard[i-1][j] != 4 && monstersBoard[i-1][j] != 1 && monstersBoard[i-1][j] != "movingScore")
		arr.push("left")	
	return arr;
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
		movment = neighbours[0];
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
		movment = neighbours[0];
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

function updateMovingScore() {
    let neighbours = getMonsterNeighbours(movingScore);
    let randomMovement = neighbours[Math.floor(Math.random() * neighbours.length)]
    let new_i = movingScore.i;
    let new_j = movingScore.j;
    switch (randomMovement) {
        case "up":
            new_j-=1
            break;
        case "down":
            new_j+=1
            break;
        case "left":
            new_i-=1
            break;
        case "right":
            new_i+=1
            break;
        default:
            break;
    }
    monstersBoard[movingScore.i][movingScore.j] = 0
    movingScore.i = new_i
    movingScore.j = new_j
    monstersBoard[movingScore.i][movingScore.j] = "movingScore"
}
