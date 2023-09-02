// Pokemon Project
// Here are some query pulls
const generationArea = document.querySelector("#generation");
const generateImage = document.querySelector("#generation-image");
const generateButton = document.querySelector("#generate-button");
const catchButton = document.getElementById("catch-button"); // Moved Hannan's code up here for cleaner code
const pokeballs = document.getElementById("pokeballs");
const pokeballImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
/* 
Okay, I'm going to get started with the Generation fetch code.
This is our first of two fetches -- This one will grab just a random Pokemon in general.
The second narrows it down to all of the information about said Pokemon by adding a /PokemonName to the API fetch -- Domm 
*/
fetch("https://pokeapi.co/api/v2/pokemon?offset=100&limit=1000")
  .then(response => response.json())
  .then(data => {
    generateRandomPokemon(data); // This will start the code off by pulling a random Pokemon -- Domm
    generateButton.addEventListener('click', event => { // When pressed, we'll get a new Pokemon -- Domm
      generateRandomPokemon(data);
    });
    catchButton.addEventListener('click', event =>{ // Needed to add this to generate a new pokemon during the catch process -- Domm
        generateRandomPokemon(data);
    })

    function generateRandomPokemon(data) {
      const randomPokeNumber = Math.floor(Math.random() * 1000); // This will select a random number between 0-1000, which will be our Pokemon ID -- Domm
      const randomPokemon = data.results[randomPokeNumber];
      console.log(randomPokemon); // -- This is just a little thing for me to make sure I'm pulling the right data; will comment out when the code is complete -- Domm
      const randomPokeName = data.results[randomPokeNumber].name; // This is the NAME of the random Pokemon we've generated. We'll use this in the second fetch -- Domm
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokeName}`) // The more specific fetch request -- Domm
        .then(response => response.json())
        .then(data => {
          // This is the fetch area to grab the photo of said Pokemon
          generateImage.src = data.sprites.front_default;
          console.log(data.name); // Here is the name of that Pokemon
          // Adding Hannans part here -- Domm
          catchButton.addEventListener("click", event => {

            const pokeBall = document.createElement("img");
            pokeBall.src = pokeballImage; // Cleaned this up to be more readable -- Domm
            pokeballs.appendChild(pokeBall);
            pokeBall.addEventListener('click', event => {
                ballCreation(data);
            });
          });
          // createButton.addEventListener("click", e => {
          //     createDiv.remove()
          // })
        });
    }
  });



// This is Josh's code, I moved it into a function for better readability -- Domm
function ballCreation (data){
    const createImg = document.createElement("img");
    const createName = document.createElement("p");
    const createWeight = document.createElement("p");
    const createDiv = document.createElement("div");
    const createButton = document.createElement("button");
    createImg.src = data.sprites.front_default;
    createName.textContent = `Name: ${data.name}`;
    createWeight.textContent = `Base Stat: ${data.stats[0].base_stat}`;
    createButton.textContent = "Release";
    createDiv.append(createName, createImg, createWeight, createButton);
    team.append(createDiv);
    createDiv.className = "teampokemon";
}

// Here is the image URL of the pokeball for you Hannan -- Domm
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png
