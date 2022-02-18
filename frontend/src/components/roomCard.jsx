import React from "react";
import {
  Card,
  CardHeader,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
export default function RoomCard({ room }) {
    
  return (
    <div>
      <Card  key={room.Book.id}>
        <CardHeader title={room.Book.title} subheader={room.Book.subtitle} />
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
      </Card>
    </div>
  );
}
