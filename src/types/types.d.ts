export interface Post {
  username: string;
  post_id: string;
  user_id: string;
  title: string;
  description: string;
  summary: string;
  content: string;
  is_published: string;
  slug: string;
  like: string;
  dislike: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  tag_urls: Tag[];
}

export interface GlobalProps {
  keyword: string | undefined;
  setKeyword: (a?: string) => void;
  tabIndex: number;
  setTabIndex: (a: number) => void;
  tagId: string | undefined;
  setTagId: (a?: string) => void;
  setCurrentPost: (a?: Post) => void;
}

export interface Tag {
  tag_id: string;
  tag_name: string;
  url: str;
}

export interface fetchPostValues {
  keyword?: string;
  tagId?: string;
  tabIndex?: number;
  categoryList: string[];
}

export interface fetchTagsValues {
  tagId?: string;
}
