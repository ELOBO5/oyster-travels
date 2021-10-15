import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const RestaurantDetail = ({ restaurant }) => {
    const { tripId } = useSelector(state => state);

    // This id comes from the server once we have made a POST request
    const [restaurantId, setRestaurantId] = useState(null);
    const [added, setAdded] = useState(false);

    const addRestaurantToTrip = async restaurant => {
        const cuisine = restaurant?.cuisine.map(({ name }) => name);

        const restaurantInfo = {
            trip: tripId,
            category: 'restaurant',
            name: restaurant.name,
            rating: parseFloat(restaurant.rating),
            review_count: parseInt(restaurant.num_reviews),
            image: restaurant.photo.images.large.url,
            address: restaurant.address,
            website_link: restaurant.website,
            tripadvisor_link: restaurant.web_url,
            cuisine: cuisine.join(', '),
            price: restaurant.price.replaceAll('$', '£'),
            ranking: restaurant.ranking
        };

        try {
            const { data } = await axios.post(
                'http://localhost:8000/api/experiences/',
                restaurantInfo
            );
            setRestaurantId(data.id);
            setAdded(true);
        } catch (error) {
            console.error('ADD RESTAURANT ', error);
        }
    };

    const removeRestaurantFromTrip = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/experiences/${restaurantId}/`);
            setAdded(false);
        } catch (error) {
            console.error('REMOVE RESTAURANT ', error);
        }
    };

    const handleClick = () => {
        if (!added) {
            addRestaurantToTrip(restaurant);
        } else {
            removeRestaurantFromTrip();
            setRestaurantId(null);
        }
    };

    return (
        <div className="experiences__card">
            <img src={restaurant.photo.images.large.url} alt={restaurant.name} />
            <div className="experiences__card-content">
                <h2>{restaurant.name}</h2>
                <p className="experiences__ranking">{restaurant.ranking}</p>
                <p>
                    <span>Rating: </span>
                    {Number(restaurant.rating)}
                </p>
                <p>
                    <span>Reviews: </span>
                    {restaurant.num_reviews}
                </p>
                <p>
                    <span>Price Range: </span>
                    {restaurant.price}
                </p>
                <p>
                    <span>Address: </span> {restaurant.address}
                </p>
                <div className="experiences__cuisine">
                    {restaurant?.cuisine.map(cuisine => (
                        <span key={cuisine.name}>{cuisine.name}</span>
                    ))}
                </div>
            </div>
            <div className="experiences__websites">
                {restaurant.website && <a href={restaurant.website}>Website</a>}
                {restaurant.web_url && <a href={restaurant.web_url}>Tripadvisor</a>}
            </div>
            <button onClick={handleClick}>
                {!added ? 'Add to Trip' : 'Remove from trip'}
            </button>
        </div>
    );
};

export default RestaurantDetail;
