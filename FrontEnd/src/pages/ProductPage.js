import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

export default function ProductPage() {
  let { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const url = "http://localhost:8000/product/";

  async function getProductData() {
    setLoading(true)
    await Axios.get(url+id)
    .then((output)=>{ 
      setProduct(output.data);
      setLoading(false)   
    })
    .catch((error)=>{
     alert(error)
    })
  }
  useEffect(() => {
    getProductData();
  }, [id]);

  console.log(product)

  return (
    <div className="max-w-7xl mx-auto pt-16">
      {loading ? "Fetching Product Data" : <ProductDetails product={product[0]} />}
    </div>
  );
}

function ProductDetails(props) {
  return (
    <div className="flex">
      <div className="w-1/2">
        <img
          src={props.product.url}
          className="h-96"
          alt={props.product.product_name
          }
        />
      </div>

      <div className="w-1/2">
        <h1 className="text-3xl text-blue-700">{props.product.product_name
}</h1>
        <p className="my-12">{props.product.description}</p>
        <span className="capitalize bg-blue-400 p-2 rounded-md">
          {props.product.category}
        </span>
        <div className="flex justify-between items-center">
          <h3 className=" text-lg mt-4">Rating: {props.product.rating}</h3>
          <h3>Price: {props.product.price}</h3>
          <h3>Availability : {props.product.availability} </h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-sm">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
