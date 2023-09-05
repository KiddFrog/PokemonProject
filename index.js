// Pokemon Project
// Here are some query pulls -- Domm
const generationArea = document.querySelector("#generation");
const generateImage = document.querySelector("#generation-image");
const generateButton = document.querySelector("#generate-button");
const catchButton = document.getElementById("catch-button"); // Moved Hannans code here -- Domm
const pokeballs = document.getElementById("pokeballs");
const pokeballImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";  // Changed this to a varaiable for easier readability -- Domm

let currentPokemonData = null; // This new addition saves our current data. -- Domm

/*
Hey guys, I made a ton of changes to make this code much cleaner, and well implimented. It's generally the same however Hannans part had to be removed for the time being.
When we get together again let's figure out how to do her part :) -- Domm
*/

// Function to generate a random Pokemon -- Domm
function generateRandomPokemon(data) {
  const randomPokeNumber = Math.floor(Math.random() * 1000); // Using floor so we get a full integer and don't have to worry about floats -- Domm
  const randomPokemon = data.results[randomPokeNumber]; // This will get us the pokemons number ID to use for the next float that fetches the exact pokemons info -- Domm
  // console.log(randomPokemon);
  const randomPokeName = randomPokemon.name; // Now we use this variable in our new fetch to get that pokemons sprite, name, weight, criminal record, etc - Domm
  
  fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokeName}`) // Using ${} to input our variable name of the Pokemons specific name -- Domm
    .then(response => response.json())
    .then(data => {
      currentPokemonData = data; // You wouldn't believe how long this took to figure out, but doing it this way we can keep the data CONSISTENT!! -- Domm
      generateImage.src = data.sprites.front_default; // front_default is what they called the main sprite lol - Domm
      console.log(data.name);
    });
}

// Moved Josh's part into a function to make this much easier to read -- Domm
function ballCreation(data) {
  const createDiv = document.createElement("div");
  const createImg = document.createElement("img");
  const createStats = document.createElement("p");
  const createButton = document.createElement("button");
  
  
  createDiv.className = "teampokemon"; 
  createImg.src = data.sprites.front_default;
  createImg.className = "teampokemon-image"; // Add a class to the image element so we can animate it in CSS -- Domm
  createStats.textContent = `Name: ${data.name} | Base Stat: ${data.stats[0].base_stat}`; // Hope you dont mind Josh I made this one line to make it cleaner -- Domm
  createButton.textContent = "Release";
  
  createDiv.appendChild(createImg);
  createDiv.appendChild(createStats);
  createDiv.appendChild(createButton);
  pokeballs.appendChild(createDiv);
  createButton.addEventListener("click", e => {
    createDiv.remove()
})
}

// Function to capture the current Pokemon and generate a new random one. This was the only way to get this to work with our current code -- Domm
function catchAndGenerateRandomPokemon(data) {
  if (currentPokemonData) {
    ballCreation(currentPokemonData); // Hannan I'm trying something new out here to make things work. Feel free to try something else here if you like -- Domm
  }

  generateRandomPokemon(data);
}

// Fetch the initial data. I moved this into it's own section entirely for the sake of being clean -- Domm
fetch("https://pokeapi.co/api/v2/pokemon?offset=100&limit=1000") // We're fetching a list of the pokemon from 0-1000 (There is more believe it or not lol) -- Domm
  .then(response => response.json())
  .then(data => {
    generateRandomPokemon(data);

    generateButton.addEventListener('click', event => { // This is it's OWN function for THIS part and for the intial creation -- Domm
      generateRandomPokemon(data);
    });

    catchButton.addEventListener('click', event => {
      generateImage.src = pokeballImage;
      catchAndGenerateRandomPokemon(data); // Different than the generateRandomPokemon(data) function because it would screw up which pokemon displayed if we did it using that function -- Domm
    });
  });



  // Hannan I moved your code down here and commented it out since we changed tactics -- Domm
  // If you want to re-impliment it, you'll have to restructure it to fit the current code -- Domm
//   const catchButton = document.getElementById("catch-button")
// catchButton.addEventListener( "click", event =>{
//     const img = document.createElement("img")
// img.src = " https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
// pokeballs.appendChild(img)


//     generateRandomPokemon(data)