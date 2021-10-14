import React from 'react';
import { Attractions, Restaurants } from '../../components';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './styles.css'

const Experiences = () => {
    const history = useHistory();
    const { tripCardId } = useSelector(state => state);
    
    return (
        <div>
            <Restaurants />
            <Attractions />
            <button onClick={() => history.push(`/trips/${tripCardId}`)}>Go To Trip</button>
        </div>
    );
};

export default Experiences;
