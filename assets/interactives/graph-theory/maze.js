const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");
const CELL_SIZE = 10;
const MAZE_ROWS = 20;
const MAZE_COLUMNS = 30;
const MAZE_WIDTH = MAZE_COLUMNS * CELL_SIZE;
const MAZE_HEIGHT = MAZE_ROWS * CELL_SIZE;

// Set the canvas size based on the maze dimensions
canvas.width = MAZE_WIDTH;
canvas.height = MAZE_HEIGHT;

// Initialize the maze grid with walls
let maze = Array.from({ length: MAZE_ROWS }, () => Array(MAZE_COLUMNS).fill(true));

// Depth-First Search (DFS) algorithm to generate the maze
function generateMaze(x, y) {
  maze[x][y] = false;
  const directions = [
    { dx: 2, dy: 0 },
    { dx: -2, dy: 0 },
    { dx: 0, dy: 2 },
    { dx: 0, dy: -2 },
  ];
  shuffleArray(directions);
  for (const { dx, dy } of directions) {
    const nextX = x + dx;
    const nextY = y + dy;
    if (nextX >= 0 && nextX < MAZE_ROWS && nextY >= 0 && nextY < MAZE_COLUMNS && maze[nextX][nextY]) {
      maze[nextX - dx / 2][nextY - dy / 2] = false;
      generateMaze(nextX, nextY);
    }
  }
}

// Shuffle the elements in an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Breadth-First Search (BFS) algorithm to find the solution path
function findSolutionPath() {
  const queue = [{ x: 0, y: 0, path: [] }];
  const visited = new Set();

  while (queue.length > 0) {
    const { x, y, path } = queue.shift();

    if (x === MAZE_ROWS - 1 && y === MAZE_COLUMNS - 1) {
      // Solution found, mark the path
      path.forEach(({ x, y }) => {
        maze[x][y] = 2; // Mark the cells in the solution path (value 2)
      });
      return;
    }

    const neighbors = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
    ];

    for (const { dx, dy } of neighbors) {
      const nextX = x + dx;
      const nextY = y + dy;
      const cellVisited = visited.has(`${nextX}-${nextY}`);
      if (nextX >= 0 && nextX < MAZE_ROWS && nextY >= 0 && nextY < MAZE_COLUMNS && !cellVisited && !maze[nextX][nextY]) {
        queue.push({ x: nextX, y: nextY, path: [...path, { x: nextX, y: nextY }] });
        visited.add(`${nextX}-${nextY}`);
      }
    }
  }
}

// Function to ensure the entry and exit points have openings
function openEntryExitPoints() {
  maze[0][1] = false; // Entry point (top-left)
  maze[MAZE_ROWS - 1][MAZE_COLUMNS - 2] = false; // Exit point (bottom-right)
}

// Function to clear the solution path
function clearSolutionPath() {
  for (let x = 0; x < MAZE_ROWS; x++) {
    for (let y = 0; y < MAZE_COLUMNS; y++) {
      if (maze[x][y] === 2) {
        maze[x][y] = false;
      }
    }
  }
}

// Function to reset the maze
function resetMaze() {
  clearSolutionPath();  
}

// Function to reset the maze and draw a new maze
function regenMaze() {
  maze = Array.from({ length: MAZE_ROWS }, () => Array(MAZE_COLUMNS).fill(true));
  openEntryExitPoints(); // Ensure entry and exit points have openings
  generateMaze(1, 1);
}

// Function to draw the maze
function drawMaze() {
  ctx.clearRect(0, 0, MAZE_WIDTH, MAZE_HEIGHT);
  for (let x = 0; x < MAZE_ROWS; x++) {
    for (let y = 0; y < MAZE_COLUMNS; y++) {
      if (maze[x][y] === true) {
        // Fill the entire cell with black color (walls)
        ctx.fillStyle = "#131418";
        ctx.fillRect(y * CELL_SIZE, x * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      } else if (maze[x][y] === false) {
        // Fill the cell with white color (openings)
        ctx.fillStyle = "#5D595C";
        ctx.fillRect(y * CELL_SIZE, x * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      } else if (maze[x][y] === 2) {
        // Fill the solution path with a different color (value 2)
        ctx.fillStyle = "#ff5277";
        ctx.fillRect(y * CELL_SIZE, x * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
  }
}

// Generate the maze on page load
openEntryExitPoints(); // Ensure entry and exit points have openings
generateMaze(1, 1);
drawMaze();

// Event listener for the "Show Solution" button
const showSolutionButton = document.getElementById("showSolutionButton");
showSolutionButton.addEventListener("click", () => {
  findSolutionPath();
  drawMaze();
});

// Event listener for the "Reset" button
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", () => {
  resetMaze();
  drawMaze(); // Draw the new maze after resetting
});

// Event listener for the "Regen" button
const regenButton = document.getElementById("regenButton");
regenButton.addEventListener("click", () => {
  regenMaze();
  drawMaze(); // Draw the new maze after resetting
});