import React from 'react';
import {winImg} from "../assets/img/img";
import {loseImg} from "../assets/img/img";

const GameOverPage = ({setStartToggle, createGame, flips, wonCard, pokemonCard}) => {

    const tryAgain = () => {
        createGame()
    }

    return (
        <div className='GameOver_container'>
            <div className="GameOver_result">
                {flips !== 0 || wonCard.length === pokemonCard.length ?
                    <>
                        <span className='Title Result_title'>You match 'em all</span>
                        <img src={winImg} alt="Win"/>
                    </> :
                    <>
                        <span className='Title'>You lose them</span>
                        <img src={loseImg} alt="Lose" style={{width: 450}}/>
                    </>}
            </div>
            <div className='GameOver_Btn'>
                <button className="Btn" onClick={() => tryAgain()}>Try Again</button>
                <button className="Btn" onClick={() => setStartToggle(false)}>Main Menu</button>
            </div>
        </div>
    );
};

export default GameOverPage;