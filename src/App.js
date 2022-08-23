import './App.sass';
import Gameview from './threed/Gameview';
import icon from './imgs/coin_icon.svg';
import { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';

function App() {

    const [score, setScore] = useState(0);
    const [iconRot, setIconRot] = useState(0);

    bridge.send("VKWebAppInit", {});

    function alignRotation(rotation) {
        setIconRot(iconRot + rotation * 10);
        setScore(score + rotation);
    }

    return (
        <div className="App non-selectable">
            <div className='statusbar non-selectable'>
                <div className='scoreboard'>
                    <img
                        className='icon'
                        src={icon}
                        style={{ transform: `rotate(${iconRot}deg)` }}
                    ></img>
                    <div className='text'>
                        <p>{Math.round(score)}</p>
                    </div>
                </div>
            </div>
            <Gameview
                alignRotation={alignRotation}
            />
        </div>
    );
}

export default App;
