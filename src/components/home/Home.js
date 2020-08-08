import React from "react";
import { Grid } from "@material-ui/core";
import RecipeReviewCard from "../CustomCard";
import { useMediaQuery } from "react-responsive";
import CustomCarousel from "../Carousel/Carousel";
import productService from "../../services/ProductServices";
const Home = () => {
  const [imgBuffer, setImgBuffer] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const apiGETproducts = () => {
    productService
      .getAllProducts()
      .then(function (data) {
        //   console.log(data[0].image.data);
        setProducts(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  React.useEffect(apiGETproducts, []);
  return (
    <div>
      <CustomCarousel></CustomCarousel>
      <Grid container spacing={1} align="center" justify="center">
        {products.map((product, index) => {
          return (
            <RecipeReviewCard
              key={index}
              image={product.image.data}
            ></RecipeReviewCard>
          );
        })}
      </Grid>
    </div>
  );
};
export default Home;
