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
}

export interface GlobalProps {
  keyword: string | undefined;
  setKeyword: (a?: string) => void;
  tabIndex: number;
  setTabIndex: (a: number) => void;
}
