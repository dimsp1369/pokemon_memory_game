import React from 'react';
import {v4 as uuidv4} from 'uuid';
import CollectionCard from "./CollectionCard";
import {useDispatch, useSelector} from "react-redux";
import {openCollection} from "../../redux/actions/actions";
import Pagination from "../utils/Pagination";
import {openCardDescription} from "../../redux/actions/asyncActions";

const CollectionPage = () => {

        const dispatch = useDispatch()
        const isOpenCard = useSelector(state => state.gameReducer.isOpenCard)
        const currentCards = useSelector(state => state.gameReducer.pagination.currentCards)

        return (
            <div className="Collection_container">
                {!isOpenCard ? <>
                    <button className="Btn" onClick={() => dispatch(openCollection(false))}>Main menu</button>
                    <div className="Collection_card_container">
                        {currentCards.map(el => <div className="Card Collection_card" key={uuidv4()}>
                            <img id="pokemon_img" src={el.img_url}
                                 style={!el.isOpen ? {filter: 'brightness(0) blur(10px)'} : {}} alt="pokemon"
                                 onClick={el.isOpen ? () => dispatch(openCardDescription(el)) : null}/></div>)}
                    </div>
                    <Pagination/>
                </> : <CollectionCard/>}
            </div>
        );
    }
;

export default CollectionPage;
