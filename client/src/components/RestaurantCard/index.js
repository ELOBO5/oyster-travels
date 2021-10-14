import useReactionInfo from '../../hooks/useReactionInfo';

const RestaurantCard = ({ restaurant, userReactions }) => {
    const {
        likeCount,
        dislikeCount,
        userHasLiked,
        userHasDisliked,
        handleLike,
        handleDislike
    } = useReactionInfo(restaurant, userReactions);

    return (
        <div className="experiences">
            <div className="experiences__container">
                <div className="experiences__card">
                    <img src={restaurant.image} alt={restaurant.name} />
                    <div className="experiences__card-content">
                        <h2>{restaurant.name}</h2>
                        <p className="experiences__ranking"> {restaurant.ranking}</p>
                        <p>
                            <span>Rating: </span> {Number(restaurant.rating)}
                        </p>
                        <p>
                            <span>Reviews: </span> {restaurant.review_count}
                        </p>

                        <p>
                            <span>Price range:</span> {restaurant.price}
                        </p>
                        <p>
                            <span>Address:</span> {restaurant.address}
                        </p>
                        <div className="experiences__cuisine">
                            {restaurant.cuisine && <p>Cuisine: {restaurant.cuisine}</p>}
                        </div>
                        <div className="experiences__websites">
                            {restaurant.website_link && (
                                <a href={restaurant.website_link}>Website</a>
                            )}
                            {restaurant.tripadvisor_link && (
                                <a href={restaurant.tripadvisor_link}>Tripadvisor link</a>
                            )}
                        </div>
                        {/* Reactions */}
                        <div className="flex-row">
                            <span>{likeCount}</span>
                            <button onClick={handleLike}>
                                {userHasLiked ? 'Unlike' : 'Like'}
                            </button>
                            <span>{dislikeCount}</span>
                            <button onClick={handleDislike}>
                                {userHasDisliked ? 'Neutral' : 'Dislike'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
