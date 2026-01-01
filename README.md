# Jarvis Jr

A small personal project: a local frontend UI that talks to a tiny backend which forwards prompts to a local LLM service. Built over a holiday for experimentation and tinkering.

## Quick overview

- Frontend: React + Vite UI in [frontend](frontend). Main entry: [`App`](frontend/src/App.jsx) and [`main.jsx`](frontend/src/main.jsx).
- Backend: FastAPI wrapper in [backend/api.py](backend/api.py) exposing a single endpoint [`prompt_to_chat`](backend/api.py) (`POST /api/chat`) that forwards requests to a locally running LLM service.
- Local storage helpers: [frontend/src/storage/LS.js](frontend/src/storage/LS.js).
- Redux: store is at [`store`](frontend/src/storage/store.js). Core reducers: [`chatSlice`](frontend/src/storage/chatSlice.js) and [`currentChatSlice`](frontend/src/storage/currentChatSlice.js).

## Important files / symbols

- Backend API: [`api`](backend/api.py) — main FastAPI app and [`prompt_to_chat`](backend/api.py) handler.
- Frontend hook that sends prompts: [`useSendPrompt`](frontend/src/apiComms/sendPrompt.jsx) (adjust `API_URL` there).
- Redux store: [`store`](frontend/src/storage/store.js).
- Chat actions: [`pushMessage`](frontend/src/storage/chatSlice.js), [`updateMessage`](frontend/src/storage/chatSlice.js).
- LocalStorage helpers: [`saveChatToLS`](frontend/src/storage/LS.js), [`loadChatFromLS`](frontend/src/storage/LS.js), [`getAllChatsFromLS`](frontend/src/storage/LS.js), [`removeChatFromLS`](frontend/src/storage/LS.js), [`renameChatInLS`](frontend/src/storage/LS.js).
- UI components: [`DrawerComponent`](frontend/src/components/DrawerComponent.jsx), [`ChatBubbleComponent`](frontend/src/components/ChatBubbleComponent.jsx), [`InputField`](frontend/src/components/InputFieldComponent.jsx).

## Run locally

1. Start the LLM service expected at http://localhost:11434 (your local LLM).
2. Backend

   - From the `backend` folder run:
     ```
     python -m uvicorn api:api --reload
     ```
   - This serves the forwarding API used by the frontend at `http://localhost:8000` (default).
   - The forwarding logic is in [`prompt_to_chat`](backend/api.py) and it posts to the LLM at `http://localhost:11434/api/chat`.

3. Frontend

   - From the `frontend` folder:
     ```
     npm install
     npm run dev
     ```
   - Open the Vite URL shown (usually `http://localhost:5173`).

4. Configure
   - If your backend is running on a different port, update `API_URL` in [`frontend/src/apiComms/sendPrompt.jsx`](frontend/src/apiComms/sendPrompt.jsx).
   - If the local LLM endpoint differs, update the target inside [`backend/api.py`](backend/api.py).

## Usage

- Type a prompt into the input field (hold Ctrl+Enter or click the send button). The UI will:

  - add the user message via [`pushMessage`](frontend/src/storage/chatSlice.js),
  - insert a loading assistant message,
  - call [`useSendPrompt`](frontend/src/apiComms/sendPrompt.jsx),
  - then replace the loading message via [`updateMessage`](frontend/src/storage/chatSlice.js) with the LLM response.

- Save, rename, delete chats via the drawer using functions in [`frontend/src/storage/LS.js`](frontend/src/storage/LS.js).

## Notes and troubleshooting

- The backend simply proxies to your local LLM. If requests fail check that the LLM is running and reachable at the address used by [`backend/api.py`](backend/api.py).
- CORS in the backend allows the common local dev ports; update `origins` in [`backend/api.py`](backend/api.py) if needed.
- The frontend expects the backend response shape `{ "content": "..." }`. If your LLM returns a different structure, adapt [`backend/api.py`](backend/api.py) to normalize it.

## Where to start modifying

- Change prompt forwarding logic or system prompt: [`backend/api.py`](backend/api.py).
- Change frontend API URL or model selection: [`frontend/src/apiComms/sendPrompt.jsx`](frontend/src/apiComms/sendPrompt.jsx).
- UI and styles: [`frontend/src/ThemeAndStyle.jsx`](frontend/src/ThemeAndStyle.jsx) and component files in [`frontend/src/components`](frontend/src/components).

## Useful commands

- Frontend dev: `npm run dev` (see [frontend/package.json](frontend/package.json))
- Backend dev: `python -m uvicorn api:api --reload` (run from `backend/`)

---

This is a personal holiday project intended for local experimentation. Feel free to fork, star, and criticize.
