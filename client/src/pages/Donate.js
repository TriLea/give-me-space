import React,{useState, useEffect} from "react";

// imports stripe
import { loadStripe } from "@stripe/stripe-js";

// library for functions that
import { useLazyQuery, useQuery } from "@apollo/client";

// imports the query
import { QUERY_CHECKOUT, QUERY_STAR } from "../utils/queries"; // need to fix to match our project

// imports the auth helper function
import Auth from "../utils/auth"; // need to fix to match our project

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY); // need to set keys in .env

const Donate = () => {
  const [amount, setAmount] = useState(0)
  const [starName, setStarName] = useState("")
  const [index, setIndex] = useState("RN-001")
  const [type, setType] = useState("red giant")
  //added
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT); // this is the query that is called when the checkout button is clicked

  const { data: starData } = useQuery(QUERY_STAR); // this is the query that is called when the page loads
  //using the react hook useEffect to check if the data is there? I think?
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => { 
    if (starData) {
      console.log("logging star", starData.star);
      setIndex(starData.star.index);
      setType(starData.star.type);
    }
  }, [starData]);

  const handleSubmit=function(ev) {
    ev.preventDefault();
    console.log("Star Name", starName) 
    console.log("Amount", amount)
    localStorage.setItem("star", JSON.stringify({index, type, name: starName, price: parseFloat(amount) }));
    //added
    getCheckout({
      variables: { index, type, name: starName, price: parseFloat(amount) },
    });
  }
  return (
    <div id="donate" className="container3">
      <h2>Please make a selection to choice donation.</h2>
      <h2>Then create a name!</h2>
      {starData ? (
      <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="index">
          starIndex
        </label>
        <input type="text" name="index" id="index" value = {starData.star.index} disabled/>
      </div>
      <div>
        <label htmlFor="type">
          type
        </label>
        <input type="text" name="type" id="type" value = {starData.star.type} disabled/>
      </div>

       <div id="donate-drop"className="Donatedrop">
      <select id="type" value={amount} onChange={(ev)=> setAmount (ev.target.value)} >
        <option value={0} disabled>Please Select Donation Amount...</option>
        <option value={25}>Red Giant $25</option>
        <option value={20}>White Dwarf $20</option> 
        <option value={15}>Neutron $15</option>
        <option value={10}>Red Dwarf $10</option>
        <option value={5}>Brown Dwarf $5</option>
      </select>
      </div> 
      <div>
        <h2><label htmlFor="star" value={starName} >Star Name</label> <input type="text" name="star" id="star" onChange={(ev)=> setStarName (ev.target.value)}/>
        </h2>
      </div>
      <div>
        <button>Donate</button>
      </div>
      </form>
      ):(<div> Loading </div>)}
    </div>
  );
};

export default Donate;