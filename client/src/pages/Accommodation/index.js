import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { getPlacesData } from '../../apis/places';
import { addHotels } from '../../redux/actions';
import HotelDetail from '../../components/HotelDetail';
import './style.css';

const Accommodations = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { bounds, hotels, destinationCity } = useSelector(state => state);

    useEffect(() => {
        const setAccommodationData = async () => {
            if (!bounds.sw && !bounds.ne) return;
            const hotels = await getPlacesData('hotels', bounds.sw, bounds.ne);
            const filteredHotels = hotels?.filter(hotel => hotel.photo && hotel.price);
            dispatch(addHotels(filteredHotels));
        };

        setAccommodationData();
    }, [bounds, dispatch]);

    return (
        <>
            {!hotels.length ? (
                <div className="center">
                    <CircularProgress />
                </div>
            ) : (
                <div className="hotels">
                    <h1>Hotels in {destinationCity}</h1>
                    <div className="hotels__container">
                        {hotels.map(hotel => (
                            <HotelDetail hotel={hotel} key={hotel.location_id} />
                        ))}
                    </div>
                    <button onClick={() => history.push('/experiences')}>
                        View Experiences
                    </button>
                </div>
            )}
        </>
    );
};

export default Accommodations;
