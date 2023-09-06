// Pokemon Project
// Here are some query pulls -- Domm
const generationArea = document.querySelector("#generation");
const generateImage = document.querySelector("#generation-image");
const generateButton = document.querySelector("#generate-button");
const catchButton = document.getElementById("catch-button"); // Moved Hannans code here -- Domm
const pokeballs = document.getElementById("pokeballs");
const pokeballImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";  // Changed this to a variable for easier readability -- Domm
const roamArea = document.getElementById("roam");
let currentPokemonData = null; // This new addition saves our current data. -- Domm

/*
Hey guys, I made a ton of changes to make this code much cleaner and well-implemented. It's generally the same; however, Hannan's part had to be removed for the time being.
When we get together again, let's figure out how to do her part :) -- Domm
*/

// Function to generate a random Pokemon -- Domm
function generateRandomPokemon(data) {
  const randomPokeNumber = Math.floor(Math.random() * 1000); // Using floor so we get a full integer and don't have to worry about floats -- Domm
  const randomPokemon = data.results[randomPokeNumber]; // This will get us the Pokemon's number ID to use for the next fetch that fetches the exact Pokemon's info -- Domm
  const randomPokeName = randomPokemon.name; // Now we use this variable in our new fetch to get that Pokemon's sprite, name, weight, criminal record, etc. - Domm

  fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokeName}`) // Using ${} to input our variable name of the Pokemon's specific name -- Domm
    .then(response => response.json())
    .then(data => {
      currentPokemonData = data;
      generateImage.src = data.sprites.front_default;
    });
}

// Moved Josh's part into a function to make this much easier to read -- Domm
function ballCreation(data) {
  const createDiv = document.createElement("div");
  const createImg = document.createElement("img");
  const createStats = document.createElement("p");
  const createButton = document.createElement("button");
  const roamImg = document.createElement("img");
  
  createDiv.className = "teampokemon"; 
  createImg.src = data.sprites.front_default;
  createImg.className = "teampokemon-image";
  createStats.textContent = `Name: ${data.name} | Base Stat: ${data.stats[0].base_stat}`;
  createButton.textContent = "Release";
  roamImg.src = createImg.src;
  roamImg.className = "roam-image";
  createDiv.appendChild(createImg);
  createDiv.appendChild(createStats);
  createDiv.appendChild(createButton);
  pokeballs.appendChild(createDiv);

  roamArea.append(roamImg);
  // Start the animation after appending roamImg
  animateRoam();
  createButton.addEventListener("click", e => {
    createDiv.remove();
    roamImg.remove();
  });
}

// Function to capture the current Pokemon and generate a new random one.
function catchAndGenerateRandomPokemon(data) {
  if (currentPokemonData) {
    ballCreation(currentPokemonData);
  }

  generateRandomPokemon(data);
}

// Fetch the initial data.
fetch("https://pokeapi.co/api/v2/pokemon?offset=100&limit=1000")
  .then(response => response.json())
  .then(data => {
    generateRandomPokemon(data);

    generateButton.addEventListener('click', event => {
      generateRandomPokemon(data);
    });

    catchButton.addEventListener('click', event => {
      generateImage.src = pokeballImage;
      catchAndGenerateRandomPokemon(data);
    });
  });

function animateRoam() {
  console.log("animateRoam function called");
  const roamingImages = document.querySelectorAll(".roam-image");
  roamingImages.forEach(roamImg => {
    let x = Math.random() * (roamArea.clientWidth - roamImg.clientWidth);
    let y = Math.random() * (roamArea.clientHeight - roamImg.clientHeight);
    let xSpeed = 1;
    let ySpeed = 1;

    function step() {
      x += xSpeed;
      y += ySpeed;

      if (x + roamImg.clientWidth >= roamArea.clientWidth || x <= 0) {
        xSpeed *= -1;
      }
      if (y + roamImg.clientHeight >= roamArea.clientHeight || y <= 0) {
        ySpeed *= -1;
      }

      if (x < 0) {
        x = 0;
      } else if (x + roamImg.clientWidth > roamArea.clientWidth) {
        x = roamArea.clientWidth - roamImg.clientWidth;
      }

      if (y < 0) {
        y = 0;
      } else if (y + roamImg.clientHeight > roamArea.clientHeight) {
        y = roamArea.clientHeight - roamImg.clientHeight;
      }

      roamImg.style.left = x + 'px';
      roamImg.style.top = y + 'px';

      requestAnimationFrame(step);
    }

    step();
  });
}
