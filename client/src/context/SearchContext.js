import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [copy, setCopy] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const searchPost = async () => {
      const datas = await axios.get("/posts");
      setSearchedPosts(datas.data);
      setCopy(datas.data);
    };
    searchPost();
  }, []);

  useEffect(() => {
    setSearchedPosts(
      copy.filter(
        (e) => e.title.includes(searchKeyword) || e.desc.includes(searchKeyword)
      )
    );
  }, [searchKeyword, copy]);

  return (
    <SearchContext.Provider
      value={{
        searchedPosts,
        setSearchedPosts,
        copy,
        setCopy,
        setSearchKeyword,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
