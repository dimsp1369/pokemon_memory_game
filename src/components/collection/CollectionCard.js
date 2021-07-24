import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {crossBtn} from "../../assets/img/img";
import {useDispatch, useSelector} from "react-redux";
import {closedCardDescription} from "../../redux/actions/actions";

const CollectionCard = () => {

    const dispatch = useDispatch()
    const currentCard = useSelector(state => state.gameReducer.collection.cardDescription)

    return (
        <>
            <div className="CardCollection_container">
                <img src={currentCard.img_url} alt="" className="Card_img"/>
                <span className="Card_title">{currentCard.name}</span>
                <div className="Card_type">
                    <h4>Type</h4>
                    {currentCard.pokemon_data.type.map(el => <span key={uuidv4()}>{` ${el}`}</span>)}
                </div>
                <ul className="Card_ability_list">
                    <h4> Abilities </h4>
                    {currentCard.pokemon_data.abilities.map(el => <li key={uuidv4()}>{el.name}</li>)}
                </ul>
            </div>
            <img src={crossBtn} className="Exit_btn" alt="" onClick={() => dispatch(closedCardDescription())}/>
        </>
    );
};

export default CollectionCard;
