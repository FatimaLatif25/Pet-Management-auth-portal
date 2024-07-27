import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Container, Typography, Box, Paper, Link, Alert } from "@mui/material";
import bgImage from "../assets/images/bgImage.jpg";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/api";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { token } = await signup(username, email, password);
      localStorage.setItem("token", token);
      setSuccess("Signup successfully");
      setError(null);
      navigate("/Login");
    } catch (error) {
      setError("An error occurred during signup. Please try again.");
      console.error("Signup error", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 2,
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <Typography
            variant="h4"
            sx={{ marginBottom: 4, color: "#3f51b5", fontWeight: 400 }}
          >
            Create An Account
          </Typography>
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ marginBottom: 2 }}>
              {success}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              value={username}
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              sx={{
                marginBottom: 3,
                backgroundColor: "#fff",
                borderRadius: 1,
              }}
            />
            <TextField
              label="Email"
              name="email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{
                marginBottom: 3,
                backgroundColor: "#fff",
                borderRadius: 1,
              }}
            />
            <TextField
              label="Password"
              name="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{
                marginBottom: 4,
                backgroundColor: "#fff",
                borderRadius: 1,
              }}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: "100%",
                padding: "10px 0",
                backgroundColor: "#3f51b5",
                "&:hover": {
                  backgroundColor: "#303f9f",
                },
              }}
            >
              Sign Up
            </Button>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              Already have an account? <Link href="/login">Login</Link>
            </Typography>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUp;
