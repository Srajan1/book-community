import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  CardMedia,
  Grid,
  Container,
  ButtonGroup,
} from "@mui/material";
import { useHistory } from "react-router-dom";

const stateData = require("../state.json");

export default function IndividualRoom() {
  const history = useHistory();
  var [book, setBook] = useState({});
  var [admin, setAdmin] = useState({});
  var [loaded, setLoaded] = useState(0);
  var [isMember, setIsMember] = useState(0);
  var [memberCount, setMemberCount] = useState(0);
  useEffect(() => {
    var url = window.location.pathname.split("/");
    const id = url[url.length - 1];
    url = `${stateData.baseUrl}room/${id}`;
    fetch(`${url}`, {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ResponseCode === 0) {
          alert(data.Comments);
          history.pushState("/rooms");
        } else {
          setLoaded(1);
          setBook(data.Result.Room.Book);
          setAdmin(data.Result.Room.User);
          url = `${stateData.baseUrl}memberCount/${id}`;
          fetch(`${url}`, {
            headers: {
              Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.ResponseCode === 0) {
                alert(data.Comments);
              } else {
                setIsMember(data.Result.isMember);
                setMemberCount(data.Result.memberCount);
              }
            });
        }
      });
  }, []);
  function handleEngagement() {
    var url = window.location.pathname.split("/");
    const id = url[url.length - 1];

    if (isMember === 0) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          roomId: id,
        }),
      };
      fetch(`${stateData.baseUrl}member`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.ResponseCode === 1) {
            alert("Room joined successfully");
            window.location.reload();
          } else {
            alert(data.Comments);
            window.location.reload();
          }
        });
    } else {
      const requestOptions = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      };
      fetch(`${stateData.baseUrl}member/${id}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.ResponseCode === 1) {
            alert("Room left successfully");
            window.location.reload();
          } else {
            alert(data.Comments);
            window.location.reload();
          }
        });
    }
  }
  function handleReview(){
    var url = window.location.pathname.split("/");
    const id = url[url.length - 1];
    history.push(`/review/${id}`);
  }
  function handleDiscussion(){
    var url = window.location.pathname.split("/");
    const id = url[url.length - 1];
    history.push(`/discussion/${id}`);
  }
  if (window.sessionStorage.getItem("token") && loaded)
    return (
      <div>
        <Grid container spacing={10}>
          <Grid item s={12} md={3} lg={3} item>
            <CardMedia component="img" image={book.thumbnail} />
          </Grid>
          <Grid item s={12} md={9} lg={9}>
            <Typography variant="h5">{book.title}</Typography>
            <Typography variant="h6">{book.subtitle}</Typography>
            <Typography variant="h6">{`ISBN: ${book.isbn}`}</Typography>
            <Typography variant="h6">{`Room Admin: ${admin.name}`}</Typography>
            <Typography variant="h6">{`Active Members: ${memberCount}`}</Typography>
            <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="text"
            >
              <Button
                type="submit"
                color="primary"
                variant="contained"
                onClick={handleEngagement}
              >
                {isMember ? "Leave" : "Join"}
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                onClick={handleReview}
              >
                Go to Review page
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                onClick={handleDiscussion}
              >
                Go to Discussions page
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item s={12}>
            <Typography>{book.description}</Typography>
          </Grid>
        </Grid>
      </div>
    );
  else {
    return (
      <Typography variant="h4" color="primary">
        Please login to continue
      </Typography>
    );
  }
}
