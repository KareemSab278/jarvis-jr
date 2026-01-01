import { Box, Paper, Typography } from "@mui/material";
import { chatBubbleTheme, boxStyle } from "../ThemeAndStyle";
import { LoadingComponent } from "./LoadingComponent";
export { ChatBubbleComponent };

const ChatBubbleComponent = ({ message, isJarvisJr = false }) => {
  return (
    <section>
      {message === "" ? (
        <LoadingComponent width={300} />
      ) : (
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
          </Paper>
        </Box>
      )}
    </section>
  );
};
