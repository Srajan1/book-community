import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import {
  Container,
  Grid,
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from "@mui/material";
import { useHistory } from "react-router-dom";
const stateData = require("../state.json");

function DiscussionBody({discussion, readMoreId}) {
  if (readMoreId !== discussion.id)
    return (
      <Typography color="textSecondary">{`${discussion.body.substring(
        0,
        100
      )}...`}</Typography>
    );
  else
    return (
      <Typography color="textSecondary">{`${discussion.body}`}</Typography>
    );
}

export default function Discussion() {
  const history = useHistory();
  var url = window.location.pathname.split("/");
  const [readMoreId, setReadMoreId] = useState(-1);
  const roomId = url[url.length - 1];
  const [title, setTitle] = useState("");
  const [discussion, setDiscussion] = useState("");
  const [bookName, setBookName] = useState("");
  const [discussionList, setDiscussionList] = useState([]);
  function readMore(discussionId) {
    setReadMoreId(discussionId);
  }
  function comments(discussionId) {
    history.push(`/comment/${discussionId}`)
  }
  useEffect(() => {
    fetch(`${stateData.baseUrl}discussion/room/${roomId}`, {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ResponseCode === 1) {
          setDiscussionList(data.Result.Discussion);
          console.log(discussionList);
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
      body: discussion,
      title,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    };
    fetch(`${stateData.baseUrl}discussion`, requestOptions)
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
  if (window.sessionStorage.getItem("token"))
    return (
      <Container>
        <Grid item sx={{ marginBottom: 2 }} s={12}>
          <Typography variant="h4">{bookName}</Typography>
        </Grid>
        <Grid item sx={{ marginBottom: 2 }} s={12}>
          <TextField
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            label="Title"
            placeholder="Title"
            fullWidth
            required
          />
        </Grid>
        <Grid item sx={{ marginBottom: 2 }} s={12}>
          <TextField
            value={discussion}
            onChange={(e) => {
              setDiscussion(e.target.value);
            }}
            label="Discussion body"
            placeholder="Discussion body"
            fullWidth
            multiline
            required
          />
        </Grid>
        <Grid item sx={{ marginBottom: 5 }} s={12}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            onClick={publish}
          >
            Post your discussion
          </Button>
        </Grid>
        <Grid container spacing={3}>
          {discussionList.map((discussion) => (
            <Grid key={discussion.id} item lg={6} md={6}>
              <Card>
                <CardHeader
                  title={`${discussion.User.name}`}
                  subheader={`${discussion.createdAt.substring(0, 10)}`}
                />
                <CardContent>
                  <DiscussionBody discussion={discussion} readMoreId={readMoreId}/>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      readMore(discussion.id);
                    }}
                  >
                    Read more
                  </Button>

                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      comments(discussion.id);
                    }}
                  >
                    Comments
                  </Button>
                </CardActions>
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
