import {
    BACK_TO_MAINMENU,
    CHECK_MATCHES,
    CREATE_NEW_GAME, CURRENT_PAGE,
    FLIP_CARD,
    GAME_OVER,
    GET_POKEMONS, GET_CARD_DESCRIPTION,
    OPEN_COLLECTION, PAGINATION, ADD_TO_COLLECTION, CLOSED_CARD, IS_LOADING
} from "../types";
import {v4 as uuidv4} from "uuid";

const initialState = {
    pokemons: [],
    gameStack: [],
    wonCard: [],
    chosenCard: [],
    flips: null,
    isStartGame: false,
    isGameOver: false,
    isLoading: true,
    isOpenCard: false,
    collection: {
        cardDescription: {},
        isCollection: false
    },
    pagination: {
        currentPage: 1,
        cardPerPage: 50,
        pageNumber: [],
        currentCards: []
    }
}

const gameReducer = (state = initialState, action) => {
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
                isGameOver: false,
                isStartGame: true,
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
            return {...state, gameStack: [], chosenCard: [], wonCard: [], flips: null, isStartGame: false}
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
        case GAME_OVER:
            return {...state, isGameOver: true}
        case OPEN_COLLECTION:
            return {
                ...state,
                collection: {...state.collection, isCollection: action.payload},
                pagination: {...state.pagination, currentPage: 1, pageNumber: [], currentCards: []}
            }
        case ADD_TO_COLLECTION:
            for (let i = 0; i < newPokemonList.length; i++) {
                newWonCard.map(el => el.name === newPokemonList[i].name ? newPokemonList[i].isOpen = true : el)
            }
            return {...state, pokemons: newPokemonList}
        case GET_CARD_DESCRIPTION:
            return {...state, isOpenCard: true, collection: {...state.collection, cardDescription: action.payload}}
        case CLOSED_CARD:
            return {...state, isOpenCard: false, collection: {...state.collection, cardDescription: {}}}
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
            const indexOfLastCard = state.pagination.currentPage * state.pagination.cardPerPage;
            const indexOfFirstCard = indexOfLastCard - state.pagination.cardPerPage;
            newCurrentCards = newPokemonList.slice(indexOfFirstCard, indexOfLastCard)
            return {
                ...state,
                pagination: {...state.pagination, currentPage: action.payload, currentCards: newCurrentCards}
            }
        default:
            return state
    }
}

export default gameReducer
