import './App.css';
import React, {useEffect} from "react";
import MainMenu from "./components/mainMenu/MainMenu";
import GameOverPage from "./components/GameOverPage";
import CollectionPage from "./components/collection/CollectionPage";
import {connect, useDispatch} from "react-redux";
import GameBoard from "./components/GameBoard";
import {getPokemons} from "./redux/actions/asyncActions";
import Loader from "./components/utils/Loader";
import {Route, Switch} from "react-router-dom";
import {isLoading} from "./redux/selectors";
import Credits from "./components/Credits";
import CollectionCard from "./components/collection/CollectionCard";
import {loading} from "./redux/actions/actions";


/**
 * Root component: fetches the Pokémon list on mount and renders the routed pages
 * (main menu, collection, game board, game over, credits, collection card),
 * or a loader while the list is loading.
 * @param {Object} props
 * @param {boolean} props.isLoading - Whether the Pokémon list is still being fetched.
 * @returns {JSX.Element}
 */
function App({isLoading}) {
    const dispatch = useDispatch()
    // Get pokemon list
    useEffect(() => {
        dispatch(loading())
        dispatch(getPokemons())
    }, [dispatch])

    if (isLoading) return <Loader/>

    return (
        <div className="App">
            <Switch>
                <Route exact path="/" render={() => <MainMenu/>}/>
                <Route exact path="/CollectionPage" render={() => <CollectionPage/>}/>
                <Route path="/GameBoard" render={() => <GameBoard/>}/>
                <Route path="/GameOver" render={() => <GameOverPage/>}/>
                <Route path="/Credits" render={() => <Credits/>}/>
                <Route path="/CollectionCard" render={() => <CollectionCard/>}/>
            </Switch>
        </div>
    );
}

/**
 * Maps the Redux state to `App` props.
 * @param {Object} state - The root Redux state.
 * @returns {Object} `{isLoading: boolean}` - the game state's loading flag.
 */
const mapStateToProps = (state) => {
    return {
        isLoading: isLoading(state),
    }
}

export default connect(mapStateToProps)(App);
