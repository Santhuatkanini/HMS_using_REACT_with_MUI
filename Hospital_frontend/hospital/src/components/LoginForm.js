import React, { useState } from "react";
import {
  TextField,Button,IconButton,InputAdornment,Card,CardContent,Link,Dialog,DialogTitle,DialogContent,DialogActions,Box,Grid,Typography,} from "@mui/material";
import { Visibility, VisibilityOff, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from "crypto-js";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [forgotPasswordDialogOpen, setForgotPasswordDialogOpen] =
    useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7095/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInUserEmail", formData.email); // Store the email in localStorage

        // Fetch the user details
        const userResponse = await fetch(
          "https://localhost:7095/api/Auth/users"
        );
        if (userResponse.ok) {
          const users = await userResponse.json();
          const matchedUser = users.find(
            (user) => user.email === formData.email
          );

          if (matchedUser) {
            const { status } = matchedUser;

            if (status === "Inactive") {
              toast.error("Your Account is Deactivated");
              return;
            }

            // Update the token with user role
            const role = matchedUser.role;
            const tokenPayload = parseJwt(token);
            tokenPayload.role = role;
            const updatedToken = generateJwtToken(tokenPayload);
            localStorage.setItem("token", updatedToken);

            // Store the role in localStorage
            localStorage.setItem("loggedInUserRole", role);

            // Redirect based on the matched user role
            switch (role) {
              case "ADMIN":
                navigate("/admin");
                break;
              case "DOCTOR":
                navigate("/doctor");
                break;
              case "PATIENT":
                navigate("/patient");
                break;
              default:
                navigate("/login");
            }

            toast.success("Login successful");
            return;
          }
        }
      }

      // Login failed or user not found, handle error
      toast.error("Invalid email or password");
      console.error("Invalid email or password");
    } catch (error) {
      toast.error("An error occurred");
      console.error("Error:", error);
    }
  };

  // Helper function to parse JWT token
  const parseJwt = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  // Helper function to generate JWT token
  const generateJwtToken = (payload) => {
    const header = {
      alg: "HS256",
      typ: "JWT",
    };

    const base64Header = btoa(JSON.stringify(header));
    const base64Payload = btoa(JSON.stringify(payload));
    const signature = `${base64Header}.${base64Payload}`;
    const secret = "Secret"; // Replace with your secret key
    const signatureHash = CryptoJS.HmacSHA256(signature, secret).toString(
      CryptoJS.enc.Base64
    );
    const token = `${signature}.${signatureHash}`;

    return token;
  };

  const handleForgotPasswordClick = () => {
    setForgotPasswordDialogOpen(true);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    // Perform forgot password logic here
    // You can access the entered mobile number from the `mobileNumber` state
    // You can also access the entered magic word from the `formData.magicWord` state

    try {
      const response = await fetch("https://localhost:7095/api/Auth/users");
      if (response.ok) {
        const users = await response.json();
        const matchedUser = users.find(
          (user) =>
            user.mobileNumber === mobileNumber &&
            user.magicWord === formData.magicWord
        );

        if (matchedUser) {
          toast.success(`Password: ${matchedUser.password}`);
        } else {
          toast.error("Wrong credentials");
        }
      } else {
        toast.error("Failed to fetch user data");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error("Error:", error);
    }

    setForgotPasswordDialogOpen(false);
    setMobileNumber("");
  };

  const handleForgotPasswordCancel = () => {
    setForgotPasswordDialogOpen(false);
    setMobileNumber("");
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card>
        <CardContent>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5" component="h2" gutterBottom>
                Login Form
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </Grid>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              name="password"
              label="Password"
              type={formData.showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              required
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {formData.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
            <Box display="flex" justifyContent="flex-end" marginTop="1rem">
              <Link
                component="button"
                variant="body2"
                onClick={handleForgotPasswordClick}
              >
                Forgot Password?
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
      <Dialog
        open={forgotPasswordDialogOpen}
        onClose={handleForgotPasswordCancel}
      >
        <DialogTitle>Forgot Password</DialogTitle>
        <form onSubmit={handleForgotPasswordSubmit}>
          <DialogContent>
            <TextField
              name="magicWord"
              label="Magic Word"
              type="text"
              value={formData.magicWord}
              onChange={(e) =>
                setFormData({ ...formData, magicWord: e.target.value })
              }
              required
              fullWidth
              margin="normal"
              autoComplete="off"
            />
            <TextField
              name="mobileNumber"
              label="Mobile Number"
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
              fullWidth
              margin="normal"
              autoComplete="off"
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button
              onClick={handleForgotPasswordCancel}
              variant="outlined"
              color="primary"
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <ToastContainer />
    </Box>
  );
};

export default LoginForm;
