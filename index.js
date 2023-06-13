const listPokemons = document.getElementById('list-pokemons')
const shownPokemon = document.getElementById('shown-pokemon')

async function getPokemons() {
    const answer = await fetch('https://pokeapi.co/api/v2/pokemon')
    const data = await answer.json()
    console.log(data)

    return data.results
}

async function showPokemons() {
    const pokemons = await getPokemons()

    pokemons.forEach(async (pokemon) => {
        const button = document.createElement('button')
        button.textContent = pokemon.name

        button.addEventListener('click', async () => {
            const pokemonData = await fetch(pokemon.url).then(response => response.json())
            console.log(pokemonData)

            const imgFront = document.createElement('img')
            const imgBack = document.createElement('img')
            const pWeigth = document.createElement('p')
            const pHeight = document.createElement('p')
            const pSpecie = document.createElement('p')
            const pAbilities = document.createElement('p')
            const pType = document.createElement('p')
            const pName = document.createElement('h2')

            imgFront.src = pokemonData.sprites.front_default
            imgBack.src = pokemonData.sprites.back_default
            pWeigth.innerText = 'Weight: ' + pokemonData.weight
            pHeight.innerText = 'Height: ' + pokemonData.height
            pName.innerText = 'My name is: ' + pokemonData.name

            const speciesResponse = await fetch(pokemonData.species.url)
            const speciesData = await speciesResponse.json()

            pSpecie.innerText = 'Habitat: ' + speciesData.habitat.name

            pAbilities.innerText = 'Abilities: ' + pokemonData.abilities.map(a => a.ability.name).join(', ')

            pType.innerText = 'Type of Pokemon: ' + pokemonData.types.map(a => a.type.name).join(', ')

            while (shownPokemon.hasChildNodes()) {
                shownPokemon.removeChild(shownPokemon.lastChild)
            }

            shownPokemon.appendChild(pName)
            shownPokemon.appendChild(imgFront)
            shownPokemon.appendChild(imgBack)
            shownPokemon.appendChild(pWeigth)
            shownPokemon.appendChild(pHeight)
            shownPokemon.appendChild(pSpecie)
            shownPokemon.appendChild(pAbilities)
            shownPokemon.appendChild(pType)
        })

        listPokemons.appendChild(button)
    })
}

showPokemons()