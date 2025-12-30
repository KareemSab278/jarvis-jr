import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { removeChatFromLS, renameChatInLS, saveChatToLS } from "../storage/LS";

export { MenuComponent };

const options = ["Delete", "Rename", "Save"];
const ITEM_HEIGHT = 48;

const MenuComponent = ({ chatName, onAction, currChat }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option) => {
    if (option === "Delete") {
      removeChatFromLS(chatName)
        ? alert(`Chat "${chatName}" deleted.`)
        : alert("Failed to delete chat.");
    } else if (option === "Rename") {
      renameChatInLS(chatName)
        ? alert(`Chat "${chatName}" renamed.`)
        : alert("Failed to rename chat.");
    }
    else if (option === "Save") {
        saveChatToLS(chatName, currChat)
            ? alert(`Chat "${chatName}" saved.`)
            : alert("Failed to save chat.");
    }
    handleClose();
  };

  return (
    <div>
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
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleMenuItemClick(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
