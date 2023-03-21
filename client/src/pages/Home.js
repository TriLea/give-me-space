import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
    <div className="landing">
      <h1>Buy A Star, Save Hubble!</h1>
    </div>
    <div className="landing2">
      <h2>How many people can say they own their very own star?</h2>
    </div>
    <div className="landing3">
      <h2>The James Webb Telescope has bumped Hubble down to the second best telescope ever built. 
        If you're just as in love with Hubble as us, now is your chance to save Hubble! All purchases 
        will go toward advancing and improving the Hubble Telescope so that we can bring it back to 
        number one!
      </h2>
    </div>
  </div>
  );
};


  


export default Home;

