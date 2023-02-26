//Create grid through DOM
function createGrid() { // Updated function
  var grid = document.getElementById('grid');
  for (var i = 0; i < 256; i++) {
    square = document.createElement('div');
    square.className = 'square';
    square.id = 'square' + (i + 1);
    grid.appendChild(square);
    console.log(`Square ` + (i + 1) + ` created`);
  }
}

createGrid();

//Resize grid container
const container = document.querySelector('.container');
const resizeHandle = container.querySelector('#resize-handle');

let startX, startY, startWidth, startHeight;

resizeHandle.addEventListener('mousedown', function(e) {
  e.preventDefault();
  startX = e.clientX;
  startY = e.clientY;
  startWidth = parseInt(document.defaultView.getComputedStyle(container).width, 10);
  startHeight = parseInt(document.defaultView.getComputedStyle(container).height, 10);
  document.documentElement.addEventListener('mousemove', mousemove);
  document.documentElement.addEventListener('mouseup', mouseup);
});

function mousemove(e) {
  const width = startWidth + e.clientX - startX;
  const height = startHeight + e.clientY - startY;
  container.style.width = `${width}px`;
  container.style.height = `${height}px`;
}

function mouseup() {
  document.documentElement.removeEventListener('mousemove', mousemove);
  document.documentElement.removeEventListener('mouseup', mouseup);
}

// Listen for changes to the grid's size and adjust the size of the squares accordingly
window.addEventListener('resize', function() {
  const squares = document.querySelectorAll('.square');
  const gridWidth = parseInt(window.getComputedStyle(container).width, 10);
  const gridHeight = parseInt(window.getComputedStyle(container).height, 10);
  const squareSize = Math.min(gridWidth, gridHeight) / 16;

  squares.forEach((square) => {
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
  });
});
