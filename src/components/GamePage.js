import React from 'react';
import {Pokeball} from "../assets/img/img";

const GamePage = ({pokemon, flipCard, index}) => {

    const flipCardCB = (index, card) => {
        flipCard(index, card)
    }

    return (
        <div className="Card Card_flip" onClick={pokemon.active === true ? () => flipCardCB(index, pokemon) : null}>
            {!pokemon.visible ? <img id="pokemon_img" className="Card_back" src={Pokeball}
                                     alt=""/> :
                <img id="pokemon_img" className="Card_front" src={pokemon.img_url} alt=""/>}
        </div>
    );
};

export default GamePage;