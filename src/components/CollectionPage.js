import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import CollectionCard from "./CollectionCard";

const CollectionPage = ({currentCards, setCollectionToggle, pageNumber, paginate}) => {

        const [pokemonCard, setPokemonCard] = useState(false)
        const [card, setCard] = useState({})


        const openPokemonCard = (card) => {
            setPokemonCard(true)
            setCard(card)
        }

        const paginateCB = (pageNumber) => {
            paginate(pageNumber)
        }

        return (
            <div className="Collection_container">
                {!pokemonCard ? <>
                    <button className="Btn" onClick={() => setCollectionToggle(false)}>Main menu</button>
                    <div className="Collection_card_container">
                        {currentCards.map(el => <div className="Card Collection_card" key={uuidv4()}>
                            <img id="pokemon_img" src={el.img_url}
                                 style={!el.isOpen ? {filter: 'brightness(0) blur(10px)'} : {}} alt=""
                                 onClick={el.isOpen ? () => openPokemonCard(el) : null}/></div>)}
                    </div>

                    <div style={{marginTop: 10}}>
                        {pageNumber.map(number => (
                            <span key={number} onClick={() => paginateCB(number)}><a href="!#" style={{
                                paddingLeft: 10,
                                textDecoration: "none",
                                fontSize: 24
                            }}>{number}</a></span>
                        ))}
                    </div>
                </> : <CollectionCard setPokemonCard={setPokemonCard} card={card}/>}
            </div>
        );
    }
;

export default CollectionPage;