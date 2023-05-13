import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";

const initialState = {
  keyword: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
}


// search Keyword


export const searchSlice = createSlice({
  name:"search",
  initialState,
  reducers:{

  },
  extraReducers:(builder)=>{
    builder.addCase()
  }
})
