import React from "react";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Container, Grid, Box, Paper } from "@mui/material";

import { Card, CardHeader, CardContent, CardMedia } from "@mui/material";
const useStyles = makeStyles({
  bold: {
    fontWeight: 400,
  },
});

export default function Home() {
  const classes = useStyles();
  return (
    <Box
      sx={{
        mx: "auto",
        width: "100%",
        p: 1,
        m: 1,
        textAlign: "center",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={3} sm={false}></Grid>
        <Grid item xs={9} sm={12} md={6}>
          <Typography variant="h3" color="initial">
            Join community of book lovers
          </Typography>
          <Typography>
            Find people from all over the world with similar reading interests.
            <br />
            Create Communities
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item lg={3} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="194"
              image="https://i.imgur.com/IpxywG5.jpg"
              alt="Paella dish"
            />
            <CardHeader
              title="What are your friends reading?"
              subheader="Chances are your friends are discussing their favorite (and least favorite) books on Book community."
            />
            <CardContent>
              <Typography color="textSecondary"></Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={3} md={6}>
          <Card>
          <CardMedia
              component="img"
              height="194"
              image="https://i.imgur.com/fMsRmJJ.jpg"
              alt="Paella dish"
            />
            <CardHeader title="Deciding what to read next?" subheader="Scroll through our list of communities and see what others with similar interests are reading" />
            <CardContent>
              <Typography color="textSecondary"></Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={3} md={6}>
          <Card>
          <CardMedia
              component="img"
              height="194"
              image="https://imgur.com/1RzBZF7.jpg"
              alt="Paella dish"
            />
            <CardHeader title="Discover something new here" subheader="Getting bored of the same old genres? Start something new after reading reviews on our website" />
            <CardContent>
              <Typography color="textSecondary"></Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={3} md={6}>
          <Card>
          <CardMedia
              component="img"
              height="194"
              image="https://i.imgur.com/amDJXAM.jpg"
              alt="Paella dish"
            />
            <CardHeader title="New to reading as a hobby?" subheader="See our rooms and join them in order to become part of a reading group, which will help you get started" />
            <CardContent>
              <Typography color="textSecondary"></Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
