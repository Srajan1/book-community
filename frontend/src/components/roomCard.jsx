import React from "react";
import {
  Card,
  CardHeader,
  Button,
  CardMedia,
  CardContent,
  Typography,
  CardActions 
} from "@mui/material";
import { useHistory } from "react-router-dom";

export default function RoomCard({ room }) {
  const history = useHistory();
  function handleClick(){
    history.push(`/room/${room.id}`)
  }
  return (
    <div>
      <Card key={room.Book.id}>
        <CardHeader title={room.Book.title} subheader={`Admin: ${room.User.name}`} />
        <CardMedia
          component="img"
          height="150"
          image={room.Book.thumbnail}
          alt="Paella dish"
        />
        <CardContent>
          <Typography color="textSecondary">
            {`${room.Book.description.substring(0, 100)}...`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={handleClick}>
            View
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
