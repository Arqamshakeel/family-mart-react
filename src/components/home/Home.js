import React from "react";
import { Grid } from "@material-ui/core";
import RecipeReviewCard from "../CustomCard";
import device from "../../services/deviceCheck/DeviceCheck";
import { useMediaQuery } from "react-responsive";
import CustomCarousel from "../Carousel/Carousel";
const Home = () => {
  return (
    <div>
      <CustomCarousel></CustomCarousel>
      <Grid container spacing={1} align="center" justify="center">
        <RecipeReviewCard></RecipeReviewCard>
        <RecipeReviewCard></RecipeReviewCard>
        <RecipeReviewCard></RecipeReviewCard>
        <RecipeReviewCard></RecipeReviewCard>
        <RecipeReviewCard></RecipeReviewCard>
        <RecipeReviewCard></RecipeReviewCard>
        <RecipeReviewCard></RecipeReviewCard>
        <RecipeReviewCard></RecipeReviewCard>
      </Grid>
    </div>
  );
};
export default Home;
