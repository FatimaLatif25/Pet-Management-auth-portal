import react, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Container, Typography, Box, Paper, Link, Alert } from "@mui/material";
import bgImage from "../assets/images/bgImage.jpg";
import { useNavigate } from "react-router-dom";
import { login } from "../api/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { token } = await login(email, password);
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      setError("An error occurred during login. Please try again.");
      console.error("Login error", error);
    }
  };

  return (
    <>
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
              Login
            </Typography>
            {error && (
              <Alert severity="error" sx={{ marginBottom: 2 }}>
                {error}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
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
                onChange={(e) => setPassword(e.target.value)}
                type="password"
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
                Login
              </Button>
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Don't have an account? <Link href="/signup">Sign Up</Link>
              </Typography>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};
export default Login;
