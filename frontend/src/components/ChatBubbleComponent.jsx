import { Box, Paper, Typography } from "@mui/material";
import { chatBubbleTheme, boxStyle } from "../ThemeAndStyle";
export { ChatBubbleComponent };

const ChatBubbleComponent = ({ message, isJarvisJr = false, timestamp }) => {
  // i need to make the whole chat area scrollable with a max height. meh
  return (
    <section > 
      <Box sx={boxStyle(isJarvisJr)}>
        <Paper
          elevation={1}
          sx={{
            ...chatBubbleTheme(isJarvisJr),
            maxWidth: { xs: "90%", md: "60%" },
          }}
        >
          <Typography
            variant="body2"
            component="pre"
            sx={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontFamily: "monospace",
              fontSize: "1em",
            }}
          >
            {message}
          </Typography>
          <p>{new Date(timestamp).toLocaleString().slice(0, 20)}</p>
        </Paper>
      </Box>
    </section>
  );
};
