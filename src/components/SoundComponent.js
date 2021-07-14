import React from 'react';
import Sound from 'react-sound'
import MainThem from '../assets/music/PokémonThemeSong.mp3'


const SoundComponent = ({isPlaying}) => {
    return (
        <div>
            <Sound url={MainThem} playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
                   playFromPosition={300} volume={50}
              />
        </div>
    );
};

export default SoundComponent;