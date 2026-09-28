import React from 'react';
import {loseImg, winImg} from "../assets/img/img";
import {connect, useDispatch} from "react-redux";
import {backToMain, createNewGame} from "../redux/actions/actions";
import {flips, gameStack, wonCard} from "../redux/selectors";
import {NavLink} from "react-router-dom";

/**
 * Game over screen: shows the win image when flips remain or all cards were
 * matched, otherwise the lose image, plus "Try Again" (starts a new game) and
 * "Main Menu" buttons.
 *
 * @param {Object} props
 * @param {Array<{name: string, url: string, id: number, img_url: string, visible: boolean, active: boolean, isOpen: boolean}>} props.gameStack
 *     The 20 board cards of the finished game.
 * @param {number|null} props.flips Remaining flips (0 means the player ran out).
 * @param {Array<{name: string, url: string, id: number, img_url: string, visible: boolean, active: boolean, isOpen: boolean}>} props.wonCard
 *     Cards matched during the game.
 * @returns {JSX.Element}
 */
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

/**
 * Maps the game state to GameOverPage props.
 *
 * @param {Object} state The root Redux state.
 * @returns {Object} `{gameStack, flips, wonCard}` read from `state.gameReducer`.
 */
const mapStateToProps = (state) => {
    return {
        gameStack: gameStack(state),
        flips: flips(state),
        wonCard: wonCard(state),
    }
}

export default connect(mapStateToProps)(GameOverPage);
