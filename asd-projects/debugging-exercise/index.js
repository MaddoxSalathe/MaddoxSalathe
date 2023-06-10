$(document).ready(function() {
    // initialization
    var doubleMaxSpeed = 5;
    var maxCircles = 10;
    var $board = $('#board');
    var boardWidth = $board.width();
    var boardHeight = $board.height();
    var circles = [];
    var circleRadius = 10;
  
    // startup
    for (var i = 0; i < maxCircles; i++) {
      var newId = getId(i);
      var newCircle = makeCircle(newId);
      circles.push(newCircle);
  
      addNewCircleElement(newCircle, newId);
    }
  
    setInterval(update, 1000 / 60);
  
    // startup helper functions
    function makeCircle(id) {
      var circle = {};
      var maxX = boardWidth - circleRadius * 2;
      var maxY = boardHeight - circleRadius * 2;
  
      circle.id = "#" + id;
      circle.x = Math.random() * maxX + circleRadius;
      circle.y = Math.random() * maxY + circleRadius;
      circle.speedX = decideSpeed();
      circle.speedY = decideSpeed();
  
      return circle;
    }
  
    function decideSpeed() {
      return Math.random() * doubleMaxSpeed / 2 - doubleMaxSpeed;
    }
  
    function getId(number) {
      return "circle" + number;
    }
  
    function addNewCircleElement(circle, id) {
      var $circle = $('<div>')
        .attr('id', id)
        .css('left', circle.x)
        .css('top', circle.y)
        .addClass("circle");
  
      $circle.appendTo($board);
    }
  
    // update function
    function update() {
      for (var i = 0; i < maxCircles; i++) {
        var circle = circles[i];
  
        moveCircle(circle);
        bounceCircle(circle);
        updateCircleOnScreen(circle);
      }
    }
  
    // update helper functions
    function moveCircle(circle) {
      circle.x += circle.speedX;
      circle.y += circle.speedY;
    }
  
    function bounceCircle(circle) {
      if (circle.x < 0 || circle.x > boardWidth - circleRadius * 2) {
        circle.speedX *= -1;
      }
  
      if (circle.y < 0 || circle.y > boardHeight - circleRadius * 2) {
        circle.speedY *= -1;
      }
    }
  
    function updateCircleOnScreen(circle) {
      $(circle.id).css('left', circle.x);
      $(circle.id).css('top', circle.y);
    }
  });
  