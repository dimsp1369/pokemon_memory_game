import React from 'react';
import {crossBtn, gitHub, linkeDin, pokeApi, reactImg, reduxImg} from "../assets/img/img";
import {backToMain} from "../redux/actions/actions";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";

const Credits = () => {
    const dispatch = useDispatch()

    return (
        <div className="Credit_Container">
            <span className="Title">CREDITS</span>
            <NavLink to="/">
                <img className="Exit_btn Credit_Exit" src={crossBtn} alt="" onClick={() => dispatch(backToMain())}/>
            </NavLink>
            <div>
                <span className="Title Credit_Stack_title">Stack</span>
                <div className="Credit_Links_Stack">
                    <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">
                        <img src={pokeApi} alt="pokeAPI" className="Credits_PokeApi"/></a>
                    <img src={reactImg} alt="React" className="Credits_React"/>
                    <img src={reduxImg} alt="Redux" className="Credits_Redux"/>
                </div>
            </div>
            <div>
                <span className="Title Credit_Contacts_title">Contacts</span>
                <div className="Credit_Links_Contacts">
                    <a href="https://github.com/dimsp1369" target="_blank" rel="noreferrer">
                        <img src={gitHub} alt="github" className="Credits_github"/></a>
                    <a href="https://www.linkedin.com/in/dmitrii-spiridonov-432b2aa4/" target="_blank" rel="noreferrer">
                        <img src={linkeDin} alt="linkedin" className="Credits_linkedin"/></a>
                </div>
            </div>
        </div>
    );
};

export default Credits;
