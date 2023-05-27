// reducer initial state
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  posts: [],
  keyword: "",
  isError: false,
  isSuccess: false,
  message: "",
};

// Get Post
export const getPost = createAsyncThunk("/posts", async (search, thunkAPI) => {
  try {
    const posts = await postService.postRead(search || "");
    return posts;
  } catch (err) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete post
export const deletePost = createAsyncThunk(
  "/posts/:id",
  async (post, thunkAPI) => {
    try {
      console.log("deletePost");
      return await postService.postDelete(post);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Upload post
export const uploadPost = createAsyncThunk("/posts", async (post, thunkAPI) => {
  try {
    return await postService.postUpload(post);
  } catch (err) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setKeyword: (state, payload) => {
      console.log("payload:", payload);
      console.log("state:", state);
      state.keyword = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.post = action.payload;
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export const { setKeyword } = postSlice.actions;

export default postSlice.reducer;
