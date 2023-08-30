import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard';
import Axios from 'axios';
import AppContext from '../context/AppContext';

export default function CategoryPage() {
  const context = useContext(AppContext)
  let {id} = useParams();
  const url = "http://localhost:8000/products/category/";
  const [loading,setLoading] = useState(true)


  async function getProducts(){
    setLoading(true)
    await Axios.get(url+id)
    .then((output)=>{ 
  
      context.setProduct(output.data);
      setLoading(false)   
    })
    .catch((error)=>{
     alert(error)
    })
 }

   
  

  useEffect(()=>{
    getProducts();
  },[id])

  //fetch(url+id)



  return (
    <div className='max-w-7xl pt-16 mx-auto flex flex-wrap justify-between'>
      {loading ? ("Fetching data"):(context.product.map((product)=>{
         if (product.product_name.toLowerCase().includes(context.search.toLowerCase())) {
        return(
          <ProductCard key={product.id} product={product}/>
        )
         }
         
      }))}
    </div>
  )
}
