import { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { drawerTheme, burgerSize, drawerStyle } from "../ThemeAndStyle";
import { loadChatFromLS, getAllChatsFromLS, saveChatToLS } from "../storage/LS";
import { setCurrentChatName } from "../storage/currentChatSlice";
import { useDispatch, useSelector } from "react-redux";
import { loadChat } from "../storage/chatSlice";
import { MenuComponent } from "./MenuComponent";
export { DrawerComponent };

const DrawerComponent = () => {
  const [open, setOpen] = useState(false);
  const [allChats, setAllChats] = useState(getAllChatsFromLS());
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat);
  const currentChatName = useSelector((state) => state.currentChatName);

  const refreshChats = useCallback(() => {
    setAllChats(getAllChatsFromLS());
  }, []);

  const confirmSaveChatToLS = () => {
    if (!currentChatName) {
      alert("No chat selected to save.");
      return;
    }
    if (!chat.length) {
      alert("Failed to save chat. Make sure your chat is not empty.");
      return;
    }
    const success = saveChatToLS(currentChatName, chat);
    if (success) {
      alert(`Chat "${currentChatName}" saved.`);
      refreshChats();
    } else {
      alert("Failed to save chat.");
    }
  };

  const handleNewChat = () => {
    const chatName = prompt("Enter a name for your new chat:");
    if (chatName) {
      dispatch(loadChat([]));
      dispatch(setCurrentChatName(chatName));
      refreshChats();
    }
  };

  const handleSelectChat = (chatName) => {
    const chat = loadChatFromLS(chatName);
    dispatch(loadChat(chat));
    dispatch(setCurrentChatName(chatName));
  };

  const toggleDrawer = (newOpen) => () => {
    if (newOpen) refreshChats();
    setOpen(newOpen);
  };

  const options = [
    {
      text: "New Chat",
      action: handleNewChat,
    },
    {
      text: "Save Current Chat",
      action: confirmSaveChatToLS,
    },
    ...allChats.map((chatName) => ({
      text: chatName,
      action: () => handleSelectChat(chatName),
    })),
  ];

const DrawerList = (
  <Box sx={drawerStyle}>
    <List>
      {options.map((i, option) => (
        <ListItem key={`${i}-${option.text}`} disablePadding>
          {i.text === "New Chat" || i.text === "Save Current Chat" ? (
            <ListItemButton onClick={i.action}>
              <ListItemText primary={i.text} />
            </ListItemButton>
          ) : (
            <>
              <ListItemButton onClick={() => { i.action(); toggleDrawer(false)(); }}>
                <ListItemText primary={i.text} />
              </ListItemButton>
              <MenuComponent chatName={i.text} onDelete={refreshChats} />
            </>
          )}
        </ListItem>
      ))}
    </List>
    <Divider />
  </Box>
);
  return (
    <div style={drawerStyle}>
      <Button onClick={toggleDrawer(true)} variant="filled">
        <MenuRoundedIcon sx={burgerSize.xl} />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)} slotProps={drawerTheme}>
        {DrawerList}
      </Drawer>
    </div>
  );
};
