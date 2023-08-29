const dinosaur = document.getElementById("dinosaur");
const gameContainer = document.getElementById("game-container");
const adsContainer = document.getElementById("ads-container");
const adsContainer2 = document.getElementById("ads-container2");

const jumpHeight = 70;

let jumping = false;
let gameSpeed = 100;
let isGameOver = false;

const GO = document.createElement("h1");
GO.innerText = "Press 'space' to jump";
GO.style.position = "absolute";
GO.style.left = (370) + "px";
GO.style.top = (100) + "px";
gameContainer.appendChild(GO);

setTimeout(() => {
  GO.innerText = "";
}, 3000);

function checkCollisionsGlobal() {
    if (!jumping && !isGameOver) {
      checkCollision();
    }
  }

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !jumping && !isGameOver) {
    jumping = true;
    jump();
  }
  
  checkCollisionsGlobal();
});

document.getElementById("game-container").addEventListener("click", () => {
    if (!jumping && !isGameOver) {
      jumping = true;
      jump();
    }
  });

function jump() {
  let position = 10;
  const jumpInterval = setInterval(() => {
    if (position === 70) {
      clearInterval(jumpInterval);
      falling();
      checkCollisionsGlobal();
    } else {
      position++;
      dinosaur.style.bottom = position + "px";
      
    }
  }, 10);
}

function falling() {
  let position = 70;
  const fallInterval = setInterval(() => {
    if (position === 10) {
      clearInterval(fallInterval);
      jumping = false;
      checkCollisionsGlobal();
    } else {
      position--;
      dinosaur.style.bottom = position + "px";
      checkCollisionsGlobal();
    }
  }, 10);
}

function createObstacle() {
    const obstacle = document.createElement("img"); // Create an <img> element
    obstacle.classList.add("obstacle");
    obstacle.src = "car_convertible.png"; // Set the path to your image
    obstacle.style.left = gameContainer.offsetWidth + "px";
    gameContainer.appendChild(obstacle);
  
    const obstacleMoveInterval = setInterval(() => {
      if (isGameOver) {
        clearInterval(obstacleMoveInterval);
        return;
      }
  
      const obstacleLeft = obstacle.style.left;
      const newLeft = parseInt(obstacleLeft) - gameSpeed;
      obstacle.style.left = newLeft + "px";
  
      if (newLeft < -obstacle.offsetWidth) {
        clearInterval(obstacleMoveInterval);
        gameContainer.removeChild(obstacle);
      }
    }, 40);
  }
  

  function checkCollision() {
    const obstacles = document.querySelectorAll(".obstacle");
    const dinosaurRect = dinosaur.getBoundingClientRect();
  
    for (const obstacle of obstacles) {
      const obstacleRect = obstacle.getBoundingClientRect();
  
      if (
        dinosaurRect.left <= obstacleRect.right &&
        dinosaurRect.right >= obstacleRect.left &&
        dinosaurRect.bottom <= obstacleRect.bottom
      ) {
        showBoomImage(dinosaurRect.left, dinosaurRect.bottom);
        endGame();
      }
    }
  }
  
  function showBoomImage(x, y) {
    const boomImage = document.createElement("img");
    boomImage.src = "bakuhatsu.png"; // Path to your boom image
    GO.innerText = "Game Over";
    boomImage.style.position = "absolute";
    boomImage.style.left = (x-290) + "px";
    boomImage.style.top = (y-150) + "px";
    GO.style.position = "absolute";
    GO.style.left = (450) + "px";
    GO.style.top = (100) + "px";
    boomImage.style.zIndex = 307; // Ensure the image is displayed above everything
    gameContainer.appendChild(boomImage);
    gameContainer.appendChild(GO);
  
    // Remove the boom image after a brief delay
    setTimeout(() => {
      gameContainer.removeChild(boomImage);
    }, 3000); // Adjust the delay as needed
  }

  function endGame() {
    isGameOver = true;
    // Reload the page after a delay
    setTimeout(() => {
      location.reload();
    }, 3000); // Adjust the delay as needed
  }

setInterval(createObstacle, 3000);
setInterval(checkCollisionsGlobal, 10); // Check collisions globally at regular intervals
