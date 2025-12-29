export { App };

import { InputField } from "./components/InputFieldComponent";
import { useSelector } from "react-redux";
import { ChatBubbleComponent } from "./components/ChatBubbleComponent";
import { useEffect } from "react";

const bodyStyle = { width: "90%", margin: "0 auto" };

const App = () => {
  const chatEntries = useSelector((state) => state.chat);
  useEffect(() => {
    console.log("Chat Entries Updated:", chatEntries);
  }, [chatEntries]);

  return (
    <section style={bodyStyle}>
      {chatEntries.length > 0 &&
        chatEntries.map((msg, index) => (
          <ChatBubbleComponent
            key={index}
            message={msg?.text}
            timestamp={msg?.ts}
            isJarvisJr={msg?.isJarvisJr || false}
          />
        ))}
      <InputField />
      {chatEntries.length === 0 && (
        <>
          <h1>New Chat</h1>
        </>
      )}
    </section>
  );
}
