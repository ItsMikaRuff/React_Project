import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

export const PostsContext = createContext();

export function PostsProvider({ children }) {

    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [reload, setReload] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {

        const fetchData = async () => {
            try {
                setIsLoading(true)
                const postsData = await axios.get("http://localhost:5000/posts");
                setPosts(postsData.data)
                setIsLoading(false)

            } catch (err) {
                setError(err.message)
            }
        }

        fetchData();

    }, [reload])



    return <PostsContext.Provider value={{posts,isLoading,error,reload, setReload}}>
        
        {children}

    </PostsContext.Provider>
}