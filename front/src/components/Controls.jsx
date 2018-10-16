import React from 'react';
import FindRestaurant from './FindRestaurant';
import TooManyPlaces from '../containers/TooManyPlaces';

const Controls = () => {
    return (
        <div>
            <FindRestaurant />
            <TooManyPlaces />
        </div>

    );
}

export default Controls;