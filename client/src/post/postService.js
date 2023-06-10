import axios from "axios";
import { getPostsBySearchText } from "../api/post";

const DELETE_URL = "/api/posts/";
const UPLOAD_URL = "/api/posts";

//delete post
const postDelete = async (postData) => {
  console.log("postData :", postData);
  const response = await axios.delete(DELETE_URL + postData.id, {});
  console.log(response.data);
};

//upload post
const postUpload = async (postData) => {
  const response = await axios.post(UPLOAD_URL);
  console.log(response.data);
};

const postRead = async (search) => {
  return await getPostsBySearchText(search);
};

const postService = {
  postDelete,
  postUpload,
  postRead,
};

export default postService;
