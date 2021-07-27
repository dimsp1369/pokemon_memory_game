import React from 'react';
import {logo} from "../../assets/img/img";
import {v4 as uuidv4} from 'uuid';
import {useDispatch} from "react-redux";
import {createNewGame, pagination} from "../../redux/actions/actions";
import {NavLink} from "react-router-dom";


const MainMenu = () => {

    const dispatch = useDispatch()
    const leveling = [[2, 'Easy'], [1.5, 'Medium'], [1.3, 'Hard']]

    return (
        <nav className="MainMenu_container">
            <img className="Logo" src={logo} alt="LOGO"/>
            <span className='Title'>Match 'em All!</span>
            <div className="MainMenu_Btns">
                <div className="StartBtn_menu">
                    <button className="Btn StartBtn">Start Game</button>
                    <NavLink to="/GameBoard">
                        <div className="Game_level">
                            {leveling.map(el => <div key={uuidv4()} className="Btn Btn_level"
                                                     onClick={() => dispatch(createNewGame(el[0]))}>{el[1]}</div>)}
                        </div>
                    </NavLink>
                </div>
                <NavLink to="/CollectionPage">
                    <button className="Btn" onClick={() => dispatch(pagination())}>Collection</button>
                </NavLink>
                <NavLink to="/Credits">
                    <button className="Btn">Credits</button>
                </NavLink>
            </div>
        </nav>
    );
};

export default MainMenu;
