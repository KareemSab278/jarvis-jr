export { App };

import { InputField } from "./components/InputFieldComponent";
import { useSelector } from "react-redux";
import { chatTitleStyle, appBodyStyle } from "./ThemeAndStyle.jsx";
import { ChatBubbleComponent } from "./components/ChatBubbleComponent";

const App = () => {
  const chatEntries = useSelector((state) => state.chat);
  const currentChatName = useSelector((state) => state.currentChatName);

  return (
    <>
      <h2 style={chatTitleStyle}>{currentChatName || "Chat not selected"}</h2>
      <section style={appBodyStyle}>
        {chatEntries.length > 0 ? (
          chatEntries.map((msg, index) => (
            <ChatBubbleComponent
              key={index}
              message={msg?.text}
              isJarvisJr={msg?.isJarvisJr || false}
            />
          ))
        ) : (
          <p style={{ fontSize: 15, marginTop: 50, textAlign: "center" }}>
            Chats are not automatically saved. <br /> Remember to save them if
            you want to keep them.
          </p>
        )}
        <InputField />
      </section>
    </>
  );
};
