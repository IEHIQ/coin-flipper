import './splash.sass';
import icon from '../imgs/coin_icon.svg';

function Splash() {
    return (
        <div className='splash'>
            <img
                className='splash-icon'
                src={icon}
            ></img>
        </div>
    );
}

export default Splash;