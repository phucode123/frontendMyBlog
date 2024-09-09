import { useParams } from "react-router-dom"
import styles from './userpage.module.scss'
import { getPostsByUser, getUserById } from "../../library/service/ApiService";
import { useState , useEffect} from "react";
import Post from "../Home/Post";

export default function UserPage(){
    const { id } = useParams();
    console.log(id);
    const [posts, setPosts] = useState([])
    const [userSelected, setUserSelected] = useState(null)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                console.log('Fetching posts for user ID:', id);
                const data = await getPostsByUser(id);
                console.log('Posts data:', data);
                const userSelect = await getUserById(id);
                console.log('User data:', userSelect);

                const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(sortedData);
                setUserSelected(userSelect);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, [id]);

    if (!userSelected) {
        return <div>Loading...</div>;
    }


    return (
        <div className={styles.userpage}>
        <div className={styles.backgroundimg}>
            <img src={'https://img4.thuthuatphanmem.vn/uploads/2020/08/28/hinh-nen-hai-huoc-cho-desktop_085721455.jpg'} alt="Background" />
        </div>
        <div className={styles.avatar}>
            <img src={'https://scr.vn/wp-content/uploads/2020/07/Background-c%E1%BB%B1c-b%E1%BB%B1a-606x1024.jpg'} alt="Avatar" />
        </div>
        <div className={styles.userinfo}>
            <h1>{userSelected.username}</h1>
            <p>Email: {userSelected.email}</p>
            {/* {!isFriend && <button >Kết bạn</button>} */}
            <button>Add friend</button>
        </div>
        <div className={styles.userposts}>
            <h2>Bài viết</h2>
            {
                posts.map((post, index) => {
                    return <Post key={index} post={post} />
                })
            }
            
        </div>
    </div>
    )
}