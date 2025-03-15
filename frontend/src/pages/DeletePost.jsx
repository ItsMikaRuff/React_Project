import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {PostsContext} from "../context/PostsContext"
import axios from "axios";
import style from "../css/DeletePost.css"

const DeletePost = () => {

    const { id } = useParams();
    const navigate = useNavigate()
    const { posts, reload ,setReload} = useContext(PostsContext)
    const [selectedPost, setSelectedPost] = useState();

    useEffect(() => {
        if (posts) {
            const post = posts.find((po => po.id === id));
            console.log(post)
            setSelectedPost(post)
        }
    }, [posts]);


    const deletePost = async () => {

        try {
            await axios.delete(`http://localhost:5000/posts/${id}`)
            setReload(!reload)
            navigate("/")

        } catch (err) {

        }

    }

    return (
        <div className="delete-post-container">
            <div className="delete-card">
                <h1 className="delete-title">
                    Are you sure you want to delete <br /> "{selectedPost?.title}"?
                </h1>
                <div className="delete-buttons">
                    <button className="btn-delete" onClick={deletePost}>Delete</button>
                    <Link to="/" className="btn-back">Go back</Link>
                </div>
            </div>
        </div>
    );
}

export default DeletePost;