import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { removeChatFromLS, renameChatInLS, saveChatToLS } from "../storage/LS";
import { AlertComponent } from "./AlertComponent";

export { MenuComponent };

const OPTIONS = ["Delete", "Rename", "Save"];
const ITEM_HEIGHT = 48;

const MenuComponent = ({ chatName, onAction, currChat }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [alert, setAlert] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (onAction) onAction();
  };

  const handleMenuItemClick = (option) => {
    if (option === "Delete") {
      removeChatFromLS(chatName)
        ? setAlert({ type: "success", message: `Chat "${chatName}" deleted.` })
        : setAlert({ type: "error", message: "Failed to delete chat." });
    } else if (option === "Rename") {
      renameChatInLS(chatName)
        ? setAlert({ type: "success", message: `Chat "${chatName}" renamed.` })
        : setAlert({ type: "error", message: "Failed to rename chat." });
    } else if (option === "Save") {
      saveChatToLS(chatName, currChat)
        ? setAlert({ type: "success", message: `Chat "${chatName}" saved.` })
        : setAlert({ type: "error", message: "Failed to save chat." });
    }
    handleClose();
  };

  return (
    <div>
      {alert && (
        <div style={{ position: "absolute", zIndex: 9999, right: 0, top: 0 }}>
          <AlertComponent type={alert.type} message={alert.message} />
        </div>
      )}
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={anchorEl ? "long-menu" : undefined}
        aria-expanded={anchorEl ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          },
          list: {
            "aria-labelledby": "long-button",
          },
        }}
      >
        {OPTIONS.map((option) => (
          <MenuItem key={option} onClick={() => handleMenuItemClick(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
