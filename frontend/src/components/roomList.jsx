import React from "react";
import { Typography, TextField, Button, Grid } from "@mui/material";
import RoomCard from "./roomCard";

export default function RoomList({ rooms, message }) {
  console.log(rooms);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">{message}</Typography>
      </Grid>
      {rooms.map((room, index) => (
          <Grid item xs={12} key={index} sm={12} md={6} lg={3}>
            <RoomCard key={index} room = {room}/>
          </Grid>
        ))}
    </Grid>
  );
}
