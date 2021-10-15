import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const AttractionDetail = ({ attraction }) => {
    const tripId = useSelector(state => state.tripId);

    // This id comes from the server once we have made a POST request
    const [attractionId, setAttractionld] = useState(null);
    const [added, setAdded] = useState(false);

    const addAttractionToTrip = async attraction => {
        const attractionInfo = {
            trip: tripId,
            category: 'attraction',
            name: attraction.name,
            rating: parseFloat(attraction.rating),
            review_count: parseInt(attraction.num_reviews),
            image: attraction.photo.images.large.url,
            address: attraction.address,
            website_link: attraction.website,
            tripadvisor_link: attraction.web_url,
            ranking: attraction.ranking
        };

        try {
            const { data } = await axios.post(
                'https://oystertravel.herokuapp.com/api/experiences/',
                attractionInfo
            );
            setAttractionld(data.id);
            setAdded(true);
        } catch (error) {
            console.error('ADD ATTRACTION ', error);
        }
    };

    const removeAttractionFromTrip = async () => {
        try {
            await axios.delete(`https://oystertravel.herokuapp.com/api/experiences/${attractionId}/`);
            setAdded(false);
        } catch (error) {
            console.error('REMOVE ATTRACTION ', error);
        }
    };

    const handleClick = () => {
        if (!added) {
            addAttractionToTrip(attraction);
        } else {
            removeAttractionFromTrip();
            setAttractionld(null);
        }
    };

    return (
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
                    {attraction.website && <a href={attraction.website}>Website</a>}

                    {attraction.web_url && <a href={attraction.web_url}>Tripadvisor link</a>}
                </div>
                <button onClick={handleClick}>
                    {!added ? 'Add to Trip' : 'Remove from trip'}
                </button>
            </div>
        </div>
    );
};

export default AttractionDetail;
