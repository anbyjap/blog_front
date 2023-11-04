export interface PostCard {
  post_id: string;
  emoji: string;
  title: string;
  is_published: string;
  slug: string;
  title: string;
  username: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  category: string;
}

export interface PostContent {
  emoji: string;
  title: string;
  content: string;
  created_at: string;
  username: string;
  title: str | None = None;
  tag_urls: List[TagURL] | None = None;
}

export interface GlobalProps {
  keyword: string | undefined;
  setKeyword: (a?: string) => void;
  tabIndex: number;
  setTabIndex: (a: number) => void;
  tagId: string | undefined;
  setTagId: (a?: string) => void;
  setCurrentPost?: (a?: PostCard) => void;
  postContent?: string;
}

export interface Tag {
  tag_id: string;
  tag_name: string;
  url: str;
}

export interface fetchPostValues {
  username: string;
  slug: string;
  setPostContent: (a: string) => void;
}

export interface fetchAllPostsValues {
  keyword?: string;
  tagId?: string;
  tabIndex?: number;
  userId?: string;
  categoryList?: string[];
}

export interface fetchTagsValues {
  tagId?: string;
}

export interface PostCreate {
  token: string;
  emoji: string;
  title: string;
  content: string;
  tags: string[];
  category: string;
  slug: string;
  emoji: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}
