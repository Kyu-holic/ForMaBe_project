import axios from "axios";

const DELETE_URL = "/posts/";

//delete post
const postDelete = async (postData) => {
  console.log("postData :", postData);
  const response = await axios.delete(DELETE_URL + postData.id, {});
  console.log(response.data);
};

const postService = {
  postDelete,
};

export default postService;
