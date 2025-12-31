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

  const refreshChats = useCallback(() => {
    setAllChats(getAllChatsFromLS());
  }, []);

  useEffect(() => {
    if (open) refreshChats();
  }, [open, refreshChats]);

  const handleNewChat = () => {
    const chatName = prompt("Enter a name for your new chat:");
    if (chatName) {
      dispatch(loadChat([]));
      dispatch(setCurrentChatName(chatName));
      saveChatToLS(chatName, []);
      refreshChats();
    }
    setOpen(false);
  };

  const handleSelectChat = (chatName) => {
    const chat = loadChatFromLS(chatName);
    dispatch(loadChat(chat));
    dispatch(setCurrentChatName(chatName));
    setOpen(false);
  };

  const toggleDrawer = (newOpen) => () => {
    if (newOpen) refreshChats();
    setOpen(newOpen);
  };

  const options = [
    {
      text: "Start New Chat",
      action: () => handleNewChat(),
    },
    ...allChats.map((chatName) => ({
      text: chatName,
      action: () => handleSelectChat(chatName),
    })),
  ];

  const DrawerList = (
    <Box sx={drawerStyle}>
      <List>
        {options.map((option, idx) => (
          <ListItem key={`${option.text}-${idx}`} disablePadding>
            {option.text === "Start New Chat" ||
            option.text === "Save Current Chat" ? (
              <ListItemButton onClick={option.action}>
                <ListItemText primary={option.text} />
              </ListItemButton>
            ) : (
              <>
                <ListItemButton
                  onClick={() => {
                    option.action();
                    toggleDrawer(false)();
                  }}
                >
                  <ListItemText primary={option.text} />
                </ListItemButton>
                <MenuComponent
                  chatName={option.text}
                  onAction={refreshChats}
                  currChat={chat}
                />
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
