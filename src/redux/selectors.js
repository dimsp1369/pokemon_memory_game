import {createSelector} from "reselect";

/**
 * Returns the whole game state slice (`state.gameReducer`).
 * @param {Object} state - The root Redux state.
 * @returns {Object} The game state.
 */
export const allPokemons = state => state.gameReducer
/**
 * Returns `isGameOver` from the game state. Note: this field is not set by the reducer.
 * @param {Object} state - The root Redux state.
 * @returns {*} Always `undefined` with the current reducer.
 */
export const isGameOver = createSelector(allPokemons, state => state.isGameOver)
/**
 * Returns `isStartGame` from the game state. Note: this field is not set by the reducer.
 * @param {Object} state - The root Redux state.
 * @returns {*} Always `undefined` with the current reducer.
 */
export const isStartGame = createSelector(allPokemons, state => state.isStartGame)
/**
 * Returns the `isLoading` flag from the game state.
 * @param {Object} state - The root Redux state.
 * @returns {boolean}
 */
export const isLoading = createSelector(allPokemons, state => state.isLoading)
/**
 * Returns `isOpenCard` from the game state. Note: this field is not set by the reducer.
 * @param {Object} state - The root Redux state.
 * @returns {*} Always `undefined` with the current reducer.
 */
export const isOpenCard = createSelector(allPokemons, state => state.isOpenCard)
/**
 * Returns the Pokémon cards on the current collection page (`pagination.currentCards`).
 * @param {Object} state - The root Redux state.
 * @returns {Object[]}
 */
export const currentCards = createSelector(allPokemons, state => state.pagination.currentCards)
/**
 * Returns the card open in CollectionCard (`collection.cardDescription`).
 * @param {Object} state - The root Redux state.
 * @returns {Object}
 */
export const currentCard = createSelector(allPokemons, state => state.collection.cardDescription)
/**
 * Returns the collection page numbers (`pagination.pageNumber`).
 * @param {Object} state - The root Redux state.
 * @returns {number[]}
 */
export const pageNumber = createSelector(allPokemons, state => state.pagination.pageNumber)
/**
 * Returns the `isMusicPlay` flag from the game state.
 * @param {Object} state - The root Redux state.
 * @returns {boolean}
 */
export const isMusicPlay = createSelector(allPokemons, state => state.isMusicPlay)
/**
 * Returns the 20 shuffled board cards (`gameStack`).
 * @param {Object} state - The root Redux state.
 * @returns {Object[]}
 */
export const gameStack = createSelector(allPokemons, state => state.gameStack)
/**
 * Returns the remaining flips (null outside a game).
 * @param {Object} state - The root Redux state.
 * @returns {number|null}
 */
export const flips = createSelector(allPokemons, state => state.flips)
/**
 * Returns the matched Pokémon cards (`wonCard`).
 * @param {Object} state - The root Redux state.
 * @returns {Object[]}
 */
export const wonCard = createSelector(allPokemons, state => state.wonCard)
/**
 * Returns the 0–2 face-up cards awaiting a match check (`chosenCard`).
 * @param {Object} state - The root Redux state.
 * @returns {Object[]}
 */
export const chosenCard = createSelector(allPokemons, state => state.chosenCard)

