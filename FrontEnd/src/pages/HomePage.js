import React, { useContext, useEffect} from 'react'
import ProductCard from '../components/ProductCard';
import Axios from 'axios';
import AppContext from '../context/AppContext';

export default function HomePage() {
  const context = useContext(AppContext)
  const url = "http://localhost:8000/products";   // https://fakestoreapi.com/products


  async function getAllProducts(){
    await Axios.get(url)
    .then((output)=>{
      context.setProduct(output.data);
    })
    .catch((error)=>{
      console.log(error)
    })
   
  }

  useEffect(()=>{
    getAllProducts()
  },[])

  return (
    <div className='max-w-7xl mx-auto flex flex-wrap justify-between'>
      {context.product.map((product)=>{
        if (product.product_name.toLowerCase().includes(context.search.toLowerCase())) {
        return(
          <ProductCard key={product.id} product={product}/>
        )
        }
      })}
    </div>
  )
}
