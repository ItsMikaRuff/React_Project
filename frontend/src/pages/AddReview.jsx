    import { useFormik } from "formik";
    import { Link, useParams } from "react-router-dom";
    import style from '../css/AddReview.css';
    import { useContext, useState } from "react";
    import { PostsContext } from "../context/PostsContext";
    import axios from "axios";

    const AddReview = () => {

        const { posts, reload, setReload } = useContext(PostsContext);
        const [submitMessage, setSubmitMessage] = useState("");

        const { id } = useParams();
        const post = posts ? posts.find((p) => p.id === id) : null;

        const formik = useFormik({
            initialValues: {
                user: "",
                comment: "",
                rating: "",
            },

            validate: (values) => {
                const errors = {};

                if (!values.user || values.user.length < 2) {
                    errors.user = "User must be at least 2 characters";
                }

                if (!values.comment || values.comment.length < 2) {
                    errors.comment = "Comment must be at least 2 characters";
                }

                const rating = parseInt(values.rating);
                if (isNaN(rating) || rating < 0 || rating > 5) {
                    errors.rating = "Rating must be a positive number between 0 and 5";
                }

                return errors;
            },
            onSubmit: (values) => {

                const addReview = async () => {

                    try {

                        const newReview = {
                            user: values.user,
                            comment: values.comment,
                            rating: values.rating,
                        };

                        if (post) {
                            const updatedReviews = [...post.reviews, newReview];
                            await axios.patch(`http://localhost:5000/posts/${id}`, { reviews: updatedReviews });
                            setReload(!reload)
                        }



                        console.log("Review added successfully");

                        setSubmitMessage("Review added successfully");
                        formik.resetForm();
                        setReload(!reload);

                    } catch (err) {
                        console.error("Error adding review:", err);
                        setSubmitMessage("Failed to add review.");
                    }
                };

                addReview();
            }
        });


        return <div className="add-review-container">

            <h1 className="title">Review Page</h1>
            {submitMessage && <p className="submit-message">{submitMessage}</p>}
            <form onSubmit={formik.handleSubmit} className="add-review-form">

                <label htmlFor="user">User:</label>
                <input
                    type="text"
                    id="user"
                    name="user"
                    onChange={formik.handleChange}
                    value={formik.values.user} />
                {formik.errors.user ? <div className="error-message">{formik.errors.user}</div> : null}

                <label htmlFor="comment">Comment:</label>
                <input
                    type="text"
                    id="comment"
                    name="comment"
                    onChange={formik.handleChange}
                    value={formik.values.comment}
                />
                {formik.errors.comment ? <div className="error-message">{formik.errors.comment}</div> : null}

                <label htmlFor="rating">Rating: (0-5)</label>
                <input
                    type="number"
                    id="rating"
                    name="rating"
                    onChange={formik.handleChange}
                    value={formik.values.rating}
                />
                {formik.errors.rating ? <div className="error-message">{formik.errors.rating}</div> : null}


                <button disabled={!formik.dirty || !formik.isValid} type="submit" className="btn-add">Add Review</button>
            </form>
            <Link to="/" className="back-link">⬅ Back to all posts</Link>

        </div>

    }

    export default AddReview;