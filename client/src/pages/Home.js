import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div id="home"className="container">
      <div className="card bg-white card-rounded">
    <div className="card-header bg-dark text-center">
      <h1>Buy A Star, Save Hubble!</h1>
    </div>
    <div className="card-body m-5">
      <h2>How many people can say they own their very own star?</h2>
    </div>
    <div className="card-footer text-center m-3">
      <h2>The James Webb Telescope has bumped Hubble down to the second best telescope ever built. 
        If you're just as in love with Hubble as us, now is your chance to save Hubble! All purchases 
        will go toward advancing and improving the Hubble Telescope so that we can bring it back to 
        number one!
      </h2>
    </div>
  </div>
    </div>
  );
};


  


export default Home;

