import {
  PostCard,
  PostContent,
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
    .then((data: PostContent) => data);

export const fetchAllPosts = (vals: fetchAllPostsValues) => {
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
