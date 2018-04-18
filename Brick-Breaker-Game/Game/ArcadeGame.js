var canvas;
var canvasContext;

var ballX;
var ballSpeedX;
var ballY;
var ballSpeedY;

var paddleOneY;
const PADDLE_HEIGHT = 75;
var paddleOneYTop;
var paddleOneYBottom;
const paddleX = 15;

var hP;
var gameOn;

const FRAMES_PER_SECOND = 30;
var interval;

var brick = {
  height: 10,
  width: 10,
  x: Math.floor(Math.random() * Math.floor(canvas.width)),
  y: Math.floor(Math.random() * Math.floor(canvas.width)),
  touched: null
}


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
  if (ballY > paddleOneYTop && ballY < paddleOneYBottom && ballX <= 25 && ballX >= 20) {
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
  colorRect(0,0, canvas.width, canvas.height, 'black');                             //Drawing canvas
  colorRect(paddleX,paddleOneYTop, 10, PADDLE_HEIGHT, 'white');            //Drawing paddle
  colorBall(ballX, ballY, 5, 'white');      //Drawing ball
  hPText(235, 30);
  colorRect(brick.x, brick.y, brick.width, brick.height, 'white');
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

function hPText(x, y) {
  canvasContext.font = "30px Impact";
  canvasContext.fillText("HP: " + hP, x, y);
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
    ballX = 145;
    ballSpeedX = 6;
    ballY = 145
    ballSpeedY = Math.floor((Math.random() * 10) + 7);
    paddleOneY = 125;
    hP--;
    console.log(hP);
    console.log("Reset")
  }
}

function set() {
  ballX = 145;
  ballSpeedX = 6;
  ballY = 145
  ballSpeedY = Math.floor((Math.random() * 10) + 7);
  paddleOneY = 125;
  hP = 1;
  var framesPerSecond = 30;
  gameOn = true;
  brick.x = Math.floor(Math.random() * Math.floor(canvas.width));
  brick.y = Math.floor(Math.random() * Math.floor(canvas.height));
}

function gameOver() {
  if (hP==0) {
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
