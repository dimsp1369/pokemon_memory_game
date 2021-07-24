import React from 'react';
import {winImg} from "../assets/img/img";
import {loseImg} from "../assets/img/img";
import {useDispatch} from "react-redux";
import {backToMain, createNewGame} from "../redux/actions/actions";

const GameOverPage = ({flips, wonCard, gameStack}) => {

    const dispatch = useDispatch()

    return (
        <div className='GameOver_container'>
            <div className="GameOver_result">
                {flips !== 0 || wonCard.length === gameStack.length ?
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
                <button className="Btn" onClick={() => dispatch(createNewGame())}>Try Again</button>
                <button className="Btn" onClick={() => dispatch(backToMain())}>Main Menu</button>
            </div>
        </div>
    );
};

export default GameOverPage;
