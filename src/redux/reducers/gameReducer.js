import {
    ADD_TO_COLLECTION, BACK_TO_MAINMENU,
    CHECK_MATCHES,
    CREATE_NEW_GAME,
    CURRENT_PAGE,
    FLIP_CARD,
    GET_CARD_DESCRIPTION,
    GET_POKEMONS,
    IS_LOADING,
    IS_MUSIC_PLAY,
    OPEN_COLLECTION,
    PAGINATION
} from "../types";
import {v4 as uuidv4} from "uuid";

const initialState = {
    pokemons: [],
    gameStack: [],
    wonCard: [],
    chosenCard: [],
    flips: null,
    isLoading: true,
    isMusicPlay: false,
    collection: {
        cardDescription: {},
    },
    pagination: {
        currentPage: 1,
        cardPerPage: 40,
        pageNumber: [],
        currentCards: []
    }
}

const reducer = (state = initialState, action) => {
    let newPokemonList = [...state.pokemons]
    let newGameStack = [...state.gameStack]
    let newChosenCard = [...state.chosenCard]
    let newWonCard = [...state.wonCard]
    let newCurrentCards = [...state.pagination.currentCards]
    let newFlips = state.flips;
    switch (action.type) {
        case IS_LOADING:
            return {...state, isLoading: true}
        case GET_POKEMONS:
            return {...state, pokemons: action.payload, isLoading: false}
        case CREATE_NEW_GAME:
            newGameStack = []
            const n = 10; // number of card
            while (newGameStack.length < n) {
                newGameStack.push(state.pokemons[Math.round(Math.random() * (state.pokemons.length - 1))])
            }
            //Sort the card array and adding the Id for solving duplicate issue
            const copyList = newGameStack.concat(newGameStack).sort(() => Math.random() - 0.5).map(el => {
                    return {_id: uuidv4(), ...el}
                }
            )
            newFlips = Math.ceil(copyList.length * action.payload.level)
            return {
                ...state,
                gameStack: copyList,
                wonCard: [],
                chosenCard: [],
                flips: newFlips
            }
        case FLIP_CARD:
            if (newChosenCard.length !== 2) {
                newGameStack.forEach((el, i) => {
                    if (i === action.payload.index) {
                        el.visible = true
                        el.active = false
                    }
                })
                newChosenCard.push(action.payload.pokemon)
                newFlips--
            }
            return {...state, gameStack: newGameStack, chosenCard: newChosenCard, flips: newFlips}
        case BACK_TO_MAINMENU:
            return {...state, gameStack: [], chosenCard: [], wonCard: [], flips: null}
        case CHECK_MATCHES:
            if (newChosenCard[0].name === newChosenCard[1].name) {
                newWonCard.push(newChosenCard[0])
                newWonCard.push(newChosenCard[1])
            } else {
                newGameStack.forEach(el => {
                    if (el === newChosenCard[0] || el === newChosenCard[1]) {
                        el.visible = false
                        el.active = true
                    }
                })
            }
            return {...state, gameStack: newGameStack, chosenCard: [], wonCard: newWonCard}
        case OPEN_COLLECTION:
            return {
                ...state,
                pagination: {...state.pagination, currentPage: 1, pageNumber: [], currentCards: []}
            }
        case ADD_TO_COLLECTION:
            for (let i = 0; i < newPokemonList.length; i++) {
                newWonCard.map(el => el.name === newPokemonList[i].name ? newPokemonList[i].isOpen = true : el)
            }
            return {...state, pokemons: newPokemonList}
        case GET_CARD_DESCRIPTION:
            console.log(action.payload)
            return {...state, isLoading: false, collection: {...state.collection, cardDescription: action.payload}}
        case PAGINATION:
            const newPageNumber = [...state.pagination.pageNumber]
            newCurrentCards = newPokemonList.slice(0, state.pagination.cardPerPage)
            for (let i = 1; i <= Math.ceil(state.pokemons.length / state.pagination.cardPerPage); i++) {
                newPageNumber.push(i)
            }
            return {
                ...state,
                pagination: {...state.pagination, pageNumber: newPageNumber, currentCards: newCurrentCards}
            }
        case CURRENT_PAGE:
            const indexOfLastCard = action.payload * state.pagination.cardPerPage;
            const indexOfFirstCard = indexOfLastCard - state.pagination.cardPerPage;
            newCurrentCards = newPokemonList.slice(indexOfFirstCard, indexOfLastCard)
            return {
                ...state,
                pagination: {...state.pagination, currentPage: action.payload, currentCards: newCurrentCards}
            }
        case IS_MUSIC_PLAY:
            return {...state, isMusicPlay: action.payload}
        default:
            return state
    }
}


export default reducer
