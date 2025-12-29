import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { drawerTheme } from "../Theme";
import { loadChatFromLS, getAllChatsFromLS } from "../storage/LS";
import { useDispatch } from "react-redux";
import { loadChat } from "../storage/chatSlice";
export { DrawerComponent };

const DrawerComponent = ({ options = [] }) => {
  const [open, setOpen] = useState(false);
  const [allChats] = useState(getAllChatsFromLS());
  const dispatch = useDispatch();
  const drawerStyle = {
    width: 200,
    backgroundColor: drawerTheme.paper.sx.backgroundColor,
    color: drawerTheme.paper.sx.color,
  };
  const burgerSize = {
    md: { fontSize: 32, color: drawerTheme.paper.sx.color },
    lg: { fontSize: 40, color: drawerTheme.paper.sx.color },
    xl: { fontSize: 48, color: drawerTheme.paper.sx.color },
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    options.unshift({
      text: "New Chat",
      action: () => {
        dispatch(loadChat([]));
      },
    });
  }, []);

  useEffect(() => {
    allChats.forEach((chatName) => {
      options.push({
        text: `${chatName}`,
        action: () => {
          const chat = loadChatFromLS(chatName);
          dispatch(loadChat(chat));
        },
      });
    });
  }, []);

  const DrawerList = (
    <Box sx={drawerStyle} onClick={toggleDrawer(false)}>
      <List>
        {options.map((option) => (
          <ListItem key={option.text} disablePadding>
            <ListItemButton onClick={option.action}>
              <ListItemText primary={option.text} />
            </ListItemButton>
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
