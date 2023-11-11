import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";
import login from "../api/login";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useSessionStorageContext } from "../SessionStorageContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { updateSessionData } = useSessionStorageContext();

  // Function to request storage access
  const requestStorageAccess = async () => {
    try {
      await document.requestStorageAccess();
    } catch (error) {
      console.error("Error requesting storage access:", error);
      throw new Error("Failed to request storage access.");
    }
  };

  useEffect(() => {
    // Request storage access when the component mounts
    requestStorageAccess();
  }, []); // Empty dependency array ensures this runs only once

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); // Set loading state to true when login is initiated

    // Your login function logic here
    try {
      const response = await login(username, password); // Replace with your actual login function
      const data = await response.json();

      if (response.ok) {
        // Login was successful, set state accordingly
        updateSessionData({ isAdmin: data.role === "admin", hasCookie: true });
        setError("");
        navigate("/lookup");
      } else {
        // Login failed, display the error message
        setError(data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An error occurred while logging in.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {isLoading && (
            <div style={{ display: "flex" }}>
              <span>Signing in...</span>
              <CircularProgress size={20} style={{ marginLeft: 10 }} />
            </div>
          )}
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
        </form>
      </div>
    </Container>
  );
};

export default Login;
