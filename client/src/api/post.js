import axios from "axios";

export const getPostsBySearchText = async (searchText) => {
  const res = await axios.get(`/posts/${searchText}`);
  return res.data;
};

export const userLogout = async () => {
  await axios.get("/users/logout");
};

export const userLogin = async (userRef, passwordRef) => {
  await axios.post("/users/login", {
    username: userRef.current.value,
    password: passwordRef.current.value,
  });
  console.log(userRef)
};
