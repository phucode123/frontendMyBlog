// src/components/Post.js
import React, { useEffect, useState } from 'react';
import './Post.css';
import { FormatTime } from '../../../library/formatTime';
import { FaThumbsUp, FaComment } from 'react-icons/fa';
import { countLikeByPostId, AddLike, RemoveLike, GetComments } from '../../../library/service/ApiService';
import Comment from './Comment';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [liked, setLiked] = useState(false);
    const [commented, setCommented] = useState(false);
    const [userCurrent, setuserCurrent] = useState(null);
    const [timePost, setTimePost] = useState(null);
    const [onClose, setOnClose] = useState(true);

    const setUser = () => {
        const check = JSON.parse(localStorage.getItem("user"));
        const userCu = check ? check.data : null;
        return userCu;
    };

    useEffect(() => {
        const setup = async () => {
            setTimePost(FormatTime(post.createdAt));
            const user = setUser();
            setuserCurrent(user);

            const [responseLikes, responseCmt] = await Promise.all([
                countLikeByPostId(post.postId),
                GetComments(post.postId)
            ]);
            //console.log(responseLikes);

            if (user != null && responseLikes.includes(user.id)) {
                setLiked(true);
            }

           // console.log(post.content+ "co so cmt la: "+ responseCmt.length);
            setLikes(responseLikes.length);
            setComments(responseCmt); // Reset comments state with new data
        };

        setup();
    }, [post.postId, liked, commented]);

    const handleLike = async () => {
        if (userCurrent != null) {
            try {
                if (!liked) {
                    await AddLike(userCurrent.id, post.postId);
                    setLiked(true);
                } else {
                    await RemoveLike(userCurrent.id, post.postId);
                    setLiked(false);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.log("userCurrent is null");
        }
    };

    const handleComment = async () => {
        const user = setUser();
        setuserCurrent(user);
        setOnClose(!onClose);
        //setCommented(!commented); // Trigger a re-fetch of comments
    };

    return (
        <>
            <div className="post">
                <div className="post-header">
                    <Link to={`/user/${post.user.id}`}><h2>{post.user.username}</h2></Link>
                    <p>{timePost}</p>
                </div>
                <div className="post-content">
                    <p>{decodeURIComponent(post.content)}</p>
                </div>
                <div className="post-stats">
                    <p>{likes} likes</p>
                    <p>{comments ? comments.length : 0} comments</p>
                </div>
                <div className="post-actions">
                    <button onClick={handleLike} className={`${liked ? 'active' : ''}`}>
                        <FaThumbsUp /> Like
                    </button>
                    <button onClick={handleComment}>
                        <FaComment /> Comment
                    </button>
                </div>
            </div>
            {
                !onClose &&
                <Comment userCurrent={userCurrent} post={post} setonClose={setOnClose} data={comments} setCommented={setCommented} commented= {commented}/>
            }
        </>
    );
};

export default Post;
