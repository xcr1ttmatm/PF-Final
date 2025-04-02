// Get the icon element, game area, and finish element
const icon = document.getElementById("icon");
const gameArea = document.getElementById("gameArea");
const finish = document.getElementById("finish");

// Initial position of the icon
let iconX = 10;
let iconY = 10;
const moveSpeed = 10; // How many pixels the icon moves per key press

// Generate random rocks (50 rocks)
function generateRocks(numRocks) {
  // Remove any existing rocks
  const existingRocks = document.querySelectorAll(".rock");
  existingRocks.forEach((rock) => rock.remove());

  // Add new rocks to the game area
  for (let i = 0; i < numRocks; i++) {
    const rock = document.createElement("div");
    rock.classList.add("rock");

    // Set random position within the game area, ensuring they are within bounds
    const rockX = Math.floor(Math.random() * (gameArea.clientWidth - 50));
    const rockY = Math.floor(Math.random() * (gameArea.clientHeight - 50));

    rock.style.top = `${rockY}px`;
    rock.style.left = `${rockX}px`;

    gameArea.appendChild(rock);
  }
}

// Initial generation of 50 rocks
generateRocks(50);

// Move the icon based on key press
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp") {
    iconY -= moveSpeed;
  } else if (event.key === "ArrowDown") {
    iconY += moveSpeed;
  } else if (event.key === "ArrowLeft") {
    iconX -= moveSpeed;
  } else if (event.key === "ArrowRight") {
    iconX += moveSpeed;
  }

  // Update the position of the icon
  icon.style.top = `${iconY}px`;
  icon.style.left = `${iconX}px`;

  // Check for collisions with rocks
  checkCollisions();

  // Check if the icon is touching the game area border
  checkBorderCollision();

  // Check if the icon reaches the finish point
  checkFinish();
});

// Function to check if the icon collides with any rocks
function checkCollisions() {
  const rocks = document.querySelectorAll(".rock");

  rocks.forEach((rock) => {
    const rockRect = rock.getBoundingClientRect();
    const iconRect = icon.getBoundingClientRect();

    // Check if the icon intersects with any rock
    if (
      iconRect.top < rockRect.bottom &&
      iconRect.bottom > rockRect.top &&
      iconRect.left < rockRect.right &&
      iconRect.right > rockRect.left
    ) {
      alert("Game Over! You hit a rock!");
      resetGame();
    }
  });
}

// Function to check if the icon is touching the game area border
function checkBorderCollision() {
  const gameAreaRect = gameArea.getBoundingClientRect();
  const iconRect = icon.getBoundingClientRect();

  // Check if the icon exceeds the game area's borders
  if (
    iconRect.top < gameAreaRect.top || // Icon above the top border
    iconRect.bottom > gameAreaRect.bottom || // Icon below the bottom border
    iconRect.left < gameAreaRect.left || // Icon to the left of the left border
    iconRect.right > gameAreaRect.right // Icon to the right of the right border
  ) {
    alert("Game Over! You hit the border!");
    resetGame();
  }
}

// Function to check if the icon reaches the finish point
function checkFinish() {
  const finishRect = finish.getBoundingClientRect();
  const iconRect = icon.getBoundingClientRect();

  // Check if the icon reaches the finish point
  if (
    iconRect.top < finishRect.bottom &&
    iconRect.bottom > finishRect.top &&
    iconRect.left < finishRect.right &&
    iconRect.right > finishRect.left
  ) {
    alert("You win! You've reached the finish!");
    resetGame();
  }
}

// Function to reset the game
function resetGame() {
  iconX = 10;
  iconY = 10;
  icon.style.top = `${iconY}px`;
  icon.style.left = `${iconX}px`;

  // Re-generate rocks after reset
  generateRocks(50);
}
