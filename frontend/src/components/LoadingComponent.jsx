import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export { LoadingComponent };

const LoadingComponent = ({ width = "auto" }) => {
  return (
    <Box sx={{ width }}>
      <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
      <p style={{ marginTop: -45 }}>Processing...</p>
    </Box>
  );
};
