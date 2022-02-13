import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Paper,
  Typography,
  TextField,
  Avatar,
  Checkbox,
  Button,
  Link,
  FormControlLabel,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
const stateData = require("../state.json");

export default function Register() {
  var textFields;
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [otpVerification, setOtpVerification] = useState(false);
  const paperStyle = { padding: 20, height: "100%", margin: "20px auto" };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  function handleRegister() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    };
    if (confirm === password)
      fetch(`${stateData.baseUrl}signUp`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.ResponseCode === 1) {
            setOtpVerification(true);
            document.getElementById("error").innerHTML = data.Comments;
          } else {
            if(!data.Result.error)
            document.getElementById("error").innerHTML = data.Result
            else
            document.getElementById("error").innerHTML =
              data.Result.error.errors[0].message;
          }
        });
    else {
      document.getElementById("error").innerHTML = 'Both the passwords do not match';
    }
  }
  function handleOtp(){
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        otp,
      }),
    };
    fetch(`${stateData.baseUrl}otpVerification`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.ResponseCode === 1) {
            alert('Account verified. Now you can login')
            history.push('/login')
          } else {
            if(!data.Result.error)
            document.getElementById("error").innerHTML = data.Result
            else 
            document.getElementById("error").innerHTML = data.Result.error
          }
        });
  }
  if(!otpVerification){
    textFields = (<div>
        <TextField
              label="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter Name"
              fullWidth
              required
            />
          <TextField
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter password"
            type="password"
            fullWidth
            required
          />
          <TextField
            label="Confirm Password"
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);
            }}
            placeholder="Enter password again"
            type="password"
            fullWidth
            required
          />
          <Button
            type="submit"
            color="primary"
            onClick={handleRegister}
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Sign in
          </Button>
      </div>)
  }else{
    textFields = (<div>
      <TextField
            label="OTP"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            placeholder="Enter OTP"
            fullWidth
            required
          />
        <Button
          type="submit"
          color="primary"
          onClick={handleOtp}
          variant="contained"
          style={btnstyle}
          fullWidth
        >
          Verify OTP
        </Button>
    </div>)
  }
  return (
    <Grid container spacing={3}>
      <Grid item md={3} sm={false}></Grid>
      <Grid item md={6} sm={12}>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockIcon />
            </Avatar>
            <h2>Sign In</h2>
            <Typography variant="error" id="error">
              {" "}
            </Typography>
          </Grid>

          <TextField
            label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter Email"
            fullWidth
            required
          />
          {textFields}
            

          
          <Typography>
            {" "}
            Do you have an account ?<Link href="/login">Sign in</Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
