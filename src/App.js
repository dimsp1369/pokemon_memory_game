import './App.css';
import React, {useState} from "react";
import MainMenu from "./components/mainMenu/MainMenu";
import GameOverPage from "./components/GameOverPage";
import CollectionPage from "./components/collection/CollectionPage";
import {soundOff, soundOn} from "./assets/img/img";
import SoundComponent from "./components/SoundComponent";
import {useSelector} from "react-redux";
import GameBoard from "./components/GameBoard";


function App() {

    const gameStack = useSelector(state => state.gameReducer.gameStack)
    const wonCard = useSelector(state => state.gameReducer.wonCard)
    const flips = useSelector(state => state.gameReducer.flips)
    const isGameOver = useSelector(state => state.gameReducer.isGameOver)
    const isStartGame = useSelector(state => state.gameReducer.isStartGame)
    // Collection
    const isCollection = useSelector(state => state.gameReducer.collection.isCollection)

    //SoundControl
    const [isPlaying, setIsPlaying] = useState(false)

    return (
        <div className="App">
            <SoundComponent isPlaying={isPlaying}/>
            <div className="Sound_controller" onClick={() => setIsPlaying(!isPlaying)}><img
                src={!isPlaying ? soundOff : soundOn} alt=""/></div>
            {isCollection ?
                <CollectionPage/> : <>
                    {!isStartGame ? <MainMenu/> : isGameOver ?
                        <GameOverPage flips={flips} gameStack={gameStack} wonCard={wonCard}/> :
                        <GameBoard flips={flips} gameStack={gameStack} wonCard={wonCard}/>}
                </>}
        </div>
    );
}

export default App;
