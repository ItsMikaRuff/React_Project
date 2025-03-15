import { useContext } from "react";
import { PostsContext } from "../context/PostsContext";
import { Link, useParams } from "react-router-dom";
import style from '../css/PostDetails.css'

const PostDetails = () => {
    const { posts } = useContext(PostsContext);
    const { id } = useParams();

    const post = posts.find((p) => p.id === (id));

    if (!post) {
        return <div>
            <h1 className="error-message">Page not found</h1>
            <Link to="/" className="back-link">⬅ Back to all posts</Link>
        </div>
    }

    return (
        <div className="post-details-container">
            <div className="post-card">
                <h2 className="post-title">{post.title}</h2>
                <h4>price: {post.price}$</h4>

                <h3>Reviews:</h3>

                {post.reviews && post.reviews.length > 0 ? (
                    <ul className="reviews-list">
                        {post.reviews.map((review, index) => (
                            <li key={index} className="review-item">
                                <strong>{review.user}:</strong> {review.comment} (⭐ {review.rating}/5)
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-reviews">No reviews yet.</p>
                )}

                <Link to="/" className="back-link">⬅ Back to all posts</Link>
                <Link to={`/edit-post/${post.id}`} className="btn btn-edit"> Edit Post</Link>
                <Link to={`/add-review/${post.id}`} className="btn btn-add-review">Add Review</Link>
                <Link to={`/delete/${post.id}`} className="btn btn-delete">Delete Post</Link>
            </div>
        </div>
    );
};

export default PostDetails;