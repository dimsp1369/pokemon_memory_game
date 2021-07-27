import {createSelector} from "reselect";

export const allPokemons = state => state.gameReducer
export const isGameOver = createSelector(allPokemons, state => state.isGameOver)
export const isStartGame = createSelector(allPokemons, state => state.isStartGame)
export const isLoading = createSelector(allPokemons, state => state.isLoading)
export const isOpenCard = createSelector(allPokemons, state => state.isOpenCard)
export const currentCards = createSelector(allPokemons, state => state.pagination.currentCards)
export const currentCard = createSelector(allPokemons, state => state.collection.cardDescription)
export const pageNumber = createSelector(allPokemons, state => state.pagination.pageNumber)
export const isMusicPlay = createSelector(allPokemons, state => state.isMusicPlay)
export const gameStack = createSelector(allPokemons, state => state.gameStack)
export const flips = createSelector(allPokemons, state => state.flips)
export const wonCard = createSelector(allPokemons, state => state.wonCard)
export const chosenCard = createSelector(allPokemons, state => state.chosenCard)

