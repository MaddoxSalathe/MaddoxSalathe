/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    "leftArrow": 37,
    "upArrow": 38,
    "rightArrow": 39,
    "downArrow": 40,
  };

  // Game Item Objects
  var walker = {
    x: 0,
    y: 0,
    speedX: 0,
    speedY: 0,
  };

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL); // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown); // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp); // listen for keyup events

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /*
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
  }

  /*
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.leftArrow) {
      walker.speedX = -5; // set the speed to move left
    } else if (event.which === KEY.rightArrow) {
      walker.speedX = 5; // set the speed to move right
    } else if (event.which === KEY.downArrow) {
      walker.speedY = 5; // set the speed to move down
    } else if (event.which === KEY.upArrow) {
      walker.speedY = -5; // set the speed to move up
    }
  }

  function handleKeyUp(event) {
    if (event.which === KEY.leftArrow || event.which === KEY.rightArrow) {
      walker.speedX = 0; // reset the speed along the x-axis
    } else if (event.which === KEY.downArrow || event.which === KEY.upArrow) {
      walker.speedY = 0; // reset the speed along the y-axis
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem() {
    walker.x += walker.speedX; // update the x-coordinate based on the speed
    walker.y += walker.speedY; // update the y-coordinate based on the speed
  }

  function redrawGameItem() {
    $("#walker").css({
      left: walker.x,
      top: walker.y,
    });
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}
