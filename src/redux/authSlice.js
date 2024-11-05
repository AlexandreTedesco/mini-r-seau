import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk('auth/login', async ({ identifier, password }) => {
  const response = await fetch('http://localhost:1337/api/auth/local', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }),
  });
  return response.json();
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.jwt;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.jwt);
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
