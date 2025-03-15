    import { useFormik } from "formik";
    import { Link } from "react-router-dom";
    import style from "../css/AddProduct.css"
    import { useContext, useState } from "react";
    import { PostsContext } from "../context/PostsContext";
    import axios from "axios";

    const AddProduct = () => {
        
        const {posts, reload, setReload } = useContext(PostsContext);
        const [submitMessage, setSubmitMessage] = useState("");

        const formik = useFormik(
            {
            initialValues: {
                title: "",
                price: "",
                description: "",
            },

            validate: (values) => {
                const errors = {}; 
                if (values.title.length < 2) {
                    errors.title = "Title must be at least 2 characters";
                }

                if (values.price <= 0) {
                    errors.price = "Price must be a positive number";
                }

                if (values.description.length < 10) {
                    errors.description = "Description must be at least 10 characters";
                }

                return errors;
            },
            onSubmit: (values) => {
                

                const newPost = {
                    id: `${posts.length + 1}`,
                    title: values.title,
                    price: values.price,
                    description: values.description,
                    reviews: [],
                };

                const addPost = async () => {
                    try {
                        await axios.post("http://localhost:5000/posts", newPost);
                        setReload(!reload);
                        console.log("Post added successfully");
                        console.log(posts);
                        setSubmitMessage("Post added successfully");
                        formik.resetForm();
                        
                        
                    } catch (err) {
                        console.log(err);
                    }
                };

                addPost();
            
            }
        });

        return (
            <div className="add-product-container">

                <h1 className="title">Add Product</h1>

                {submitMessage && <p className="submit-message">{submitMessage}</p>}

                <form onSubmit={formik.handleSubmit} className="add-product-form">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                    <label style={{color:'red', fontSize:'10px'}}>{formik.errors.title}</label>

                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        onChange={formik.handleChange}
                        value={formik.values.price}
                    />
                    <label style={{color:'red', fontSize:'10px'}}>{formik.errors.price}</label>

                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                    <label style={{color:'red', fontSize:'10px'}}>{formik.errors.description}</label>

                    <button disabled={!formik.dirty || !formik.isValid} type="submit" className="btn btn-add">Add Product</button>
                </form>

                <div>
                    <Link to="/" className="back-link">⬅ Back to all posts</Link>
                </div>
            </div>

        )
    }

    export default AddProduct;