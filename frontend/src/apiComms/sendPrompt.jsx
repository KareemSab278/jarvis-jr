import { useDispatch } from "react-redux";
import { pushMessage, updateMessage } from "../storage/chatSlice";

const API_URL = "http://localhost:8000/api/chat";
const CODING_MODEL = "qwen2.5-coder:3b";

export const useSendPrompt = () => {
  const dispatch = useDispatch();

  const sendPrompt = async (prompt) => {
    try {
      const loadingTs = Date.now();
      dispatch(
        pushMessage({
          isJarvisJr: true,
          text: "",
          ts: loadingTs,
        })
      );
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt, model: CODING_MODEL }),
      });

      if (!response.ok)
        throw new Error(`API request failed with status ${response.status}`);

      const data = await response.json();
      if (!data?.content || data.content.length === 0)
        throw new Error("API response content is empty");
      // update the previous loading message with the real content
      dispatch(
        updateMessage({
          ts: loadingTs,
          text: data?.content,
        })
      );
      console.log("API response data:", data);
    } catch (error) {
      if (typeof loadingTs !== "undefined") {
        dispatch(
          updateMessage({
            ts: loadingTs,
            text: `Error: ${error.message}`,
          })
        );
      }
      console.error("Error making API request:", error);
      throw error;
    }
  };
  return sendPrompt;
};
