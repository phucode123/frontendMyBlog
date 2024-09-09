
import { useState } from 'react'
import styles from './createPost.module.scss'
import { AddPost } from '../../../library/service/ApiService';

export default function CreatePost({ user , setPosted, posted}) {

    // console.log(user);
    const [userId, setUserid] = useState(user != null ? user.id : null);
    const [content, setContent] = useState('');

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form
        console.log('Nội dung bài viết:', content);
        try {
            const response = await AddPost(user.id, encodeURIComponent(content));
            console.log(response);
            setPosted(!posted);
            setContent('')

        } catch (error) {
            console.error('Error fetching posts:', error);
            //setError(error);
        }
        // Gọi API hoặc thực hiện các thao tác khác để lưu bài viết
        // Ví dụ:
        // addPost(userId, content);
    };
    return (
        <div className={styles.createPost}>
            <div className={styles.headerForm}>
                <div className={styles.headerText}>
                    <h3>Tạo bài viết</h3>
                </div>
                <p>{user != null ? user.username : ''}</p>
            </div>
            <form
                className={styles.contentPost}
                onSubmit={handleSubmit}
            >
                <textarea
                    value={content}
                    onChange={handleContentChange}
                    className={styles.textPostCreate}
                    placeholder="Viết bài..."
                    rows="4"
                    cols="50"
                />
                <br />
                <button className={styles.buttonSubmit} type="submit">Đăng bài</button>
            </form>
        </div>
    )
}