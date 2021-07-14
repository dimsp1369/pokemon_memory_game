import axios from "axios";

export const getPokemons = async (setIsLoading) => {
    setIsLoading(true)
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=200')
    const pokemon = res.data.results
    for (let i = 0; i < pokemon.length; i++) {
        const data = await axios.get(pokemon[i].url)
        Object.assign(pokemon[i], {
            id: data.data.id,
            img_url: data.data.sprites.front_default,
            visible: false,
            active: true,
            isOpen: false
        })
    }
    setIsLoading(false)
    return pokemon
}

export const getPokemonCardData = async (card, setIsLoading) => {
    // const newCard = JSON.parse(JSON.stringify(card))
    setIsLoading(true)
    const abilityData = []
    const ability = await axios.get(`https://pokeapi.co/api/v2/pokemon/${card.id}/`).then(res => res.data.abilities.map(el => axios.get(`${el.ability.url}`)))
    await Promise.all(ability).then(res => res.map(el => abilityData.push(el.data)))
    const type = await axios.get(`https://pokeapi.co/api/v2/pokemon/${card.id}/`)
    Object.assign(card, {
        pokemon_data: {
            abilities: abilityData.map(el => {
                return {
                    name: el.name,
                    effect: el.effect_entries[1].effect
                }
            }),
            type: type.data.types.map(el => el.type.name)
        }
    })
    setIsLoading(false)
    return card
}