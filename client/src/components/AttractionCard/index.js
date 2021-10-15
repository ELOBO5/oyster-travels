import useReactionInfo from '../../hooks/useReactionInfo';

const AttractionCard = ({ attraction, userReactions }) => {
    const {
        likeCount,
        dislikeCount,
        userHasLiked,
        userHasDisliked,
        handleLike,
        handleDislike
    } = useReactionInfo(attraction, userReactions);

    return (
        <div className="experiences">
            <div className="experiences__container">
                <div className="experiences__card">
                    <img src={attraction.image} alt={attraction.name} />
                    <div className="experiences__card-content">
                        <h2>{attraction.name}</h2>
                        <p className="experiences__ranking">{attraction.ranking}</p>
                        <p>
                            <span>Rating:</span> {Number(attraction.rating)}
                        </p>
                        <p>
                            <span>Reviews:</span> {attraction.review_count}
                        </p>

                        <p>
                            <span>Address:</span> {attraction.address}
                        </p>
                        <div className="experiences__websites">
                            {attraction.website_link && (
                                <a href={attraction.website_link}>Website</a>
                            )}

                            {attraction.tripadvisor_link && (
                                <a href={attraction.tripadvisor_link}>Tripadvisor</a>
                            )}
                        </div>
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

export default AttractionCard;
