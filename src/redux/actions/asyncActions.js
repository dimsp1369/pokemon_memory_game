import axios from "axios";
import {GET_POKEMONS, GET_CARD_DESCRIPTION} from "../types";


/**
 * Thunk that loads the first 400 Pokémon from PokeAPI (`/api/v2/pokemon/?limit=400`) and
 * dispatches `GET_POKEMONS` with them as the payload (the reducer stores them in `pokemons`
 * and sets `isLoading` to `false`).
 *
 * For each Pokémon a detail request to its `url` is started, which later assigns
 * `id`, `img_url` (front sprite), `visible: false`, `active: true` and `isOpen: false`
 * onto the object in place. These per-Pokémon requests are not awaited before the dispatch,
 * so the dispatched cards receive those fields asynchronously after `GET_POKEMONS`.
 *
 * @returns {function(Function): Promise<void>} Async thunk taking Redux `dispatch`.
 */
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

/**
 * Thunk that fetches details for a Pokémon card from PokeAPI (`/api/v2/pokemon/{id}/` and each
 * of its ability URLs), mutates the card in place by adding `pokemon_data` (ability names with
 * their `effect_entries[1].effect` text, and type names), then dispatches `GET_CARD_DESCRIPTION`
 * with the card as the payload (stored in `collection.cardDescription`, `isLoading` set to `false`).
 *
 * @param {{name: string, url: string, id: number, img_url: string, visible: boolean, active: boolean, isOpen: boolean, pokemon_data?: {abilities: Array<{name: string, effect: string}>, type: string[]}}} card - The Pokémon card to describe; `pokemon_data` is added by this thunk.
 * @returns {function(Function): Promise<void>} Async thunk taking Redux `dispatch`.
 */
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
