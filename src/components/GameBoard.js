import React, {useEffect} from 'react';
import {crossBtn, Pokeball} from "../assets/img/img";
import {addToCollection, backToMain, checkMatches, flipCard} from "../redux/actions/actions";
import {v4 as uuidv4} from "uuid";
import {connect, useDispatch} from "react-redux";
import {chosenCard, flips, gameStack, wonCard} from "../redux/selectors";
import {NavLink, useHistory} from "react-router-dom";

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
const mapStateToProps = (state) => {
    return {
        gameStack: gameStack(state),
        flips: flips(state),
        wonCard: wonCard(state),
        chosenCard: chosenCard(state),
    }
}

export default connect(mapStateToProps)(GameBoard);
