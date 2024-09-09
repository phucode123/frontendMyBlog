import React, { useEffect, useState } from 'react';
import Post from "./Post"
import CreatePost from './createPost';
import { getAllPosts, countLikeByPostId } from '../../library/service/ApiService';
export default function Home() {
    //const [likes, setLikes] = useState(0);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [userCurrent, setuserCurrent] = useState(null);
    const [posted, setPosted] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            const userCu= JSON.parse(localStorage.getItem("user"))!=null?JSON.parse(localStorage.getItem("user")).data: null
            
            setuserCurrent(userCu);
            try {
                const data = await getAllPosts();
                const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(sortedData);
                // console.log(data);
            } catch (error) {
                // console.error('Error fetching posts:', error);
                setError(error);
            }
        };
        fetchPosts();
    }, [posted]);

    if (error) {
        return <div>Error fetching posts: {error.message}</div>;
    }
    return (
        <>
            <CreatePost user={userCurrent} setPosted= {setPosted} posted = {posted}/>
            {
                posts.map((post, index) => {
                    return <Post key={index} post={post} />
                })
            }
        </>
    )
}