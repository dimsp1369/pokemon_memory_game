import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {connect, useDispatch} from "react-redux";
import {loading, openCollection} from "../../redux/actions/actions";
import Pagination from "../utils/Pagination";
import {openCardDescription} from "../../redux/actions/asyncActions";
import {currentCards} from "../../redux/selectors";
import {NavLink} from "react-router-dom";

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

const mapStateToProps = (state) => {
    return {
        currentCards: currentCards(state),
    }
}

export default connect(mapStateToProps)(CollectionPage);
