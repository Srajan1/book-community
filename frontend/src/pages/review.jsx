import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Rating,
  Typography,
  TextField,
  FormControlLabel,
  Button,
  Checkbox,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BookSearch from "../components/bookSearch";
import RoomList from "../components/roomList";
const stateData = require("../state.json");

export default function Review() {
  var url = window.location.pathname.split("/");
  const roomId = url[url.length - 1];
  const [showSpoiler, setShowSpoiler] = useState(false);
  const [bookName, setBookName] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [reviewList, setReviewList] = useState([]);
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  useEffect(() => {
    fetch(`${stateData.baseUrl}review/${roomId}`, {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ResponseCode === 1) {
          setReviewList(data.Result.Review);

          fetch(`${stateData.baseUrl}room/${roomId}`, {
            headers: {
              Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.ResponseCode === 1) {
                setBookName(data.Result.Room.Book.title);
              } else alert(data.Comments);
            });
        } else alert(data.Comments);
      });
  }, []);
  function publish() {
    const body = {
      roomId,
      body: review,
      rating
    };
    if(checked)
    body.hasSpoiler = 1;
    else body.hasSpoiler = 0;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    };
    fetch(`${stateData.baseUrl}review`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.ResponseCode === 1) {
            alert(data.Comments);
            window.location.reload();
          } else {
            console.log(data);
            alert(data.Comments);
            window.location.reload();
          }
        });
  }
  function getAll(){
    fetch(`${stateData.baseUrl}reviewSpoiled/${roomId}`, {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ResponseCode === 1) {
          setReviewList(data.Result.Review);
        } else alert(data.Comments);
      });
  }
  if (window.sessionStorage.getItem("token"))
    return (
      <Container>
        <Grid item sx={{ marginBottom: 2 }} s={12}>
          <Typography variant="h4">{bookName}</Typography>
        </Grid>
        <Grid item sx={{ marginBottom: 2 }} s={12}>
          <TextField
            value={review}
            label="Your Review"
            onChange={(e) => {setReview(e.target.value)}}
            multiline
            placeholder="Enter Your Review"
            fullWidth
            required
          />
        </Grid>
        <Grid item sx={{ marginBottom: 1 }} s={12}>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} />}
            label="My review has spoilers "
          />
        </Grid>
        <Grid item sx={{ marginBottom: 1 }} s={12}>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </Grid>
        <Grid item sx={{ marginBottom: 5 }} s={12}>
          <Button
            type="submit"
            color="primary"
            onClick={publish}
            variant="contained"
          >
            Publish your review
          </Button>
        </Grid>
        <Button
            type="submit"
            color="primary"
            onClick={getAll}
            variant="contained"
          >
            See reviews with spoilers as well
          </Button>
        <Grid container spacing={3}>
        {reviewList.map((rv) => (
          <Grid key={rv.id} item lg={3} md={6}>
            <Card>
            <CardHeader
              title={`${rv.User.name}`}
              subheader={`${rv.createdAt.substring(0, 10)}`}
            />
            <CardContent>
              <Rating name="simple-controlled" value={rv.rating} />
              <Typography color="textSecondary">{`${rv.body}`}</Typography>
            </CardContent>
          </Card>
          </Grid>
        ))}
        </Grid>
      </Container>
    );
  else {
    return (
      <Typography variant="h4" color="primary">
        Please login to continue
      </Typography>
    );
  }
}
