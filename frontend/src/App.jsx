export { App };

import { InputField } from "./components/InputFieldComponent";
import { useSelector } from "react-redux";
import { ChatBubbleComponent } from "./components/ChatBubbleComponent";

const bodyStyle = { width: "90%", margin: "0 auto" };

const App = () => {
  const chatEntries = useSelector((state) => state.chat);
  const currentChatName = useSelector((state) => state.currentChatName);

  return (
    <section style={bodyStyle}>
      <h1>{currentChatName}</h1>
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
      
    </section>
  );
}
