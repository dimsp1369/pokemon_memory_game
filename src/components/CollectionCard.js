import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {crossBtn} from "../assets/img/img";

const CollectionCard = ({setPokemonCardToggle, card}) => {
    console.log(card)
    return (
        <>
            <div className="CardCollection_container">
                <img src={card.img_url} alt="" className="Card_img"/>
                <span className="Card_title">{card.name}</span>
                <div className="Card_type">
                    <h4>Type</h4>
                    {/*{card.pokemon_data.type.map(el => <span key={uuidv4()}>{` ${el}`}</span>)}*/}
                </div>
                <ul className="Card_ability_list">
                    <h4> Abilities </h4>
                    {/*{card.pokemon_data.abilities.map(el => <li>{el.name}</li>)}*/}
                </ul>
            </div>
            <img src={crossBtn} className="Exit_btn" alt="" onClick={() => setPokemonCardToggle(false)}/>
        </>
    );
};

export default CollectionCard;