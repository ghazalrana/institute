import React, { useCallback, useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import ReactPlayer from "react-player";

import Clinios from "../../../assets/img/Clinios.png";
import Help from "../../../assets/img/Help.png";
import useAuth from "../../../hooks/useAuth";
import { statusToColorCode, isEmpty } from "../../../utils/helpers";


// components


const useStyles = makeStyles((theme) => ({
  pageTitle: {
    marginBottom: theme.spacing(2),
    color: "#808080"
  },
  pageDescription: {
    marginTop: theme.spacing(2),
    color: "#808080",
    fontWeight: '200',
    fontSize: 'large'
  },
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "60px",
    marginTop: "5px",
    fontSize: "15px",
  },
  headerWrap: {
    display: "flex",
    justifyContent: "space-between",
  },
  Logo: {
    // maxWidth: "180px",
    width: 240,
    height: 240,
    // objectFit: "contain",
  },
}));



export default function Home() {
  const classes = useStyles();

  const [selectedProvider, setSelectedProvider] = useState({});

  return (
    <div className={classes.root}>
      <Grid container >
        <Grid item md={7} xs={7} className={classes.headerWrap}>
          <Typography component="h1" variant="h3" className={classes.pageTitle}>
            Home
            {" "}
            {!isEmpty(selectedProvider) && `- ${selectedProvider?.name}`}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item md={9} xs={9}>

          <Grid container spacing={2}>
            <Grid item md={5} xs={5} >
              <ReactPlayer
                url="https://www.youtube.com/watch?v=KoIBI2rbdHA"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <p className={classes.pageDescription} >Welcome to the Avon Institute functional medicine training program.</p>
              <p className={classes.pageDescription} >To start learning, click on the menu links on the left.</p>
              <p className={classes.pageDescription} >To change your email or password, click Account on the upper right.</p>
              <p className={classes.pageDescription} >To give us feedback on our program, click Contact on the upper right.</p>
              <p className={classes.pageDescription} >To learn more about AvonEHR software, visit www.AvonEHR.com.</p>
            </Grid>

          </Grid>
        </Grid>

        <Grid item md={3} xs={3}>
          <Grid item md={6} xs={12}>
            <img src={Clinios} alt="Clinos software ad" className={classes.Logo} />
          </Grid>
          <Grid item md={6} xs={12}>
            <img src={Help} alt="Help ad" className={classes.Logo} />
          </Grid>
        </Grid>

      </Grid>

    </div>
  );
}
