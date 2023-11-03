import { createContext, useState, useContext, ReactNode } from 'react';

export const AppContext = createContext<AppContextProps | null>(null);

interface AppContextProps {
  keyword: string | undefined;
  setKeyword: React.Dispatch<React.SetStateAction<string | undefined>>;
  tabIndex: number;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
  tagId: string | undefined;
  setTagId: React.Dispatch<React.SetStateAction<string | undefined>>;
  postContent: string | undefined;
  setPostContent: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleTagClick: (tagId: string) => void;
}

// Providing a default value matching the shape of the interface
const defaultContextValue: AppContextProps = {
  keyword: undefined,
  setKeyword: () => {},
  tabIndex: 0,
  setTabIndex: () => {},
  tagId: undefined,
  setTagId: () => {},
  postContent: undefined,
  setPostContent: () => {},
  handleTagClick: () => {},
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [keyword, setKeyword] = useState<string | undefined>();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [tagId, setTagId] = useState<string | undefined>();
  const [postContent, setPostContent] = useState<string | undefined>();

  const handleTagClick = (tagId: string) => {
    console.log(tagId);
    setKeyword(undefined);
    setTabIndex(-1);
    setTagId(tagId);
  };

  const contextValue: AppContextProps = {
    keyword,
    setKeyword,
    tabIndex,
    setTabIndex,
    tagId,
    setTagId,
    postContent,
    setPostContent,
    handleTagClick,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
