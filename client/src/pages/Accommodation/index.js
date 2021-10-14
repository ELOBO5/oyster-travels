import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getPlacesData } from '../../apis/places';
import { addHotels } from '../../redux/actions';
import './style.css';

const Accommodations = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { bounds, hotels, tripId, destinationCity } = useSelector(state => state);

    useEffect(() => {
        const setAccommodationData = async () => {
            if (!bounds.sw && !bounds.ne) return;
            const hotels = await getPlacesData('hotels', bounds.sw, bounds.ne);
            const filteredHotels = hotels?.filter(hotel => hotel.photo && hotel.price);
            dispatch(addHotels(filteredHotels));
        };

        setAccommodationData();
    }, [bounds, dispatch]);

    const addHotelToTrip = async ({ name, rating, num_reviews, photo, price, ranking }) => {
        const hotel = {
            trip: tripId,
            category: 'hotel',
            name,
            rating,
            price,
            ranking,
            review_count: num_reviews,
            image: photo.images.large.url
        };

        try {
            await axios.post('http://localhost:8000/api/experiences/', hotel);
        } catch (error) {
            console.error('ADD HOTEL ', error);
        }
    };

    return (
        <div className="hotels">
            <h1>Hotels in {destinationCity}</h1>
            <div className="hotels__container">
                {hotels?.map(hotel => (
                    <div key={hotel.location_id} className="hotels__card">
                        <img src={hotel.photo.images.large.url} alt={hotel.name} />
                        <h2>{hotel.name}</h2>
                        <p className="hotels__ranking"> {hotel.ranking}</p>
                        <p>
                            <span>Rating:</span> {Number(hotel.rating)}
                        </p>
                        <p>
                            <span>Reviews:</span> {hotel.num_reviews}
                        </p>
                        <p>
                            <span>Price Range:</span> {hotel.price}
                        </p>
                        <button onClick={() => addHotelToTrip(hotel)}>Add to Trip</button>
                    </div>
                ))}
            </div>
            <button onClick={() => history.push('/experiences')}>View Experiences</button>
        </div>
    );
};

export default Accommodations;
