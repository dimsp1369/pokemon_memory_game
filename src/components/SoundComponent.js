import React from 'react';
import Sound from 'react-sound'
import MainThem from '../assets/music/PokémonThemeSong.mp3'
import {playMusic} from "../redux/actions/actions";
import {soundOff, soundOn} from "../assets/img/img";
import {connect, useDispatch} from "react-redux";
import {isMusicPlay} from "../redux/selectors";


const SoundComponent = ({isMusicPlay}) => {

    const dispatch = useDispatch()

    return (
        <div>
            <Sound url={MainThem} playStatus={isMusicPlay ? Sound.status.PLAYING : Sound.status.STOPPED}
                   playFromPosition={300} volume={50} loop={true}
            />
            <div className="Sound_controller" onClick={() => dispatch(playMusic(!isMusicPlay))}><img
                src={!isMusicPlay ? soundOff : soundOn} alt=""/></div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        isMusicPlay: isMusicPlay(state),
    }
}

export default connect(mapStateToProps)(SoundComponent);
