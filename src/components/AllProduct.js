import React, { useEffect, useState } from "react";
import Header from "./Header";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import { loggedIn } from "../redux/actions/registerActions";
import { getJwt } from "../helper/jwt";
import { PinDropSharp } from "@material-ui/icons";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function AllProduct(props) {
  const classes = useStyles();
  const Products = useSelector(({ product }) => product.data);
  const dispatch = useDispatch();
  const jwt = getJwt();
  useEffect(() => {
    dispatch(getProducts());
    if (jwt) {
      dispatch(loggedIn(jwt));
    }
  }, [Products]);

  const handleProductView = (e, id) => {
    e.preventDefault();
    console.log(id);
    props.history.push(`/productdetails/${id}`);
  };
  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Product layout
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {Products.map((card) => (
              <Grid item key={card._id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={`${classes.cardMedia} imgshadow`}
                    image={`http://localhost:4444/${card.images}`}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <span className="col-md-6 col-sm-12">
                      <b>{card.title}</b>
                    </span>
                    {/* <span className="col-md-6 col-sm-12">
                      {card.descriptions}
                    </span> */}
                  </CardContent>
                  <CardContent className={classes.cardContent}>
                    <span className="col-md-6 col-sm-12">
                      <b>&#x20B9; {card.price}</b>
                    </span>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      add to card
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={(e) => handleProductView(e, card._id)}
                    >
                      view
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

export default Header(AllProduct);
