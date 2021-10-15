import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const HotelDetail = ({ hotel }) => {
    const tripId = useSelector(state => state.tripId);

    // This id comes from the server once we have made a POST request
    const [hotelId, setHotelld] = useState(null);
    const [added, setAdded] = useState(false);

    const addHotelToTrip = async ({ name, rating, num_reviews, photo, price, ranking }) => {
        const hotel = {
            trip: tripId,
            category: 'hotel',
            name,
            rating: parseFloat(rating),
            price: price.replaceAll('$', '£'),
            ranking,
            review_count: parseInt(num_reviews),
            image: photo.images.large.url
        };

        try {
            const { data } = await axios.post('https://oystertravel.herokuapp.com/api/experiences/', hotel);
            setHotelld(data.id);
            setAdded(true);
        } catch (error) {
            console.error('ADD HOTEL ', error);
        }
    };

    const removeHotelFromTrip = async () => {
        try {
            await axios.delete(`https://oystertravel.herokuapp.com/api/experiences/${hotelId}/`);
            setAdded(false);
        } catch (error) {
            console.error('REMOVE HOTEL ', error);
        }
    };

    const handleClick = () => {
        if (!added) {
            addHotelToTrip(hotel);
        } else {
            removeHotelFromTrip();
            setHotelld(null);
        }
    };

    return (
        <div className="hotels__card">
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
                <span>Price Range:</span> {hotel.price.replaceAll('$', '£')}
            </p>
            <button onClick={handleClick}>
                {!added ? 'Add to Trip' : 'Remove from trip'}
            </button>
        </div>
    );
};

export default HotelDetail;
