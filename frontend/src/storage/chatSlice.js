import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: [],
  reducers: {
    pushMessage(state, action) {
      state.push(action.payload);
    },
    clearChat() {
      return [];
    },
    loadChat(state, action) {
      return action.payload;
    },
    updateMessage(state, action) {
      const { ts, text } = action.payload;
      const idx = state.findIndex((m) => m.ts === ts);
      if (idx !== -1) {
        state[idx] = { ...state[idx], text };
      }
    },
  },
});

export const { pushMessage, clearChat, loadChat, updateMessage } =
  chatSlice.actions;
export default chatSlice.reducer;
// my dumbahh gon forger this
// send a messae:
// dispatch(pushMessage({
//   role: 'user',
//   content: userInput,
//   ts: Date.now()
// }))

// get a message:
// dispatch(pushMessage({
//   role: 'assistant',
//   content: response,
//   ts: Date.now()
// }))

// load a chat:
// dispatch(loadChat(loadedChat))
