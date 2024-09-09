// src/services/apiService.js

import axios from 'axios';


// api lấy bài đăng
const API_BASE_URL = 'http://localhost:8080/api';

export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/getAllPosts`);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPostsByUser = async(userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/getByUser/${userId}`)
    console.log(response);
    return response.data
  } catch (error) {
    throw error;
    
  }
}

export const AddPost = async (userId, content) => {
  try {
    console.log("userId: " + userId + ", content: " + content);
    const response = await axios.post('http://localhost:8080/api/posts/add', null, {
      params: {
        userId: userId,
        content: content
      }
    });
    console.log(response);
    return response.data; // Trả về response.data nếu cần xử lý kết quả ở phía gọi API
  } catch (error) {
    console.error('Error adding post:', error);
    throw error; // Ném lỗi để xử lý ở nơi gọi API nếu cần
  }
};

export const countLikeByPostId = async (postId) => {
  // console.log(postId);
  try {
    const response = await axios.get(`${API_BASE_URL}/likes/post/${postId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AddLike = async (userId, postId) => {
  try {
    const response = await axios.post('http://localhost:8080/api/likes/add', null, {
      params: {
        userId: userId,
        postId: postId
      }
    });
    // console.log(response.data);
    return 1;
  } catch (error) {
    console.error('Error liking post:', error);
    throw error; // Throw error to handle it in the caller function if needed
  }
};

export const RemoveLike = async (userId, postId) => {
  try {
    const response = await axios.delete('http://localhost:8080/api/likes/delete', {
      params: {
        userId: userId,
        postId: postId
      }
    })
    // console.log(response);
  } catch (error) {
    console.error('Error liking delete:', error);
    throw error;

  }
}

//comments
export const GetComments = async(postId)=>{
  try {
    const response = await axios.get(`http://localhost:8080/api/comments/post/${postId}/users-comments`)
    //console.log(postId);
    //console.log(response.data);
    return response.data
  } catch (error) {
    console.log("lỗi lấy comments: "+ error);
  }
}
export const AddComment = async(postId, userId, content)=>{
  try {
    const response = await axios.post('http://localhost:8080/api/comments/add', null, {
      params: {
        userId: userId,
        postId: postId,
        content: content,
      }})
    console.log(response);
    return response
  } catch (error) {
    console.log("lỗi lấy comments: "+ error);
  }
}



export const getUserById = async(userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/users/${userId}`)
    console.log(response);
    return response.data.data
  } catch (error) {
    throw error;
    
  }
  //return axios.get(`${API_BASE_URL}/user/users/${userId}`);
};

export const createUser = (user) => {
  return axios.post(`${API_BASE_URL}/users`, user);
};

export const deleteUser = (id) => {
  return axios.delete(`${API_BASE_URL}/users/${id}`);
};

// Thêm các hàm gọi API khác nếu cần
