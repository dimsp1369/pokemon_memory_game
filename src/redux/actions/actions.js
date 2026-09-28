import {
    ADD_TO_COLLECTION, BACK_TO_MAINMENU,
    CHECK_MATCHES,
    CREATE_NEW_GAME,
    CURRENT_PAGE,
    FLIP_CARD,
    IS_LOADING, IS_MUSIC_PLAY, OPEN_COLLECTION,
    PAGINATION
} from "../types";

// gameReducer types
/**
 * Creates a `CREATE_NEW_GAME` action. The reducer deals 10 random Pokémon cards,
 * duplicates them into 10 pairs, shuffles the 20 cards into `gameStack` (tagging each
 * with a unique `_id`), clears `wonCard` / `chosenCard` and sets `flips = ceil(20 × level)`.
 *
 * @param {number} [level=2.5] - Flip multiplier: 2.5 Easy, 2 Medium, 1.5 Hard.
 * @returns {{type: string, payload: {level: number}}} The `CREATE_NEW_GAME` action.
 */
export const createNewGame = (level = 2.5) => ({
    type: CREATE_NEW_GAME,
    payload: {level}
})
/**
 * Creates a `FLIP_CARD` action. Unless two cards are already face-up, the reducer marks the
 * card at `index` in `gameStack` as visible and not active, pushes `pokemon` to `chosenCard`
 * and decrements `flips`.
 *
 * @param {number} index - Position of the card in `gameStack`.
 * @param {{name: string, url: string, id: number, img_url: string, visible: boolean, active: boolean, isOpen: boolean}} pokemon - The flipped Pokémon card.
 * @returns {{type: string, payload: {index: number, pokemon: Object}}} The `FLIP_CARD` action.
 */
export const flipCard = (index, pokemon) => ({
    type: FLIP_CARD,
    payload: {index, pokemon}
})
/**
 * Creates a `BACK_TO_MAINMENU` action. The reducer clears `gameStack`, `chosenCard` and
 * `wonCard`, and resets `flips` to `null` (leaving the game).
 *
 * @returns {{type: string}} The `BACK_TO_MAINMENU` action.
 */
export const backToMain = () => ({type: BACK_TO_MAINMENU})
/**
 * Creates a `CHECK_MATCHES` action. The reducer compares the two cards in `chosenCard` by name:
 * on a match both are added to `wonCard`; otherwise they are turned face-down and made clickable
 * again. `chosenCard` is then emptied. Expects exactly two chosen cards.
 *
 * @returns {{type: string}} The `CHECK_MATCHES` action.
 */
export const checkMatches = () => ({type: CHECK_MATCHES})

/**
 * Creates an `IS_LOADING` action, which sets `isLoading` to `true` in the game state.
 *
 * @returns {{type: string}} The `IS_LOADING` action.
 */
export const loading = () => ({type: IS_LOADING})

// collectionReducer types
/**
 * Creates an `OPEN_COLLECTION` action. The reducer resets pagination to page 1 and clears
 * `pageNumber` and `currentCards`; the payload is not read by the reducer.
 *
 * @param {boolean} bool - Flag passed as the payload (currently unused by the reducer).
 * @returns {{type: string, payload: boolean}} The `OPEN_COLLECTION` action.
 */
export const openCollection = (bool) => ({
    type: OPEN_COLLECTION,
    payload: bool
})
/**
 * Creates an `ADD_TO_COLLECTION` action. The reducer sets `isOpen = true` on every card in
 * `pokemons` whose name matches a card in `wonCard`, unlocking it in the collection.
 *
 * @returns {{type: string}} The `ADD_TO_COLLECTION` action.
 */
export const addToCollection = () => ({type: ADD_TO_COLLECTION})

// pagination types
/**
 * Creates a `PAGINATION` action. The reducer fills `pagination.pageNumber` with page numbers
 * (1..ceil(pokemons.length / cardPerPage)) and sets `currentCards` to the first page of cards.
 *
 * @returns {{type: string}} The `PAGINATION` action.
 */
export const pagination = () => ({type: PAGINATION})
/**
 * Creates a `CURRENT_PAGE` action. The reducer sets `pagination.currentPage` to `number` and
 * `currentCards` to that page's slice of `pokemons` (`cardPerPage` cards per page).
 *
 * @param {number} number - 1-based page number to open.
 * @returns {{type: string, payload: number}} The `CURRENT_PAGE` action.
 */
export const openCurrentPage = (number) => ({
    type: CURRENT_PAGE,
    payload: number
})

/**
 * Creates an `IS_MUSIC_PLAY` action, which sets `isMusicPlay` in the game state.
 *
 * @param {boolean} bool - Whether background music should play.
 * @returns {{type: string, payload: boolean}} The `IS_MUSIC_PLAY` action.
 */
export const playMusic = (bool) => ({type: IS_MUSIC_PLAY, payload: bool})
