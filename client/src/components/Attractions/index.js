import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlacesData } from '../../apis/places';
import { addAttractions } from '../../redux/actions';
import './styles.css';

const Attractions = () => {
    const dispatch = useDispatch();
    const { bounds, attractions, tripId, destinationCity } = useSelector(state => state);

    useEffect(() => {
        const setAttractionData = async () => {
            if (!bounds.sw && !bounds.ne) return;
            const attractions = await getPlacesData('attractions', bounds.sw, bounds.ne);
            const filteredAttractions = attractions.filter(attractions => attractions.photo);
            dispatch(addAttractions(filteredAttractions));
        };

        setAttractionData();
    }, [bounds, dispatch]);

    const addAttractionToTrip = async attraction => {
        const attractionInfo = {
            trip: tripId,
            category: 'attraction',
            name: attraction.name,
            rating: attraction.rating,
            review_count: attraction.num_reviews,
            image: attraction.photo.images.large.url,
            address: attraction.address,
            website_link: attraction.website,
            tripadvisor_link: attraction.web_url,
            price: attraction.price,
            ranking: attraction.ranking
        };

        try {
            await axios.post('http://localhost:8000/api/experiences/', attractionInfo);
        } catch (error) {
            console.error('ADD ATTRACTION ', error);
        }
    };

    return (
        <div className="experiences">
            <h1>Attractions in {destinationCity}</h1>
            <div className="experiences__container">
                {attractions?.map(attraction => (
                    <div className="experiences__card" key={attraction.location_id}>
                        <img src={attraction.photo.images.large.url} alt={attraction.name} />
                        <div className="experiences__card-content">
                            <h2>{attraction.name}</h2>
                            <p className="experiences__ranking">{attraction.ranking}</p>
                            <p>
                                <span>Rating: </span> {Number(attraction.rating)}
                            </p>
                            <p>
                                <span>Reviews: </span> {attraction.num_reviews}
                            </p>
                            <p>
                                <span>Address: </span> {attraction.address}
                            </p>
                            <div className="experiences__websites">
                                {attraction.website && (
                                    <a href={attraction.website}>Website</a>
                                )}

                                {attraction.web_url && (
                                    <a href={attraction.web_url}>Tripadvisor link</a>
                                )}
                            </div>
                            <button onClick={() => addAttractionToTrip(attraction)}>
                                Add to Trip
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Attractions;
