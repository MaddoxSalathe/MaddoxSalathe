/* global $, sessionStorage*/

////////////////////////////////////////////////////////////////////////////////
///////////////////////// VARIABLE DECLARATIONS ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// HTML jQuery Objects
var board = $('#board');
var scoreElement = $('#score');
var highScoreElement = $('#highScore');

// game variables
var snake = {};
var apple = {};
var score = 0;

// Constant Variables
var ROWS = 20;
var COLUMNS = 20;
var SQUARE_SIZE = 20;
var KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

// interval variable required for stopping the update function when the game ends
var updateInterval;

// variable to keep track of the key (keycode) last pressed by the user
var activeKey;

////////////////////////////////////////////////////////////////////////////////
////////////////////////////// GAME SETUP //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// TODO 4: Add an event listener for the keydown event to enable keyboard inputs.
$(document).on('keydown', handleKeyDown);
$('body').on('keydown', handleKeyDown);

// start the game
init();

function init() {
  // initialize the snake's body as an empty Array
  snake.body = [];

  // make the first snakeSquare and set it as the head
  makeSnakeSquare(10, 10);
  snake.head = snake.body[0];

  // TODO 8: Initialize the first apple
  makeApple();

  // start update interval
  updateInterval = setInterval(update, 100);
}

////////////////////////////////////////////////////////////////////////////////
///////////////////////// PROGRAM FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/* 
 * On each update tick update each bubble's position and check for
 * collisions with the walls.
 */
function update() {
  moveSnake();

  if (hasHitWall() || hasCollidedWithSnake()) {
    handleGameover();
  }

  if (hasCollidedWithApple()) {
    handleAppleCollision();
  }

}

function moveSnake() {
  /* 
  TODO 11: Move each part of the snake's body such that it's body follows the head.
  
  HINT: To complete this TODO we must figure out the next direction, row, and 
  column for each snakeSquare in the snake's body. The parts of the snake are 
  stored in the Array snake.body and each part knows knows its current 
  column/row properties. 
  
  */


  //Before moving the head, check for a new direction from the keyboard input
  handleKeyDown();


  /* 
  TODO 6: determine the next row and column for the snake's head
  
  HINT: The snake's head will need to move forward 1 square based on the value
  of snake.head.direction which may be one of "left", "right", "up", or "down"
  */
  if (snake.head.direction === 'left') {
    snake.head.column = snake.head.column - 1;
  }
  repositionSquare(snake.head);

}

function handleKeyDown(event) {
  /* 
  TODO 5: Update snake.head.direction based on the value of activeKey.
  
  BONUS: Only allow direction changes to take place if the new direction is
  perpendicular to the current direction
  */
  $('body').on('keydown', handleKeyDown);
  if (activeKey === KEY.LEFT) {
    snake.head.direction = "left";
  }

  if (activeKey === KEY.RIGHT) {
    snake.head.direction = "right";
  }

  if (activeKey === KEY.UP) {
    snake.head.direction = "up";
  }

  if (activeKey === KEY.DOWN) {
    snake.head.direction = "down";
  }

  // FILL IN THE REST

    console.log(snake.head.direction);
}

function hasCollidedWithApple() {
  /* 
  TODO 9: Should return true if the snake's head has collided with the apple, 
  false otherwise
  
  HINT: Both the apple and the snake's head are aware of their own row and column
  */

  return snake.head.row === apple.row && snake.head.column === apple.column;
}

function handleAppleCollision() {
  score++;
  scoreElement.text("Score: " + score);

  apple.element.remove();
  makeApple();

  var tail = snake.body[snake.body.length - 1];
  var row = tail.row;
  var column = tail.column;

  /* 
  TODO 10: determine the location of the next snakeSquare based on the .row,
  .column and .direction properties of the snake.tail snakeSquare
  
  HINT: snake.tail.direction will be either "left", "right", "up", or "down".
  If the tail is moving "left", place the next snakeSquare to its right. 
  If the tail is moving "down", place the next snakeSquare above it.
  etc...
  */
  if (tail.direction === "left") {
    column++;
  } else if (tail.direction === "right") {
    column--;
  } else if (tail.direction === "up") {
    row++;
  } else if (tail.direction === "down") {
    row--;
  }

  makeSnakeSquare(row, column);
}

function hasCollidedWithSnake() {
  for (var i = 1; i < snake.body.length; i++) {
    if (snake.head.row === snake.body[i].row && snake.head.column === snake.body[i].column) {
      return true;
    }
  }
  return false;
}

function hasHitWall() {
  return (
    snake.head.row < 0 ||
    snake.head.row >= ROWS ||
    snake.head.column < 0 ||
    snake.head.column >= COLUMNS
  );
}

function handleGameover() {
  clearInterval(updateInterval);
  $(document).off('keydown', handleKeyDown);
  alert("Game Over! Your score is: " + score);
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function handleKeyDown(event) {
  activeKey = event.which;
  console.log(activeKey);
}

function makeSnakeSquare(row, column) {
  var snakeSquare = {}
  snakeSquare.element = $('<div>').addClass('snake').appendTo(board);
  snakeSquare.row = row;
  snakeSquare.column = column;
  repositionSquare(snakeSquare);

  if (snake.body.length === 0) {
    snakeSquare.element.attr('id', 'snake-head');
  }

  snake.body.push(snakeSquare);
  snake.tail = snakeSquare;
}

function repositionSquare(square) {
  var squareElement = square.element;
  var row = square.row;
  var column = square.column;

  var buffer = 20;

  squareElement.css('left', column * SQUARE_SIZE + buffer);
  squareElement.css('top', row * SQUARE_SIZE + buffer);
}

function makeApple() {
  apple.element = $('<div>').addClass('apple').appendTo(board);

  var randomPosition = getRandomAvailablePosition();
  apple.row = randomPosition.row;
  apple.column = randomPosition.column;

  repositionSquare(apple);
}

function getRandomAvailablePosition() {
  var spaceIsAvailable;
  var randomPosition = {};

  while (!spaceIsAvailable) {
    randomPosition.column = Math.floor(Math.random() * COLUMNS);
    randomPosition.row = Math.floor(Math.random() * ROWS);
    spaceIsAvailable = true;

    for (var i = 0; i < snake.body.length; i++) {
      if (snake.body[i].row === randomPosition.row && snake.body[i].column === randomPosition.column) {
        spaceIsAvailable = false;
        break;
      }
    }
  }

  return randomPosition;
}

function handleKeyDown(event) {
  activeKey = event.which;
  console.log(activeKey);
}

function calculateHighScore() {
  var highScore = sessionStorage.getItem("highScore") || 0;

  if (score > highScore) {
    sessionStorage.setItem("highScore", score);
    highScore = score;
    alert("New High Score!");
  }

  highScoreElement.text("High Score: " + highScore);
}

// call calculateHighScore() to initialize the high score from session storage
calculateHighScore();
