import React from "react";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Container, Grid, Box, Paper } from "@mui/material";

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
          <Typography variant="h3" color="initial" >
            Join community of book lovers
          </Typography>
          <Typography>
            Find people from all over the world with similar reading interests.
            <br />
            Create Communities
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
