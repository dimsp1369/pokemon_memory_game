import React from 'react';
import {loseImg, winImg} from "../assets/img/img";
import {connect, useDispatch} from "react-redux";
import {backToMain, createNewGame} from "../redux/actions/actions";
import {flips, gameStack, wonCard} from "../redux/selectors";
import {NavLink} from "react-router-dom";

const GameOverPage = ({gameStack, flips, wonCard}) => {

    const dispatch = useDispatch()

    return (
        <div className="GameOver_result">
            <>
                {flips !== 0 || wonCard.length === gameStack.length ?
                    <>
                        <span className='Title GameOver_title'>You match 'em all</span>
                        <img src={winImg} alt="Win"/>
                    </> :
                    <>
                        <span className='Title GameOver_title'>You lose them</span>
                        <img src={loseImg} alt="Lose"/>
                    </>}
            </>
            <div className='GameOver_Btn'>
                <NavLink to="/GameBoard">
                    <button className="Btn" onClick={() => dispatch(createNewGame())}>Try Again</button>
                </NavLink>
                <NavLink to="/">
                    <button className="Btn" onClick={() => dispatch(backToMain())}>Main Menu</button>
                </NavLink>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        gameStack: gameStack(state),
        flips: flips(state),
        wonCard: wonCard(state),
    }
}

export default connect(mapStateToProps)(GameOverPage);
