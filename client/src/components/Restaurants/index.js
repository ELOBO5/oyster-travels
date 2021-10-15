import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { getPlacesData } from '../../apis/places';
import { addRestaurants } from '../../redux/actions';
import RestaurantDetail from '../RestaurantDetail';
import './styles.css';

const Restaurants = () => {
    const dispatch = useDispatch();
    const { bounds, restaurants, destinationCity } = useSelector(state => state);

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

    return (
        <>
            {!restaurants.length ? (
                <div className="center">
                    <CircularProgress />
                </div>
            ) : (
                <div className="experiences">
                    <h1>Restaurants in {destinationCity}</h1>
                    <div className="experiences__container">
                        {restaurants?.map(restaurant => (
                            <RestaurantDetail
                                restaurant={restaurant}
                                key={restaurant.location_id}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Restaurants;
