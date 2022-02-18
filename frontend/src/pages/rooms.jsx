import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BookSearch from "../components/bookSearch";
import RoomList from "../components/roomList";
const stateData = require('../state.json');
export default function Rooms(){
    const [rooms, setRooms] = useState([]);
    const [message, setMessage] = useState("Rooms you are a part of");
    useEffect(() => {
        fetch(`${stateData.baseUrl}member`, { headers: {"Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`} })
        .then(response => response.json())
        .then(data => {
            setRooms(data.Result.MyRooms)
        })
    }, [])
    if(window.sessionStorage.getItem('token'))
    return (
        <div>
            <BookSearch setMessage={setMessage} setRooms={setRooms}/>
            <RoomList rooms={rooms} message={message}/>
        </div>
    );
    else{
        return(
            <Typography variant="h4" color="primary">Please login to continue</Typography>
        );
    }
}