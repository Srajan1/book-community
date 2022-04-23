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

function DiscussionCard({ discussion }) {
    if(discussion.User)
  return (
    <Card>
      <CardHeader
        title={`${discussion.User.name}`}
        subheader={`${discussion.createdAt.substring(0, 10)}`}
      />
      <CardContent>
        <Typography color="textSecondary">{`${discussion.body}`}</Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
  else return (<></>);
}

export default function Comments() {
  var url = window.location.pathname.split("/");
  const discussionId = url[url.length - 1];
  const [discussion, setDiscussion] = useState({});
  const [bookName, setBookName] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetch(`${stateData.baseUrl}comment/${discussionId}`, {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ResponseCode === 1) {
          setDiscussion(data.Result.Discussion);
          setCommentList(data.Result.Comment);
        } else alert(data.Comments);
      });
  }, []);
  function publish() {
    const body = {
      body: newComment,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    };
    fetch(`${stateData.baseUrl}comment/${discussionId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.ResponseCode === 1) {
          alert(data.Comments);
          window.location.reload();
        } else {
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
          
          
          <DiscussionCard discussion={discussion} />
        </Grid>
        <Grid item sx={{ marginBottom: 2 }} s={12}>
          <TextField
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
            label="Comment body"
            placeholder="Comment body"
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
            Post your comment
          </Button>
        </Grid>
        <Grid container spacing={3}>
          {commentList.map((comment) => (
            <Grid key={comment.id} item lg={12} md={12}>
              <Card>
                <CardHeader
                  title={`${comment.User.name} `}
                  subheader={`${comment.body}`}
                />
                <CardActions></CardActions>
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
