import React from "react";
import { Grid } from "@material-ui/core";
import RecipeReviewCard from "../CustomCard";
import { useMediaQuery } from "react-responsive";
import CustomCarousel from "../Carousel/Carousel";
import productService from "../../services/ProductServices";
const Home = (props) => {
  const [imgBuffer, setImgBuffer] = React.useState("");
  const [products, setProducts] = React.useState([]);

  const apiGETproducts = () => {
    productService
      .getAllProducts()
      .then(function (data) {
        //   console.log(data[0].image.data);
        setProducts(data);
        //props.setbadge("12");
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
              badge={props.badge}
              setbadge={props.setbadge}
              key={index}
              image={product.image.data}
              stock={product.stock}
              product={product}
            ></RecipeReviewCard>
          );
        })}
      </Grid>
    </div>
  );
};
export default Home;
