import axios from "axios";

export const getPokemonName = async () => {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=300')
    return res.data.results
}

export const getPokemonList = async (pokemon) => {
    const newPokemonList = [...pokemon]
    for (let i = 0; i < pokemon.length; i++) {
        const res = await axios.get(pokemon[i].url)
        for (let j = i; j < newPokemonList.length; j++) {
            Object.assign(newPokemonList[j], {
                pokemon_data: {
                    abilities:
                        res.data.abilities.map(el => {
                            return {
                                name: el.ability.name,
                                // description: axios.get(el.ability.url).then(res => res.data.effect_entries[0].effect)
                            }
                        }),
                    type: res.data.types.map(el => el.type.name)
                },
                img_url: res.data.sprites.front_default,
                visible: false,
                active: true,
                isOpen: false
            })
        }
    }
    return newPokemonList
}
