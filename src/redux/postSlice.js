import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('http://localhost:1337/api/posts?_sort=created_at:desc&_limit=6');
  const data = await response.json();
  return data;
});

const postSlice = createSlice({
  name: 'posts',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default postSlice.reducer; 