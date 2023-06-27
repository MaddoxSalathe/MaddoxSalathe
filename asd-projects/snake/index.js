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

$(document).ready(function () {
  // TODO 4: Add an event listener for the keydown event to enable keyboard inputs.
  $(document).on('keydown', handleKeyDown);

  // start the game
  init();
});

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
    TODO 11: Move each part of the snake's body such that its body follows the head.

    HINT: To complete this TODO, we must figure out the next direction, row, and 
    column for each snakeSquare in the snake's body. The parts of the snake are 
    stored in the Array snake.body and each part knows its current 
    column/row properties. 
  */
  
  // Before moving the head, check for a new direction from the keyboard input
  

  // Move the head based on the current direction
  if (snake.head.direction === 'left') {
    snake.head.column = snake.head.column - 1;
  } else if (snake.head.direction === 'right') {
    snake.head.column = snake.head.column + 1;
  } else if (snake.head.direction === 'up') {
    snake.head.row = snake.head.row - 1;
  } else if (snake.head.direction === 'down') {
    snake.head.row = snake.head.row + 1;
  }

  repositionSquare(snake.head);
}

function handleKeyDown(event) {
activeKey = event.which;
console.log(activeKey);

  /* 
    TODO 5: Update snake.head.direction based on the value of activeKey.

    BONUS: Only allow direction changes to take place if the new direction is
    perpendicular to the current direction.
  */
  if (activeKey === KEY.LEFT && snake.head.direction !== 'right') {
    snake.head.direction = 'left';
  } else if (activeKey === KEY.RIGHT && snake.head.direction !== 'left') {
    snake.head.direction = 'right';
  } else if (activeKey === KEY.UP && snake.head.direction !== 'down') {
    snake.head.direction = 'up';
  } else if (activeKey === KEY.DOWN && snake.head.direction !== 'up') {
    snake.head.direction = 'down';
  }
}

function hasCollidedWithApple() {
  /* 
    TODO 9: Should return true if the snake's head has collided with the apple, 
    false otherwise.
  
    HINT: Both the apple and the snake's head are aware of their own row and column.
  */
  return snake.head.row === apple.row && snake.head.column === apple.column;
}

function handleAppleCollision() {
  score++;
  scoreElement.text('Score: ' + score);

  apple.element.remove();
  makeApple();

  var tail = snake.body[snake.body.length - 1];
  var row = tail.row;
  var column = tail.column;

  /* 
    TODO 10: Determine the new row and column for the new tail square.

    HINT: Depending on the current direction of the snake, the new tail square 
    will be positioned to the left, right, above, or below the current tail 
    square. Use the row and column variables to set the new values.
  */
  if (tail.direction === 'left') {
    column++;
  } else if (tail.direction === 'right') {
    column--;
  } else if (tail.direction === 'up') {
    row++;
  } else if (tail.direction === 'down') {
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
  alert('Game Over! Your score is: ' + score);
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function makeSnakeSquare(row, column) {
  var snakeSquare = {
    element: $('<div>').addClass('snake').appendTo(board),
    row: row,
    column: column
  };
  
  repositionSquare(snakeSquare);

  if (snake.body.length === 0) {
    snakeSquare.element.attr('id', 'snake-head');
  }

  snake.body.push(snakeSquare);
  snake.tail = snakeSquare;
}

function makeApple() {
  apple.element = $('<div>').addClass('apple').appendTo(board);

  var randomPosition = getRandomAvailablePosition();
  apple.row = randomPosition.row;
  apple.column = randomPosition.column;

  repositionSquare(apple);
}

function init() {
  snake.body = [];
  makeSnakeSquare(10, 10);
  snake.head = snake.body[0];

  makeApple();

  updateInterval = setInterval(update, 100);
}

function repositionSquare(square) {
  var squareElement = square.element;
  var row = square.row;
  var column = square.column;
  var buffer = 20;

  squareElement.css('left', column * SQUARE_SIZE + buffer);
  squareElement.css('top', row * SQUARE_SIZE + buffer);
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

function calculateHighScore() {
  var highScore = sessionStorage.getItem('highScore') || 0;

  if (score > highScore) {
    highScore = score;
    sessionStorage.setItem('highScore', highScore);
  }

  return highScore;
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////// EVENT HANDLERS //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

highScoreElement.text('High Score: ' + calculateHighScore());
