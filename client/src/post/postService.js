import axios from "axios";

const DELETE_URL = "/posts/:id";

//delete post
const postDelete = async (postData) => {
  const response = await axios.delete(DELETE_URL, postData);
  console.log(response.data);
};

const postService = {
  postDelete,
};

export default postService;
