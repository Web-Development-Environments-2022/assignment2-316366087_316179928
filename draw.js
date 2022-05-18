var clockImage = new Image();
clockImage.src = "photos/clock2.png";
var medicineImage = new Image();
medicineImage.src = "photos/pills.png";
var monsterImage = new Image()
monsterImage.src = "photos/monster.png"
var movingScoreImage = new Image()
movingScoreImage.src = "photos/bird.png"
var iceImage = new Image()
iceImage.src = "photos/ice.png"

function Draw() {
	// canvas.width = canvas.width; //clean board
	if (window.innerHeight > 800){
		canvas.height = window.innerHeight*0.75;
	}
	else{
		canvas.height = window.innerHeight*0.65;
	}
	canvas.width = canvas.height;
	lblScore.value = score;
	lblTime.value = gameTime - time_elapsed;
	lblStrikes.value = strikes;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * canvas.width/10 + canvas.width/20;
			center.y = j * canvas.height/10 + canvas.height/20;
			if (monstersBoard[i][j] == 1)
					drawImage(center, "monster");
            else if (monstersBoard[i][j] == "movingScore")
                drawImage(center, "movingScore")
			else if (board[i][j] == 2) { // pacmen
				drawPackman(center);
			} 
			else if (board[i][j] == 5 || board[i][j] == 15 || board[i][j] == 25) { //food
				if (monstersBoard[i][j] != 1)
					drawFood(center, board[i][j]);
				else
                    drawImage(center, "monster");
			} 
			else if (board[i][j] == 4) { //wall
				drawWalls(center);
			}
			else if (board[i][j] == "clock" || board[i][j] == "medicine" || board[i][j] == "ice"){				
				drawImage(center, board[i][j]);
			}
		}
	}
}

function drawImage(center, imageName){
    let drawingImage;
    if (imageName=="clock")
        drawingImage = clockImage
    else if (imageName == "medicine")
        drawingImage = medicineImage
    else if (imageName == "monster")
        drawingImage = monsterImage
    else if (imageName == "ice")
        drawingImage = iceImage
    else
        drawingImage = movingScoreImage
	context.drawImage(drawingImage,center.x-canvas.height/20,center.y-canvas.height/20,canvas.height/10,canvas.height/10)
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