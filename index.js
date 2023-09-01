// Pokemon Project
// Here are some query pulls
generationArea = document.querySelector("#generation");
generateImage = document.querySelector("#generation-image");

// Okay I'm going to get started with the Generation fetch code (Which might make Josh's fetch part redundant but we'll cross that bridge when we get there)
// This is our first of two fetches -- This one will grab just a random Pokemon in general
// The second narrows it down to all of the information about said pokemon by adding a /PokemonName to the api fetch -- Domm
fetch("https://pokeapi.co/api/v2/pokemon?offset=100&limit=1000")
.then(response => response.json())
.then(data =>{
  //  console.log(data.results[0]) <!-- This pulls Bulbasaur so it's working :) --!>
generateRandomPokemon(data);
})

function generateRandomPokemon(data){
    randomPokeNumber = Math.floor(Math.random() * 1000); // This will select a random number between 0-20 which will be our pokemon ID
    randomPokemon = data.results[randomPokeNumber]
    console.log(randomPokemon);
    randomPokeName = data.results[randomPokeNumber].name
    // generateImage.src = randomPokePicture
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokeName}`)
    .then(response => response.json())
    .then(data =>{
        // This is the fetch area to grab the photo of said pokemon
      //  console.log(data); // This is just making sure we're grabbing the pokemon correctly
        generateImage.src = data.sprites.front_default;
});
}