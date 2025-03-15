import { useFormik } from "formik";
import { Link, useParams } from "react-router-dom";
import style from "../css/EditPost.css"
import { useContext, useState } from "react";
import { PostsContext } from "../context/PostsContext";
import axios from "axios";

const EditProduct = () => {

    const { posts, reload, setReload } = useContext(PostsContext);
    const [submitMessage, setSubmitMessage] = useState("");

    const { id } = useParams();

    const post = posts? posts.find((p) => p.id === (id)) : null;

    const formik = useFormik({
        initialValues: {
            title: post?.title ||"",
            price: post?.price|| "",
            description: post?.description || "",
        },

        enableReinitialize: true,

        validate: (values) => {
            
            const errors = {};

            if (!values.title || values.title.length < 2) {
                errors.title = "Title must be at least 2 characters";
            }

            if (!values.price || values.price <= 0) {
                errors.price = "Price must be a positive number";
            }

            if (!values.description || values.description.length < 10) {
                errors.description = "Description must be at least 10 characters";
            }

            return errors;
        },
        onSubmit: async (values) => {
            try {
                await axios.put(`http://localhost:5000/posts/${id}`, values);
                console.log("Post Edited successfully");
                setSubmitMessage("Post Edited successfully");
                setReload(!reload);

            } catch (err) {
                console.error("Error updating post:", err);
                setSubmitMessage("Failed to update post.");
            }
        }
    });


    if (!post) {
        return <h1>Post not found.</h1>;
    }
    return (
        <div className="edit-product-container">

            <h1 className="title">Edit Product</h1>
            <h2>{post.title}</h2>
            {submitMessage && <p className="submit-message">{submitMessage}</p>}

            <form onSubmit={formik.handleSubmit} className="edit-product-form">

                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"

                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
                <label style={{ color: 'red', fontSize: '10px' }}>{formik.errors.title}</label>

                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                />
                <label style={{ color: 'red', fontSize: '10px' }}>{formik.errors.price}</label>

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                />
                <label style={{ color: 'red', fontSize: '10px' }}>{formik.errors.description}</label>

                <button disabled={!formik.dirty || !formik.isValid} type="submit" className="btn btn-add">Save changes</button>
            </form>

            <div>
                <Link to="/" className="back-link">⬅ Back to all posts</Link>
            </div>
        </div>

    )
}

export default EditProduct;