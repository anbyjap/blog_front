import { Post, Tag, fetchPostValues, fetchTagsValues } from './types/types';

export const fetchAllPost = (vals: fetchPostValues) => {
  let url = `${vals.apiURL}/posts/?`;

  if (vals.keyword) {
    url = `${url}keyword=${vals.keyword}`;
  } else if (vals.tagId) {
    url = `${url}tag_id=${vals.tagId}`;
  } else {
    url = `${url}category=${vals.categoryList[vals.tabIndex ? vals.tabIndex : 0]}`;
  }

  return fetch(url)
    .then((res) => res.json())
    .then((data: Post[]) => data);
};

export const fetchAllTags = (vals: fetchTagsValues) =>
  fetch(`${vals.apiURL}/tags/${vals.tagId}`)
    .then((res) => res.json())
    .then((data: Tag) => data);
