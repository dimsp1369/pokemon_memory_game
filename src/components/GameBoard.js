import React, {useEffect} from 'react';
import {crossBtn, Pokeball} from "../assets/img/img";
import {addToCollection, backToMain, checkMatches, flipCard} from "../redux/actions/actions";
import {v4 as uuidv4} from "uuid";
import {connect, useDispatch} from "react-redux";
import {chosenCard, flips, gameStack, wonCard} from "../redux/selectors";
import {NavLink, useHistory} from "react-router-dom";

/**
 * Game board screen: renders the shuffled Pokémon cards and the remaining flips,
 * checks face-up pairs for a match, adds matched cards to the collection and
 * navigates to "/GameOver" when all cards are matched or flips reach 0.
 *
 * @param {Object} props
 * @param {Array<{name: string, url: string, id: number, img_url: string, visible: boolean, active: boolean, isOpen: boolean}>} props.gameStack
 *     The 20 shuffled board cards (10 pairs); each also carries a `_id` uuid distinguishing the pair copies.
 * @param {number|null} props.flips Remaining flips (null outside a game).
 * @param {Array<{name: string, url: string, id: number, img_url: string, visible: boolean, active: boolean, isOpen: boolean}>} props.wonCard
 *     Cards matched so far.
 * @param {Array<{name: string, url: string, id: number, img_url: string, visible: boolean, active: boolean, isOpen: boolean}>} props.chosenCard
 *     0–2 face-up cards awaiting a match check.
 * @returns {JSX.Element}
 */
const GameBoard = ({gameStack, flips, wonCard, chosenCard}) => {
    const dispatch = useDispatch()
    let history = useHistory()

    // Check matches card
    useEffect(() => {
        if (chosenCard.length === 2) setTimeout(() => {
            dispatch(checkMatches())
        }, 500)
    }, [chosenCard, dispatch])
    //Add card in collection
    useEffect(() => {
        dispatch(addToCollection())
    }, [wonCard, dispatch])

    //Activator for GameOver
    if ((wonCard.length === gameStack.length && wonCard.length !== 0) || flips === 0) {
        setTimeout(() => {
            return history.push("/GameOver")
        }, 500)
    }

    return (
        <div className="Card_wrap_container">
            <NavLink to="/">
                <img className="Exit_btn" src={crossBtn} alt="" onClick={() => dispatch(backToMain())}/>
            </NavLink>
            <div className='Flips'>Flips - {flips}</div>
            <div className="Card_container">
                {gameStack.map((pokemon, index) => <div key={uuidv4()} className="Card Card_flip"
                                                        onClick={pokemon.active && chosenCard.length !== 2 ? () => dispatch(flipCard(index, pokemon)) : null}>
                    {!pokemon.visible ? <img id="pokemon_img" className="Card_back" src={Pokeball}
                                             alt=""/> :
                        <img id="pokemon_img" className="Card_front" src={pokemon.img_url} alt=""/>}
                </div>)}
            </div>
        </div>
    );
};
/**
 * Maps the game state to GameBoard props.
 *
 * @param {Object} state The root Redux state.
 * @returns {Object} `{gameStack, flips, wonCard, chosenCard}` read from `state.gameReducer`.
 */
const mapStateToProps = (state) => {
    return {
        gameStack: gameStack(state),
        flips: flips(state),
        wonCard: wonCard(state),
        chosenCard: chosenCard(state),
    }
}

export default connect(mapStateToProps)(GameBoard);
