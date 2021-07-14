import React from 'react';
import {logo} from "../assets/img/img";


const MainMenu = ({setStartToggle, createGame, setCollectionToggle, pagination}) => {

    const createGameCB = (level) => {
        createGame(level)
        setStartToggle(true)
    }

    return (
        <div className="MainMenu_container">
                <img className="Logo" src={logo} alt="LOGO"/>
            <span className='Title'>Match 'em All!</span>
            <div className="MainMenu_Btns">
                <div className="StartBtn_menu">
                    <button className="Btn StartBtn">Start Game</button>
                    <div className="Game_level">
                        <div className="Btn Btn_level" onClick={() => createGameCB(2.5)}>Easy</div>
                        <div className="Btn Btn_level" onClick={() => createGameCB(2)}>Medium</div>
                        <div className="Btn Btn_level" onClick={() => createGameCB(1.5)}>Hard</div>
                    </div>
                </div>
                <button className="Btn" onClick={() => {
                    setCollectionToggle(true)
                    pagination()
                }}>Collection
                </button>
                <button className="Btn">Credits</button>
            </div>
        </div>
    );
};

export default MainMenu;