import Axios  from 'axios'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../context/AppContext'

function AddProduct() {

   const context = useContext(AppContext)

   async function getProduct(){
        await Axios.get("http://localhost:8000/admin/product")
        .then((output)=>{
                context.setProduct(output.data)
        })
        .catch((error)=>{
             console.log(error)
        })
    }

    useEffect(function(){
       getProduct()
    },[])

    async function deleteItem(e){
        const id =  e.target.parentElement.parentElement.id
       await Axios.delete(`http://localhost:8000/admin/product/${id}`)
       .then(()=>{
       getProduct()
       })
       .catch((error)=>{
        console.log(error)
       })
    }

  
   

  return (
    <div className='pt-16 mx-4 '>
        <div>
            <Link to='/admin/product/add'><button className='w-40 bg-green-500 mt-6 text-xl cursor-pointer  '>ADD PRODUCT</button></Link>
        </div>
        <table className='mx-auto mt-6'>
            <tr >
                <th class="border border-slate-300 p-2 ">
                    Product ID
                </th>
               
                <th class="border border-slate-300 p-2 " >
                    Product Name
                </th>
                <th class="border border-slate-300 p-2 w-96">
                    Product Description
                </th>
                <th class="border border-slate-300 p-2  ">
                    Price
                </th>
                <th class="border border-slate-300 p-2 ">
                    Availabiltiy
                </th>
                <th class="border border-slate-300 p-2 ">
                    Url
                </th>
                <th class="border border-slate-300 p-2 ">
                     Category
                </th>
                <th class="border border-slate-300 p-2 ">
                    Rating
                </th>
                <th class="border border-slate-300 p-2 ">
                   Update
                </th>
                <th class="border border-slate-300 p-2 ">
                    Delete
                </th>
            </tr>

            {
                context.product.map(function(item){
                    return(
                        <tr key={item.product_id} id={item.product_id}>
                             <td class="border border-slate-300 p-2 ">
                                 {item.product_id}
                            </td>
                            <td class="border border-slate-300 p-2 ">
                                 {item.product_name}
                            </td>
                            <td class="border border-slate-300 p-2 ">
                                 {item.description}
                            </td>
                            <td class="border border-slate-300 p-2 ">
                                 {item.price}
                            </td>
                            <td class="border border-slate-300 p-2 ">
                                 {item.availability}
                            </td>
                            <td class="border border-slate-300 p-2 ">
                                 {item.url}
                            </td>
                            <td class="border border-slate-300 p-2 ">
                                 {item.category}
                            </td>
                            <td class="border border-slate-300 p-2 ">
                                 {item.rating}
                            </td>
                            <td class="border border-slate-300 p-2 text-red-500 ">
                            <Link to={`/admin/product/${item.product_id}`}>update</Link>
                            </td>
                            <td class="border border-slate-300 p-2 text-red-500">
                                 <button  onClick={deleteItem}>delete</button>
                            </td>
                        </tr>
                    )
                })
            }

        </table>
    </div>
  )
}

export default AddProduct