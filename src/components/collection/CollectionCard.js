import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {crossBtn} from "../../assets/img/img";
import {connect} from "react-redux";
import {currentCard, isLoading} from "../../redux/selectors";
import {NavLink} from "react-router-dom";
import Loader from "../utils/Loader";

const CollectionCard = ({currentCard, isLoading}) => {

    if (isLoading) return <Loader/>

    return (
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
            <NavLink to="/CollectionPage"> <img src={crossBtn} className="Exit_btn Exit_description" alt=""
            /></NavLink>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        currentCard: currentCard(state),
        isLoading: isLoading(state),
    }
}

export default connect(mapStateToProps)(CollectionCard);
