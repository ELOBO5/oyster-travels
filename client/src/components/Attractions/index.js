import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { getPlacesData } from '../../apis/places';
import { addAttractions } from '../../redux/actions';
import AttractionDetail from '../AttractionDetail';
import './styles.css';

const Attractions = () => {
    const dispatch = useDispatch();
    const { bounds, attractions, destinationCity } = useSelector(state => state);

    useEffect(() => {
        const setAttractionData = async () => {
            if (!bounds.sw && !bounds.ne) return;
            const attractions = await getPlacesData('attractions', bounds.sw, bounds.ne);
            const filteredAttractions = attractions.filter(attractions => attractions.photo);
            dispatch(addAttractions(filteredAttractions));
        };

        setAttractionData();
    }, [bounds, dispatch]);

    return (
        <>
            {!attractions.length ? (
                <div className="center">
                    <CircularProgress />
                </div>
            ) : (
                <div className="experiences">
                    <h1>Attractions in {destinationCity}</h1>
                    <div className="experiences__container">
                        {attractions?.map(attraction => (
                            <AttractionDetail attraction={attraction} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Attractions;
