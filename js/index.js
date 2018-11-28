var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
//var dx = Math.floor(Math.random()*5+1);
//var dy = Math.floor(Math.random()*5+1);
var dx = 5;
var dy = -5;
var ballRadius = 8;
var paddleHeight = 10;
var paddleWidth = 150;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var ballColor = "green";
var paddleColor = "#206020";
var brickColor = "#40bf40";
//var brickRowCount = 10;
var brickRowCount = 15;
var brickColumnCount = 16;
//var brickColumnCount = 15;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 3;
var brickOffsetTop = 47;
var brickOffsetLeft = 15;
var bricks = [];
var score = 0;
var lives = 100;
var birckBounce = new Audio("sound/brickBounce.mp3");
var gameOver = new Audio("sound/gameOver.mp3");
var paddleBounce = new Audio("sound/paddleBounce.mp3");
var backgroundTheme_3 = new Audio("sound/backgroundTheme_3.mp3");
var victory = new Audio("sound/victory.mp3");


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", backgroundMute, false);

window.onload = function(){
	backgroundTheme_3.play();
	backgrundTheme_3.loop = true;	
	}


for (c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (r = 0; r < brickRowCount; r++) {
    bricks[c][r] = {x: 0, y: 0, status: 1};
  }
}


function backgroundMute(e){
	if(e.keyCode == 77){
		muteBack = true;
		}
	
	}


function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = paddleColor;
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.closePath();

}

function drawBricks() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = brickColor;
        ctx.fill();
		ctx.strokeStyle = "black";
		ctx.stroke();
        ctx.closePath();
      }
    }
  }
}

/*function collisionDetection() {
  for (c = 0; c < brickColumCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
        }
      }
    }
  }
}*/


function collisionDetection() {
    for(c=0; c<brickColumnCount; c++){ 
        for(r=0; r<brickRowCount; r++){ 
            var b = bricks[c][r];
            
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
					dx = Math.floor(Math.random()*8+1);
                    dy = Math.floor(Math.random()*8+1);
					brickColor = randomColor();
					birckBounce.play();
                    b.status = 0;
                    score+=100;
                }
				
            
                    if(score >= (brickColumnCount * brickRowCount)*100){
						backgroundTheme_3.pause();
						victory.play();
						alert("YOU WIN, THANKS FOR PLAYING!\nYour Score is: "+score);
						document.location.reload();
                    }
            }
        }
    }
}
					
                
            
        
    


function drawScore(){
	ctx.font = "italic bold 24px Comic Sans MS";
	ctx.fillStyle = "#206020";
	ctx.fillText("Score: " +score, 21, 28);
	
	}
	
	function drawLives(){
		ctx.font = "italic bold 24px Comic Sans MS";
		ctx.fillStyle = "#206020";
		ctx.fillText("Lives: " + lives, 1124, 28);
		
		}


function randomColor() {
  var hex = "0123456789ABCDEF".split("");
  var hash = "#";
  for (var i = 0; i < 6; i++) {
    hash += hex[Math.floor(Math.random() * 16)];
  }
  return hash;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
	collisionDetection();
    drawBall();
  drawPaddle();
 drawScore();
drawLives();

  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    dx = -dx;
	paddleBounce.play();
	ballColor = randomColor();
  }

  if (y + dy < ballRadius) {
    dy = -dy;
	ballColor = randomColor();
	paddleBounce.play();
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
	  dx--;
	  dy--;
       paddleBounce.play();
      ballColor = randomColor();
      paddleColor = randomColor();
	  
    } else {
		lives--;
		gameOver.play();
		if(!lives){
      alert("GAME OVER!!\nYour Score is: " + score);
      document.location.reload();
		}
		else{
			alert("You have "+lives+" lives remaining.\nYour current score is: "+score);
			x = canvas.width/2;
			y = canvas.height -30;
			//dx = Math.floor(Math.random()*5+1);
           // dy = Math.floor(Math.random()*5+1);
			dx = 5;
			dy = -5;
			paddleX = (canvas.width - paddleWidth) / 2;
			}
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;

requestAnimationFrame(draw);
}

draw();
//setInterval(draw, 10);