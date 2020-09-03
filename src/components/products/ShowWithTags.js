import React, { Fragment } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import RecipeReviewCard from "../CustomCard";
import { useMediaQuery } from "react-responsive";
import CustomCarousel from "../Carousel/Carousel";
import productService from "../../services/ProductServices";
import Skeleton from "@material-ui/lab/Skeleton";
const ShowWithTags = (props) => {
  const [imgBuffer, setImgBuffer] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const [deleted, setDeleted] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);

  const apiGETproducts = () => {
    setNotFound(false);
    productService
      .getProductsByTag(props.match.params.name)
      .then(function (data) {
        //   console.log(data[0].image.data);
        setProducts(data);
        // setDeleted(true);
        setDeleted(false);
        //console.log(data[2].category);
      })
      .catch(function (error) {
        setNotFound(true);
        console.log(error);
      });
  };
  React.useEffect(apiGETproducts, [deleted, props.match.params.name]);
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={6} lg={4}></Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper>
            <Typography
              variant="h3"
              gutterBottom
              style={{ textAlign: "center" }}
            >
              {props.match.params.name}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}></Grid>
      </Grid>
      <Grid container spacing={1} align="center" justify="center">
        {notFound === false ? (
          products.length != 0 ? (
            products.map((product, index) => {
              return (
                <RecipeReviewCard
                  badge={props.badge}
                  setbadge={props.setbadge}
                  key={index}
                  image={product.image.data}
                  stock={product.stock}
                  product={product}
                  setProducts={setProducts}
                  setDeleted={setDeleted}
                ></RecipeReviewCard>
              );
            })
          ) : (
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((val, index) => {
              return (
                <div key={index} style={{ margin: "20px" }}>
                  <Skeleton variant="text" />
                  <Skeleton variant="circle" width={40} height={40} />
                  <Skeleton variant="rect" width={345} height={178} />
                </div>
              );
            })
          )
        ) : (
          <Typography variant="h5">
            Sorry no products found in this category...
          </Typography>
        )}
      </Grid>
    </div>
  );
};
export default ShowWithTags;
