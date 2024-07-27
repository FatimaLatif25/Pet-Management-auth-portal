import React from "react";
import { AppBar, Box, Toolbar, Typography, Button, Link } from "@mui/material";
import Navbar from "./Navbar";
import headerImage from "../assets/images/header_images.jpg";

const Header = () => {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "550px",
          backgroundImage: `url(${headerImage})`, 
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Navbar */}
        <AppBar
          position="static"
          sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
            position: "absolute",
            top: 0,
            width: "100%",
          }}
        >
          <Toolbar>
            <Navbar />
          </Toolbar>
        </AppBar>

        {/* Header Text */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography variant="h2" component="div">
            Welcome to Pet Community
          </Typography>
          <Typography variant="h6" component="div" className="text-small">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been.
          </Typography>
        </Box>
      </Box>
    </>
  );
};
export default Header;
