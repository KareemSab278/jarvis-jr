import { createSlice } from '@reduxjs/toolkit';

const currentChatSlice = createSlice({
  name: 'currentChatName',
  initialState: '',
  reducers: {
    setCurrentChatName(state, action) {
      return action.payload;
    }
  }
});

export const { setCurrentChatName } = currentChatSlice.actions;
export default currentChatSlice.reducer;