import axios from "axios";
import {GET_POKEMONS, GET_CARD_DESCRIPTION} from "../types";


export const getPokemons = () => async dispatch => {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=400')
    const pokemons = res.data.results
    pokemons.map(async pokemon => {
        const data = await axios.get(pokemon.url)
        Object.assign(pokemon, {
            id: data.data.id,
            img_url: data.data.sprites.front_default,
            visible: false,
            active: true,
            isOpen: false
        })
    })
    dispatch({type: GET_POKEMONS, payload: pokemons})
}

export const openCardDescription = (card) => async dispatch => {
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
    dispatch({
        type: GET_CARD_DESCRIPTION,
        payload: card
    })
}
