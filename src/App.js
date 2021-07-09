import './App.css';
import React, {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {getPokemonList, getPokemonName} from "./data/Api";
import GamePage from "./components/GamePage";
import MainMenu from "./components/MainMenu";
import GameOverPage from "./components/GameOverPage";
import CollectionPage from "./components/CollectionPage";
import {crossBtn} from "./assets/img/img";
import Loader from "./components/Loader";

function App() {
    //Data array
    const [pokemon, setPokemon] = useState([])
    const [pokemonList, setPokemonList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [cardPerPage] = useState(50)
    const [pageNumber, setPageNumber] = useState([])


    //Game array
    const [pokemonCard, setPokemonCard] = useState([])
    const [chosenCard, setChosenCard] = useState([])
    const [wonCard, setWonCard] = useState([])
    const [flips, setFlips] = useState(null)
    //Fetching
    const [isLoading, setIsLoading] = useState(false)
    const [startToggle, setStartToggle] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [collectionToggle, setCollectionToggle] = useState(false)

    //Get currentCard
    const indexOfLastCard = currentPage * cardPerPage;
    const indexOfFirstCard = indexOfLastCard - cardPerPage;
    const currentCards = pokemonList.slice(indexOfFirstCard, indexOfLastCard)


    //Get the Pokemon's Name
    useEffect(() => {
        setIsLoading(true)
        getPokemonName().then(data => setPokemon(data))
    }, [])

    //Get the Pokemon List with data
    useEffect(() => {
        getPokemonList(pokemon).then(data => {
            setPokemonList(data)
            setIsLoading(false)
        })
     }, [pokemon])


    //Activate the function after to filling the choseCard array
    useEffect(() => {
        if (chosenCard.length === 2) checkMatches()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chosenCard])


    useEffect(() => {
        openCardCollection()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wonCard])

    const createGame = (level = 2.5) => {
        setGameOver(false)
        const n = 10; // number of card
        const newList = []
        while (newList.length < n) {
            newList.push(pokemonList[Math.round(Math.random() * (pokemonList.length - 1))])
        }
        const copyList = newList.concat(newList).sort(() => Math.random() - 0.5).map(el => {
            return {id: uuidv4(), ...el}
        }) //Sort the card array and adding the Id for solving duplicate issue
        setWonCard([])
        setChosenCard([])
        setPokemonCard(copyList)
        setFlips(Math.ceil(copyList.length * level))

    }


    const flipCard = (index, card) => {
        const newCard = [...pokemonCard]
        const newChosenCard = [...chosenCard]
        let newFlips = flips
        if (newChosenCard.length !== 2) {
            newCard.forEach((el, i) => {
                if (i === index) {
                    el.visible = true
                    el.active = false
                }
            })
            newChosenCard.push(card)
            newFlips--
        }
        setPokemonCard(newCard)
        setChosenCard(newChosenCard)
        setFlips(newFlips)
    }

    const checkMatches = () => {
        const newWonCard = [...wonCard]
        const newChosenCard = [...chosenCard]
        const newCard = [...pokemonCard]
        if (newChosenCard[0].name === newChosenCard[1].name) {
            newWonCard.push(newChosenCard[0])
            newWonCard.push(newChosenCard[1])
            setChosenCard([])
        } else {
            setTimeout(() => {
                newCard.forEach(el => {
                    if (el === newChosenCard[0] || el === newChosenCard[1]) {
                        el.visible = false
                        el.active = true
                    }
                })
                setPokemonCard(newCard)
                setChosenCard([])
            }, 500)
        }
        setWonCard(newWonCard)

    }

    const openCardCollection = () => {
        const newList = [...pokemonList]
        for (let i = 0; i < newList.length; i++) {
            wonCard.map(el => el.name === newList[i].name ? newList[i].isOpen = true : el)
        }
        setPokemonList(newList)
    }

    //Activator for GameOver
    if ((wonCard.length === pokemonCard.length && wonCard.length !== 0) || flips === 0) {
        setTimeout(() => {
            setGameOver(true)
        }, 500)
    }


    // Need remove to another component
    const pagination = () => {
        const newPageNumber = []
        for (let i = 1; i <= Math.ceil(pokemonList.length / cardPerPage); i++) {
            newPageNumber.push(i)
        }
        setPageNumber(newPageNumber)
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    // End //

    if (isLoading) return <Loader/>

    return (
        <div className="App">
            {collectionToggle ?
                <CollectionPage currentCards={currentCards} pageNumber={pageNumber} paginate={paginate}
                                setCollectionToggle={setCollectionToggle}/> :
                <> {!startToggle ?
                    <MainMenu setStartToggle={setStartToggle} createGame={createGame} pagination={pagination}
                              setCollectionToggle={setCollectionToggle}/> : gameOver ?
                        <GameOverPage setStartToggle={setStartToggle} createGame={createGame} flips={flips}
                                      pokemonCard={pokemonCard} wonCard={wonCard}/> :
                        <div className="Card_wrap_container">
                            <img className="Exit_btn" src={crossBtn} alt="" onClick={() => setStartToggle(false)}/>
                            <div className='Flips'>Flips - {flips}</div>
                            <div className="Card_container">
                                {pokemonCard.map((pokemon, index) => <GamePage key={uuidv4()} pokemon={pokemon}
                                                                               flipCard={flipCard}
                                                                               index={index}/>)}
                            </div>
                        </div>}
                </>}
        </div>
    );
}

export default App;
