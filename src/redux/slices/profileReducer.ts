import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  menuExpanded: true,
  theme: 'light',
  user: {
    role: '',
    permissions: '',
    name: '',
    email: '',
  }
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: INITIAL_STATE,
  reducers: {
    toggleMenu(state) {
      state.menuExpanded = !state.menuExpanded;
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setUser (state, action) {
      state.user = action.payload;
    },
  },
});

export const { toggleMenu, setTheme, setUser } = profileSlice.actions;

export default profileSlice.reducer;
