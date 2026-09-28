import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {crossBtn} from "../../assets/img/img";
import {connect} from "react-redux";
import {currentCard, isLoading} from "../../redux/selectors";
import {NavLink} from "react-router-dom";
import Loader from "../utils/Loader";

/**
 * Detail view of a single unlocked Pokémon card from the collection: image, name,
 * types and abilities, plus a close button linking back to the collection page.
 * Shows a Loader while the card's details are being fetched.
 *
 * @param {Object} props
 * @param {{name: string, url: string, id: number, img_url: string, visible: boolean, active: boolean, isOpen: boolean, pokemon_data: {abilities: Array<{name: string, effect: string}>, type: string[]}}} props.currentCard
 *     The Pokémon card open in the collection (`collection.cardDescription`), enriched with
 *     `pokemon_data` by `openCardDescription`.
 * @param {boolean} props.isLoading Whether card details are still loading.
 * @returns {JSX.Element}
 */
const CollectionCard = ({currentCard, isLoading}) => {

    if (isLoading) return <Loader/>

    return (
        <div className="CardCollection_container">
            <img src={currentCard.img_url} alt="" className="Card_img"/>
            <span className="Card_title">{currentCard.name}</span>
            <div className="Card_type">
                <h4>Type</h4>
                {currentCard.pokemon_data.type.map(el => <span key={uuidv4()}
                                                               className="Pokemon_Type">{` ${el}`}</span>)}
            </div>
            <ul className="Card_ability_list">
                <h4> Abilities </h4>
                {currentCard.pokemon_data.abilities.map(el => <li key={uuidv4()}
                                                                  className="Pokemon_abilities">{el.name}</li>)}
            </ul>
            <NavLink to="/CollectionPage"> <img src={crossBtn} className="Exit_btn Exit_description" alt=""
            /></NavLink>
        </div>
    );
};

/**
 * Maps the open collection card and the loading flag from the store to props.
 *
 * @param {Object} state The root Redux state.
 * @returns {Object} Props `currentCard` (the Pokémon card open in the collection) and
 *     `isLoading` (boolean loading flag).
 */
const mapStateToProps = (state) => {
    return {
        currentCard: currentCard(state),
        isLoading: isLoading(state),
    }
}

export default connect(mapStateToProps)(CollectionCard);
