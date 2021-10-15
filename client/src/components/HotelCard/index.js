import useReactionInfo from '../../hooks/useReactionInfo';

const HotelCard = ({ hotel, userReactions }) => {
    const {
        likeCount,
        dislikeCount,
        userHasLiked,
        userHasDisliked,
        handleLike,
        handleDislike
    } = useReactionInfo(hotel, userReactions);

    return (
        <div className="experiences">
            <div className="experiences__container">
                <div className="experiences__card">
                    <img src={hotel.image} alt={hotel.name} />
                    <div className="experiences__card-content">
                        <h2>{hotel.name}</h2>
                        <p>{hotel.ranking}</p>
                        <p>Rating: {Number(hotel.rating)}</p>
                        <p>Reviews: {hotel.review_count}</p>
                        {hotel.price && <p>Price range: {hotel.price}</p>}

                        {/* Reactions */}
                        <div className="flex-row">
                            <span>{likeCount}</span>
                            <button onClick={handleLike}>
                                {userHasLiked ? 'Remove Upvote' : 'Upvote'}
                            </button>
                            <span>{dislikeCount}</span>
                            <button onClick={handleDislike}>
                                {userHasDisliked ? 'Remove Downvote' : 'Downvote'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;
