var canvas;
var canvasContext;

var ballX;
var ballSpeedX;
var ballY;
var ballSpeedY;

var paddleOneY;
var paddleOneYTop;
var paddleOneYBottom;
const PADDLEONE_X = 15;

var paddleTwoY;
var paddleTwoYTop;
var paddleTwoYCenter;
var paddleTwoYBottom;
const PADDLETWO_X = 275

const PADDLE_HEIGHT = 75;

var scoreLeft;
var scoreRight;

var gameOn;

const FRAMES_PER_SECOND = 30;
var interval;



window.onload = function()  {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  game();

}


function game() {
  console.log("Game On!");
  set();
  interval = setInterval(start, 1000/FRAMES_PER_SECOND);
}

function start() {
  drawEverything();
  moveEverything();
  reset();
  gameOver();
}

function moveEverything() {
  canvas.addEventListener('mousemove',
    function(evt) {
      var mousePosition = calculateMousePosition(evt);
      paddleOneYTop = mousePosition.y - PADDLE_HEIGHT/2;
      paddleOneYBottom = mousePosition.y + PADDLE_HEIGHT;
    }
  );

  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;
  paddleTwoYCenter = ballY;
  paddleTwoYTop = paddleTwoYCenter - (PADDLE_HEIGHT/2);
  paddleTwoYBottom = paddleTwoYCenter + (PADDLE_HEIGHT/2);

  if (ballY > paddleOneYTop && ballY < paddleOneYBottom && ballX <= 25 && ballX >= 20) {
    ballSpeedX = -ballSpeedX;
    console.log("Pad touched");
  } else if (ballY > paddleTwoYTop && ballY < paddleTwoYBottom && ballX >=275 && ballX <= 285) {
    ballSpeedX = -ballSpeedX;
    console.log("Pad touched");
  }
  if (ballX > canvas.width-5 || ballX < 5) {
    ballSpeedX = -ballSpeedX;
  } else if (ballY < 5 || ballY > canvas.height - 10) {
    ballSpeedY = -ballSpeedY;
  }

}

function drawEverything() {
  colorRect(0,0, canvas.width, canvas.height, 'black');    //Drawing canvas
  colorRect(PADDLEONE_X,paddleOneYTop, 10, PADDLE_HEIGHT, 'white');  //Drawing paddle 1
  colorRect(PADDLETWO_X,paddleTwoYTop, 10, PADDLE_HEIGHT, 'white');  //Drawing paddle 2
  colorBall(ballX, ballY, 5, 'white');      //Drawing ball
  Text(235, 30, scoreRight);
  Text(25, 30, scoreLeft);
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function colorBall(leftX, topY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(leftX, topY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}

function Text(x, y, score) {
  canvasContext.font = "14px Impact";
  canvasContext.fillText("Score: " + score, x, y);
}

function gameOverText(x, y) {
  canvasContext.font = "30px Impact";
  canvasContext.fillStyle = "white"
  canvasContext.fillText("GAME OVER", x, y);
}

function replayText(x, y) {
  canvasContext.font = "30px Impact";
  canvasContext.fillStyle = "black"
  canvasContext.fillText("REPLAY?", x, y);
}

function calculateMousePosition(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x:mouseX,
    y:mouseY
  }
}

function reset() {
  if(ballX < 5) {
    ballX = 100;
    ballSpeedX = 5;
    ballY = 100;
    ballSpeedY = Math.floor((Math.random() * 10) + 7);
    paddleOneY = 125;
    scoreRight++;
    console.log("Reset");
  } else if (ballX > canvas.width -5) {
    ballX = 100;
    ballSpeedX = -5;
    ballY = 100;
    ballSpeedY = Math.floor((Math.random() * 10) + 7);
    paddleOneY = 125;
    scoreLeft++;
    console.log("Reset");
  }
}

function set() {
  ballX = 145;
  ballSpeedX = 5 ;
  ballY = 145
  ballSpeedY = Math.floor((Math.random() * 10) + 7);
  paddleOneY = 125;
  gameOn = true;
  scoreLeft = 0;
  scoreRight = 0;
  paddleTwoYCenter = ballY;
  paddleTwoYTop = paddleTwoYCenter - (PADDLE_HEIGHT/2);
  paddleTwoYBottom = paddleTwoYCenter + (PADDLE_HEIGHT/2);
}

function gameOver() {
  if (scoreLeft == 5 || scoreRight == 5) {
    ballSpeedX = 0;
    ballSpeedY = 0;
    colorRect(0,0, canvas.width, canvas.height, 'black');
    gameOverText(85, 150);
    colorRect(99, 170, 110, 27, 'white');
    replayText(105, 195);
    gameOn = false;

    canvas.addEventListener('click',
      function() {
        while (!gameOn) {
          console.log("Reboot");
          gameOn = true;
          clearInterval(interval);
          game();
        }
      }
    );
  }
}
