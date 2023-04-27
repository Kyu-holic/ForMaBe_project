// reducer initial state
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  isError: false,
  isSuccess: false,
  message: "",
};

// Delete post
export const deletePost = createAsyncThunk(
  "/posts/:id",
  async (post, thunkAPI) => {
    try {
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

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.post = action.payload;
    });
  },
});

export default postSlice.reducer;
