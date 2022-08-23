import './gameview.sass';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Coin } from './Coin';
import * as THREE from 'three';

const MIN_SWIPE_LEN = .1;

function Gameview(props) {

    const [swipeStarted, setSwipeStarted] = useState(false);
    const [swipeVector] = useState(new THREE.Vector2());

    const [rotVect] = useState(new THREE.Vector3());

    function onSwipeStart(e) {
        setSwipeStarted(true);
        swipeVector.set(e.clientX, e.clientY);
    }

    function onSwipeEnd(e) {
        if (swipeStarted) {
            setSwipeStarted(false);

            swipeVector.set((e.clientX - swipeVector.x) / e.target.clientWidth, (swipeVector.y - e.clientY) / e.target.clientHeight);

            if (swipeVector.length() > MIN_SWIPE_LEN)
                rotVect.set(rotVect.x - swipeVector.y * 2 * Math.PI, rotVect.y + swipeVector.x * 2 * Math.PI);
        }
    }

    function touchStart(e) {
        setSwipeStarted(true);
        swipeVector.set(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }

    function touchEnd(e) {
        if (swipeStarted) {
            setSwipeStarted(false);

            swipeVector.set((e.changedTouches[0].clientX - swipeVector.x) / e.changedTouches[0].target.clientWidth, (swipeVector.y - e.changedTouches[0].clientY) / e.changedTouches[0].target.clientHeight);

            if (swipeVector.length() > MIN_SWIPE_LEN)
                rotVect.set(rotVect.x - swipeVector.y * 2 * Math.PI, rotVect.y + swipeVector.x * 2 * Math.PI);
        }
    }

    function alignRotation(rotation) {
        if (props.alignRotation)
            props.alignRotation(rotation);
    }

    return (
        <div className="scene">
            <Canvas
                onMouseDown={onSwipeStart}
                onMouseUp={onSwipeEnd}
                onMouseLeave={onSwipeEnd}

                onTouchStart={touchStart}
                onTouchEnd={touchEnd}
            >
                <pointLight position={[-5, 5, 5]} intensity={3} />
                <ambientLight />
                <Coin
                    rotVect={rotVect}
                    alignRotation={alignRotation}
                />

            </Canvas>
        </div>
    );
}

export default Gameview;