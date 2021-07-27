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

export const loading = () => ({type: IS_LOADING})

// collectionReducer types
export const openCollection = (bool) => ({
    type: OPEN_COLLECTION,
    payload: bool
})
export const addToCollection = () => ({type: ADD_TO_COLLECTION})

// pagination types
export const pagination = () => ({type: PAGINATION})
export const openCurrentPage = (number) => ({
    type: CURRENT_PAGE,
    payload: number
})

export const playMusic = (bool) => ({type: IS_MUSIC_PLAY, payload: bool})
