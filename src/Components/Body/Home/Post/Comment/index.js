import { useEffect, useState } from 'react';
import styles from './Comment.module.scss'
import { FaPaperPlane, FaEllipsisH } from 'react-icons/fa';
import { FormatTime } from '../../../../library/formatTime';
import { AddComment } from '../../../../library/service/ApiService';

export default function Comment({userCurrent, post, setonClose, data , setCommented, commented}) {
    //    console.log(post);
    const [content, setContent] = useState('');
    //const [userCurrent, setuserCurrent] = useState(userCurrent!= null? userCurrent: null)


    function close() {
        setonClose(true)
    }
    const handleContentChange = (event) => {
        setContent(event.target.value);
    };
    const handleSubmit = async () => {    
        console.log('Nội dung bài viết:', content);
        try {
            const response = await AddComment(post.postId , userCurrent.id , encodeURIComponent(content));
            console.log(response);
            setCommented(!commented)
            setContent('')

        } catch (error) {
            console.error('Error fetching posts:', error);
            
        }
       
    };
    return (

        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.headerComment}>
                    <div></div>
                    <h3>Bài viết của {post.user.username}</h3>
                    <button className={styles.close} onClick={close}>×</button>
                </div>
                <div className={styles.modalPost}>
                    <div className={styles.headerPost}>
                        <div className={styles.formAvatar}></div>
                        <div className={styles.detailPost}>
                            <h3>{post.user.username}</h3>
                            <p className={styles.createdAt}>{FormatTime(post.createdAt)}</p>
                        </div>
                    </div>
                    <p >{decodeURIComponent(post.content)}</p>
                </div>
                <div className={styles.commentsSection}>
                    {
                        data != null && data.length > 0 ? (
                            data.map((comment, index) => {
                                return (
                                    <div className={styles.containerCmt}>
                                        <div key={index} className={styles.comment}>
                                            <div className={styles.formAvatar}>
                                                <img src={'https://images4.alphacoders.com/641/thumb-1920-641968.jpg'} alt="Avatar" className={styles.avatarImage} />
                                            </div>
                                            <div className={styles.detailComment}>
                                                <div className={styles.contentComment}>
                                                    <strong>{comment.user.username}</strong>
                                                    <p>{decodeURIComponent(comment.content)}</p>
                                                </div>
                                                <div className={styles.createdAt}>
                                                    {FormatTime(comment.createdAt)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.ActionOthers}>
                                            <FaEllipsisH className={styles.icon} />
                                        </div>
                                    </div>

                                )
                            })
                        ) :
                            (<p className={styles.notificationNull}>Không có bình luận nào về bài viết này, bạn hãy là người đầu tiên!</p>)
                    }


                </div>
                <div className={styles.commentInput}>
                    <input type="text" onChange={handleContentChange} placeholder={`Viết cảm nghĩ của bạn đi ${userCurrent.username}`} />
                    <button className={styles.sendComment} onClick= {handleSubmit}><FaPaperPlane /></button> {/* Use FaPaperPlane for send icon */}
                </div>
            </div>
        </div>
    )
}