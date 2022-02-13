import React, { useState } from 'react';
import { Container, Grid, Box, Paper, Typography, TextField, Avatar, Checkbox, Button, Link, FormControlLabel  } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import { useHistory } from "react-router-dom";
const stateData = require('../state.json');

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const paperStyle={padding :20,height:'100%', margin:"20px auto"}
  const avatarStyle={backgroundColor:'#1bbd7e'}
  const btnstyle={margin:'8px 0'}
  function handleLogin(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password
    })
  };
    fetch(`${stateData.baseUrl}signIn`, requestOptions)
        .then(response => response.json())
        .then(data => {
          if(data.ResponseCode === 1){
            window.sessionStorage.setItem("token", data.Result.token);
            alert('You are logged in');
            history.push("/");
          }
          else{
            if(!data.Result.error)
            document.getElementById('error').innerHTML = data.Result;
            else 
            document.getElementById('error').innerHTML = data.Result.error;
          }
        });
  }
  return(
      <Grid container spacing={3}>
        <Grid item md={3} sm={false}></Grid>
        <Grid item md={6} sm={12}>
          <Paper elevation={10} style={paperStyle}>
              <Grid align='center'>
                   <Avatar style={avatarStyle}><LockIcon/></Avatar>
                  <h2>Sign In</h2>
                  <Typography variant="error" id="error"> </Typography>
              </Grid>
              <TextField label='Email' value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='Enter Email' fullWidth required/>
              
              <TextField label='Password' value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Enter password' type='password' fullWidth required/>

              <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={handleLogin} fullWidth>Sign in</Button>

              <Typography > Don't have an account ?
                   <Link href="/register" >
                      Sign Up 
              </Link>
              </Typography>
          </Paper>
      </Grid>
      </Grid>
  )
}
