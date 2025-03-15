import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PostsContext } from "../context/PostsContext";
import style from "../css/PostList.css"

const PostList = () => {
    const { posts, isLoading, error } = useContext(PostsContext);
    const [searchTerm, setSearchTerm] = useState("");

    if (isLoading) return <h1 className="loading">Loading...</h1>;
    if (error) return <h1 className="error">{error}</h1>;

    const filteredPosts = posts.filter((post) => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const titleMatch = post.title.toLowerCase().includes(lowercasedSearchTerm);
        const reviewsMatch = post.reviews && post.reviews.some(review =>
            review.comment.toLowerCase().includes(lowercasedSearchTerm)
        );
        return titleMatch || reviewsMatch;
    });

    return (

        <div className="post-list-container">
            <h1 className="list-title">Posts about my favorite skin-care products</h1>

            {/* שדה החיפוש */}

            <div className="search-container">
                <div className="search-wrapper">
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>


            {/* כפתור הוספת פוסט חדש */}

            <div>
                <Link to="/add-product" className="btn btn-add-post-link">Add new post</Link>
            </div>

            {/* רשימת הפוסטים */}
            
            <div className="posts-grid">

                {filteredPosts.map((p) => {
                    const reviewText = p.reviews && p.reviews.length > 0 ?
                        p.reviews.map(r => r.comment).join(" ").substring(0, 100) + "..." :
                        "No reviews yet.";

                    return (
                        <Link key={p.id} to={`/${p.id}`} className="post-card">
                            <h2>{p.title}</h2>
                            <p>{reviewText}</p>
                        </Link>
                    );
                })}

            </div>
        </div>


    );
};

export default PostList;