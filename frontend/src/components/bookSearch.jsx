import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import {Typography, TextField, Button} from '@mui/material'
const stateData = require('../state.json');

export default function BookSearch({setMessage, setRooms}) {
    
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const btnstyle={padding:'15px 0px'};
    function handleSearch() {
        var url = stateData.baseUrl+'room';
        if(title !== ''){
            url += `?title=${title}`
        }
        if(title && isbn)
        url += '&'
        if(!title && isbn)
        url += '?'
        if(isbn !== ''){
            url += `isbn=${isbn}`
        }
        
        fetch(url, { headers: {"Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`} })
        .then(response =>response.json())
        .then(data => {
            if(data.ResponseCode === 1){
                setRooms(data.Result.Room)
                setMessage('Rooms you searched for')
            }else{
                setRooms([])
                setMessage(data.Comments)
            }
        })
    }
  return (
    <Grid container spacing={3}>
        <Grid item xs={12}>
            <Typography>
            No filter is mandatory, and preference is given to ISBN filter
            </Typography>
            <Typography>
                Apply filters
            </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
            <TextField label='title' placeholder='Enter filter for title' fullWidth  value={title} onChange={(e) => {setTitle(e.target.value)}}/>
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
            <TextField label='isbn' placeholder='Enter filter for isbn' fullWidth value={isbn} onChange={(e) => {setIsbn(e.target.value)}}/>
        </Grid>
        <Grid item xs={12} md={12} lg={2}>
            <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={handleSearch} fullWidth>Search</Button>
        </Grid>
    </Grid>
  )
}
