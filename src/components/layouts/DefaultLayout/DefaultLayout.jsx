import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Box } from "@mui/material";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          backgroundColor: "rgb(255, 218, 185);",
        }}
      >
        <Box
          sx={{
            marginTop: "50px",
            marginBottom: "50px",
            padding: "30px",
            width: "100%",
            maxWidth: "1440px",
            margin: "0 auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default DefaultLayout;
