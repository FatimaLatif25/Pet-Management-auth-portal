import React from "react";
import { Container, Typography, Box, Grid, Link } from "@mui/material";
import { Facebook, Instagram, Twitter, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#3f51b5",
          color: "#fff",
          padding: "20px 0",
          marginTop: "20px",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Pet Coummunity
              </Typography>
              <Typography variant="body2">
                We offer the best services for your pets. Find your perfect pet
                or manage your pet's needs with ease.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Link href="#" color="inherit" underline="hover">
                Home
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                About Us
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                Services
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                Contact
              </Link>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Box>
                <Link href="#" color="inherit" sx={{ marginRight: 1 }}>
                  <Facebook />
                </Link>
                <Link href="#" color="inherit" sx={{ marginRight: 1 }}>
                  <Twitter />
                </Link>
                <Link href="#" color="inherit" sx={{ marginRight: 1 }}>
                  <Instagram />
                </Link>
                <Link href="#" color="inherit">
                  <LinkedIn />
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" mt={4}>
            <Typography variant="body2" color="inherit">
              &copy; {new Date().getFullYear()} Pet Community. All rights
              reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default Footer;
