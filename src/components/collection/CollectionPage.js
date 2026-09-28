import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {connect, useDispatch} from "react-redux";
import {loading, openCollection} from "../../redux/actions/actions";
import Pagination from "../utils/Pagination";
import {openCardDescription} from "../../redux/actions/asyncActions";
import {currentCards} from "../../redux/selectors";
import {NavLink} from "react-router-dom";

/**
 * Collection page: shows the current page of Pokémon cards, with unlocked cards
 * (`isOpen`) linking to their detail view and locked cards rendered as blurred
 * silhouettes. Includes a "Main menu" button and pagination controls.
 *
 * @param {Object} props
 * @param {Array<{name: string, url: string, id: number, img_url: string, visible: boolean, active: boolean, isOpen: boolean}>} props.currentCards
 *     Pokémon cards on the current collection page (`pagination.currentCards`).
 * @returns {JSX.Element}
 */
const CollectionPage = ({currentCards}) => {

        const dispatch = useDispatch()

        return (
            <div className="Collection_container">
                <NavLink to="/">
                    <button className="Btn" onClick={() => dispatch(openCollection(false))}>Main menu</button>
                </NavLink>
                <div className="Collection_card_container">
                    {currentCards.map(el => {
                            return el.isOpen ?
                                <div className="Card" key={uuidv4()}
                                     onClick={() => {
                                         dispatch(loading())
                                         dispatch(openCardDescription(el))
                                     }}>
                                    <NavLink to="/CollectionCard">
                                        <img id="pokemon_img" src={el.img_url} alt="pokemon"/>
                                    </NavLink>
                                </div>
                                :
                                <div className="Card" key={uuidv4()}>
                                    <img id="pokemon_img" src={el.img_url}
                                         style={{filter: 'brightness(0) blur(10px)'}}
                                         alt="pokemon"
                                    />
                                </div>
                        }
                    )}
                </div>
                <Pagination/>
            </div>
        );
    }
;

/**
 * Maps the Pokémon cards of the current collection page from the store to props.
 *
 * @param {Object} state The root Redux state.
 * @returns {Object} Props `currentCards` (array of Pokémon cards on the current page).
 */
const mapStateToProps = (state) => {
    return {
        currentCards: currentCards(state),
    }
}

export default connect(mapStateToProps)(CollectionPage);
