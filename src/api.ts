import {
  LoginFormData,
  PostCard,
  PostContent,
  PostCreate,
  Tag,
  fetchAllPostsValues,
  fetchPostValues,
  fetchTagsValues,
} from './types/types';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchPost = (vals: fetchPostValues) =>
  fetch(`${API_URL}/posts/${vals.username}/${vals.slug}`, {
    method: 'GET',
    headers: { 'X-API-KEY': API_KEY },
  })
    .then((res) => res.json())
    .then((data: PostContent) => {
      vals.setPostContent(data.content);
      return data;
    });

export const fetchAllPosts = (vals: fetchAllPostsValues) => {
  let url = `${API_URL}/posts/?`;

  if (vals.keyword) {
    url = `${url}keyword=${vals.keyword}`;
  } else if (vals.tagId) {
    url = `${url}tag_id=${vals.tagId}`;
  } else if (vals.categoryList) {
    url = `${url}category=${vals.categoryList[vals.tabIndex ? vals.tabIndex : 0]}`;
  } else if (vals.userId) {
    url = `${url}user_id=${vals.userId}`;
  }

  return fetch(url, { method: 'GET', headers: { 'X-API-KEY': API_KEY } })
    .then((res) => res.json())
    .then((data: PostCard[]) => data);
};

export const fetchAllPost = (vals: fetchAllPostsValues) => {
  let url = `${API_URL}/posts/?`;

  if (vals.keyword) {
    url = `${url}keyword=${vals.keyword}`;
  } else if (vals.tagId) {
    url = `${url}tag_id=${vals.tagId}`;
  } else {
    url = `${url}category=${vals.categoryList[vals.tabIndex ? vals.tabIndex : 0]}`;
  }

  return fetch(url, { method: 'GET', headers: { 'X-API-KEY': API_KEY } })
    .then((res) => res.json())
    .then((data: PostCard[]) => data);
};

export const fetchAllTags = (vals: fetchTagsValues) =>
  fetch(`${API_URL}/tags/${vals.tagId}`, {
    method: 'GET',
    headers: { 'X-API-KEY': API_KEY },
  })
    .then((res) => res.json())
    .then((data: Tag) => data);

export const fetchAllMasterTags = () =>
  fetch(`${API_URL}/tags/`, {
    method: 'GET',
    headers: { 'X-API-KEY': API_KEY },
  })
    .then((res) => res.json())
    .then((data: Tag[]) => data);

export const postBlog = async (data: PostCreate) => {
  const { token, ...rest } = data;
  const response = await fetch(`${API_URL}/post/`, {
    method: 'POST',
    headers: {
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...rest }),
  });

  if (!response.ok) {
    const errorData = response.json();
    throw new Error(errorData.detail || 'An error occurred during post');
  }

  return response.json();
};

export const login = async (data: LoginFormData) => {
  const formData = new FormData();
  formData.append('username', data.username);
  formData.append('password', data.password);

  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'An error occurred during login');
  }

  return response.json();
};

export const validateToken = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/validate`, {
      headers: {
        'X-API-KEY': API_KEY,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    return false;
  }
};

interface deleteProps {
  postId: string;
  token: string;
}

export const deletePost = async (vals: deleteProps) => {
  const response = await fetch(`${API_URL}/posts/${vals.postId}`, {
    method: 'DELETE',
    headers: {
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${vals.token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return await response.json();
};

interface uploadProps {
  file: File; // Assuming you're uploading a single file
  token: string;
}

export const uploadImage = async (vals: uploadProps) => {
  // Create an instance of FormData
  const formData = new FormData();

  // Append the file to the FormData instance
  formData.append('file', vals.file);

  // Make the POST request to the upload endpoint
  const response = await fetch(`${API_URL}/upload_image`, {
    method: 'POST',
    headers: {
      'X-API-KEY': API_KEY,
      // 'Content-Type': 'multipart/form-data' is not needed, the browser sets it along with the boundary
      Authorization: `Bearer ${vals.token}`,
    },
    body: formData, // Pass the formData as the body of the request
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return await response.json();
};
