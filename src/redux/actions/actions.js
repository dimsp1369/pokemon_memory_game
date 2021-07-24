import {
    ADD_TO_COLLECTION,
    BACK_TO_MAINMENU,
    CHECK_MATCHES, CLOSED_CARD,
    CREATE_NEW_GAME,
    CURRENT_PAGE,
    FLIP_CARD,
    GAME_OVER, IS_LOADING,
    OPEN_COLLECTION, PAGINATION
} from "../types";

// gameReducer types
export const createNewGame = (level = 2) => ({
    type: CREATE_NEW_GAME,
    payload: {level}
})
export const flipCard = (index, pokemon) => ({
    type: FLIP_CARD,
    payload: {index, pokemon}
})
export const backToMain = () => ({type: BACK_TO_MAINMENU})
export const checkMatches = () => ({type: CHECK_MATCHES})
export const gameOver = () => ({type: GAME_OVER})
export const loading = () => ({type: IS_LOADING})

// collectionReducer types
export const openCollection = (bool) => ({
    type: OPEN_COLLECTION,
    payload: bool
})
export const addToCollection = () => ({type: ADD_TO_COLLECTION})
export const closedCardDescription = () => ({type: CLOSED_CARD})


// pagination types
export const pagination = () => ({type: PAGINATION})
export const openCurrentPage = (number) => ({
    type: CURRENT_PAGE,
    payload: number
})
