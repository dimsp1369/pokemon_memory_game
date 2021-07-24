import React, {useEffect} from 'react';
import {crossBtn, Pokeball} from "../assets/img/img";
import {addToCollection, backToMain, checkMatches, flipCard, gameOver} from "../redux/actions/actions";
import {v4 as uuidv4} from "uuid";
import {useDispatch, useSelector} from "react-redux";

const GameBoard = ({gameStack, flips, wonCard}) => {

    const dispatch = useDispatch()
    const chosenCard = useSelector(state => state.gameReducer.chosenCard)

    //Activator for GameOver
    if ((wonCard.length === gameStack.length && wonCard.length !== 0) || flips === 0) {
        setTimeout(() => {
            dispatch(gameOver())
        }, 500)
    }

    //Activate the function after to filling the choseCard array
    useEffect(() => {
        if (chosenCard.length === 2) setTimeout(() => {
            dispatch(checkMatches())
        }, 500)
    }, [chosenCard, dispatch])

    useEffect(() => {
        dispatch(addToCollection())
    }, [wonCard, dispatch])

    return (
        <div className="Card_wrap_container">
            <img className="Exit_btn" src={crossBtn} alt="" onClick={() => dispatch(backToMain())}/>
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

export default GameBoard;
