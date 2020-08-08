import React from "react";
import { Fab, makeStyles, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";
import CustomCard from "../CustomCard";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(5),
    },
  },
  position: {
    position: "fixed",
    bottom: "0px",
    right: "0px",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const AddProduct = (props) => {
  console.log(props);
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={1} align="center" justify="center">
        {products.map((product, index) => {
          return <CustomCard key={index}></CustomCard>;
        })}
      </Grid>

      <div className={clsx(classes.root, classes.position)}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => {
            props.history.push("/addproductform");
          }}
        >
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};

export default AddProduct;
