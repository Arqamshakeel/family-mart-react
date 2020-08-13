import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Grid, Snackbar } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import IncrementDecrement from "./Card Components/IncrementDecrement";
import productService from "../services/ProductServices";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, zero } from "../Redux/actions/CartBadgeAction";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  media: {
    height: 0,
    paddingTop: "86.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  const dispatch = useDispatch();
  // console.log(ab2str(props.image.image.data.data));
  // function ab2str(buf) {
  //   return String.fromCharCode.apply(null, new Uint16Array(buf));
  // }
  //const cartBadge = useSelector((state) => console.log(state.counter));

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [imgBuffer, setImgBuffer] = React.useState("");
  const [itemCounter, setItemCounter] = React.useState(1);
  const [openErrorSnack, setOpenErrorSnack] = React.useState(false);
  const handleClick = () => {
    setOpenErrorSnack(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorSnack(false);
  };
  const apiPOSTcart = () => {
    console.log(props.product._id);
    productService
      .getCart(props.product._id, itemCounter)
      .then(function (data) {
        console.log(data);
        console.log("In Card");

        dispatch(increment());
      })
      .catch(function (error) {
        console.log(" GG error agya");
        handleClick();
        console.log(error);
      });
  };

  return (
    <Grid item xs={12} md={6} lg={3} style={{ border: "1px solid balck" }}>
      <div className={classes.root}>
        <Snackbar
          open={openErrorSnack}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            Sorry, we only have {props.product.stock} of these left.
          </Alert>
        </Snackbar>
      </div>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardMedia
          className={classes.media}
          image={props.image}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="h6" color="primary" component="h1">
            {props.product.name}
          </Typography>
          <Typography variant="body1" color="primary" component="h1">
            Rs.{props.product.price}
          </Typography>
        </CardContent>
        <CardActions disableSpacing style={{ float: "right" }}>
          {/* <span>{props.stock}</span> */}
          {props.stock == 0 ? (
            <Typography
              variant="body2"
              component="p"
              style={{ marginRight: "10px" }}
              color="error"
            >
              OUT OF STOCK
            </Typography>
          ) : (
            <Typography
              variant="body2"
              component="p"
              style={{ marginRight: "10px" }}
              color="primary"
            >
              IN STOCK
              <span> </span>
              {/* <IncrementDecrement
                setItemCounter={setItemCounter}
                itemCounter={itemCounter}
              /> */}
            </Typography>
          )}
          {props.stock ? (
            <IncrementDecrement
              setItemCounter={setItemCounter}
              itemCounter={itemCounter}
            />
          ) : (
            <></>
          )}

          <IconButton
            aria-label="add to favorites"
            disabled={!props.stock}
            onClick={apiPOSTcart}
          >
            <AddShoppingCartIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>

          {/* <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          ></IconButton> */}
        </CardActions>
      </Card>
    </Grid>
  );
}
