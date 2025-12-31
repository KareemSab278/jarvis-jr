export { App };

import { InputField } from "./components/InputFieldComponent";
import { useSelector } from "react-redux";
import { ChatBubbleComponent } from "./components/ChatBubbleComponent";

const bodyStyle = { width: "90%", margin: "0 auto", marginBottom: "90px" };

const App = () => {
  const chatEntries = useSelector((state) => state.chat);

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
      
    </section>
  );
}
