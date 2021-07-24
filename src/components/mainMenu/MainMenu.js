import React, {useEffect} from 'react';
import {logo} from "../../assets/img/img";
import {useDispatch, useSelector} from "react-redux";
import {createNewGame, openCollection, pagination} from "../../redux/actions/actions";
import {getPokemons} from "../../redux/actions/asyncActions";
import Loader from "../utils/Loader";


const MainMenu = () => {

    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.gameReducer.isLoading)

    //Get the Pokemon's Name
    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch])
    if (isLoading) return <Loader/>

    return (
        <div className="MainMenu_container">
            <img className="Logo" src={logo} alt="LOGO"/>
            <span className='Title'>Match 'em All!</span>
            <div className="MainMenu_Btns">
                <div className="StartBtn_menu">
                    <button className="Btn StartBtn">Start Game</button>
                    <div className="Game_level">
                        <div className="Btn Btn_level" onClick={() => dispatch(createNewGame(2))}>Easy</div>
                        <div className="Btn Btn_level" onClick={() => dispatch(createNewGame(1.5))}>Medium</div>
                        <div className="Btn Btn_level" onClick={() => dispatch(createNewGame(1.3))}>Hard</div>
                    </div>
                </div>
                <button className="Btn" onClick={() => {
                    dispatch(openCollection(true))
                    dispatch(pagination())
                }}>Collection
                </button>
                <button className="Btn">Credits</button>
            </div>
        </div>
    );
};

export default MainMenu;
