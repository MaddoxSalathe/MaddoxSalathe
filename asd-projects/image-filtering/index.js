// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here

  applyFilter(reddify);

  // do not change the below line of code
  render($("#display"), image);
}


/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction) {
  for (var i = 0; i < image.length; i++) {
    for (var j = 0; j < image[i].length; j++) {
      
      // Step 2a: Retrieve the RGB string value from the image array
      var rgbString = image[i][j];

      // Step 2b: Convert the RGB string to an array of RGB numbers
      var rgbNumbers = rgbStringToArray(rgbString);
      
      // Step 2c: Alter the contents of the RGB numbers array

      //rgbNumbers[GREEN] = 255;
      filterFunction(rgbNumbers);
      // Step 2d: Convert the RGB numbers array back to a string
      var newRgbString = rgbArrayToString(rgbNumbers);

      // Step 2e: Assign the new RGB string back into the image array
      image[i][j] = newRgbString;
    }
  }
}

// TODO 7: Create the applyFilterNoBackground function


// TODO 5: Create the keepInBounds function


// TODO 3: Create reddify function
function reddify(array) {
  array[RED] = 200;
  //$("#apply").on("click", function () {
  //applyFilter(reddify);
};
  render($("#display"), image);


// TODO 6: Create more filter functions


// CHALLENGE code goes below here
