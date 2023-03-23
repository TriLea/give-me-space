import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  // const data = [
  //   {
  //     _id: "6F5DS78914267659892",
  //     purchaseDate: "1679372253",
  //     star: {
  //       index: "https://picsum.photos/200/200",
  //       name: "My cool name",
  //       type: "Red Giant",
  //       price: 25,
  //     },
  //   },
  //   {
  //     _id: "6F5DS789142676500001",
  //     purchaseDate: "1679372000",
  //     star: {
  //       index: "https://picsum.photos/200/200",
  //       name: "sweet name",
  //       type: "Blue Pig",
  //       price: 30,
  //     },
  //   },
  //   {
  //     _id: "6F5DS78914267650032",
  //     purchaseDate: "1679370001",
  //     star: {
  //       index: "https://picsum.photos/200/200",
  //       name: "Joji",
  //       type: "Pink Panda",
  //       price: 40,
  //     },
  //   },
  //   {
  //     _id: "6F5DS78914267651232",
  //     purchaseDate: "1679370002",
  //     star: {
  //       index: "https://picsum.photos/200/200",
  //       name: "Ganji",
  //       type: "Red Bird",
  //       price: 35,
  //     },
  //   },
  // ];

  let user;

  if (data) {
    user = data.user;
  }

  return (
    <>
        <Link to="/">← Back to Home</Link>
      <div id="dash"className="container2">

        {data.map(obj => (
          <div key={obj._id} className="card">
            <img src="https://picsum.photos/200/200" /> 
            <div>
              <h6>{obj.star.name}</h6>
              <h6>{obj.star.index}</h6>
              <h6>{obj.star.type}</h6>
              <h6>{obj.star.price}</h6>
            </div>
          </div>
        ))}

        {user ? (
          <>
            <h2>
              Order History for {user.firstName} {user.lastName}
            </h2>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
                  {order.products.map(({ _id, image, name, price }, index) => (
                    <div key={index} className="card px-1 py-1">
                      <Link to={`/products/${_id}`}>
                        <img alt={name} src={`/images/${image}`} />
                        <p>{name}</p>
                      </Link>
                      <div>
                        <span>${price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default OrderHistory;
