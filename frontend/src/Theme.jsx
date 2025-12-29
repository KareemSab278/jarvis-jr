export {
  Theme,
  drawerTheme,
  chatBubbleTheme,
  inputFieldStyle,
  submitButtonStyle,
  inputFieldContainerStyle,
  boxStyle,
  burgerSize,
  drawerStyle,
};
const COLOR = "#dfdfdfff";
const BACKGROUND = "#2b2d42ff";
const CHAT_BUBBLE_BACKGROUND_USER = "#242536ff";
const CHAT_BUBBLE_BACKGROUND_JARVIS_JR = "#383a53ff";

const Theme = `
    html, body, #root {
    min-height: 100vh;
    background: ${BACKGROUND};
    color: ${COLOR};
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
    }

`;

const drawerTheme = {
  paper: {
    sx: {
      backgroundColor: BACKGROUND,
      width: 200,
      color: COLOR,
    },
  },
};

const chatBubbleTheme = (isJarvisJr) => {
  return {
    px: 2,
    py: 1,
    maxWidth: "70%",
    color: COLOR,
    bgcolor: isJarvisJr
      ? CHAT_BUBBLE_BACKGROUND_USER
      : CHAT_BUBBLE_BACKGROUND_JARVIS_JR,
    borderRadius: 2,
    borderTopRightRadius: isJarvisJr ? 8 : 0,
    borderTopLeftRadius: isJarvisJr ? 0 : 8,
  };
};

const inputFieldStyle = {
  flex: 1,
  minWidth: 0,
  borderRadius: "8px",
  backgroundColor: "#0000001a",
  marginLeft: "5%",
  p: 1,
  border: "1px solid #dfdfdf25",
};

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

const inputFieldContainerStyle = {
  width: "100%",
  display: "flex",
  alignItems: "flex-end",
  gap: 0.5,
  position: "fixed",
  left: "50%",

  bottom: 10,
  transform: "translateX(-50%)",
  zIndex: 1300,
  maxWidth: 700,
  px: 1,
};

const submitButtonStyle = {
  minWidth: 48,
  minHeight: 48,
  borderRadius: "25%",
  ml: 1,
  alignSelf: "flex-end",
  marginRight: "1%",  
};

const boxStyle = (isJarvisJr) => {
  return {
    display: "flex",
    justifyContent: isJarvisJr ? "flex-start" : "flex-end",
    mb: 0.5,
    width: "100%",
  };
};
