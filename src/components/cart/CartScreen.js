import React from "react";
import MaterialTable from "material-table";
import productService from "../../services/ProductServices";
import Cart from "./Cart";
import { Grid, Button } from "@material-ui/core";

export default function CartScreen(props) {
  return (
    <div>
      {" "}
      <Cart />
      <Grid container>
        <Grid item xs={12} md={2} lg={2}></Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Button
            onClick={() => {
              props.history.push("/orderform2");
            }}
            variant="contained"
            color="primary"
            style={{ float: "right" }}
          >
            {" "}
            Checkout?
          </Button>
        </Grid>
        <Grid item xs={12} md={2} lg={2}></Grid>
      </Grid>
    </div>
  );
}
