import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlacesData } from '../../apis/places';
import { addRestaurants } from '../../redux/actions';
import './styles.css';

const Restaurants = () => {
    const dispatch = useDispatch();
    const { bounds, restaurants, tripId, destinationCity } = useSelector(state => state);

    useEffect(() => {
        const setRestaurantData = async () => {
            if (!bounds.sw && !bounds.ne) return;

            const restaurants = await getPlacesData('restaurants', bounds.sw, bounds.ne);
            const filteredRestaurants = restaurants.filter(
                ({ photo, price }) => photo && price
            );
            dispatch(addRestaurants(filteredRestaurants));
        };

        setRestaurantData();
    }, [bounds, dispatch]);

    const addRestaurantToTrip = async restaurant => {
        const cuisine = restaurant?.cuisine.map(({ name }) => name);

        const restaurantInfo = {
            trip: tripId,
            category: 'restaurant',
            name: restaurant.name,
            rating: restaurant.rating,
            review_count: restaurant.num_reviews,
            image: restaurant.photo.images.large.url,
            address: restaurant.address,
            website_link: restaurant.website,
            tripadvisor_link: restaurant.web_url,
            cuisine: cuisine.join(', '),
            price: restaurant.price,
            ranking: restaurant.ranking
        };

        try {
            await axios.post('http://localhost:8000/api/experiences/', restaurantInfo);
        } catch (error) {
            console.error('ADD HOTEL ', error);
        }
    };

    return (
        <div className="experiences">
            <h1>Restaurants in {destinationCity}</h1>
            <div className="experiences__container">
                {restaurants?.map(restaurant => (
                    <div className="experiences__card" key={restaurant.location_id}>
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
                            {restaurant.web_url && (
                                <a href={restaurant.web_url}>Tripadvisor</a>
                            )}
                        </div>
                        <button onClick={() => addRestaurantToTrip(restaurant)}>
                            Add to Trip
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Restaurants;
