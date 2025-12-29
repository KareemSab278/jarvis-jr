import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import currentChatReducer from './currentChatSlice';

export const store = configureStore({
     reducer: {
    chat: chatReducer,
    currentChatName: currentChatReducer
  }
});