import React,{useState, useEffect} from "react";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";

const Donate = () => {
  const [amount, setAmount] =useState(0)
  const [starName, setStarName] =useState("")
const handleSubmit=function(ev){
  ev.preventDefault();
  console.log("Star Name", starName) 
  console.log("Amount", amount)
}
  return (
    <div id="donate" className="container3">
      <h2>Please make a selection to choice donation.</h2>
      <h2>Then create a name!</h2>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default Donate;