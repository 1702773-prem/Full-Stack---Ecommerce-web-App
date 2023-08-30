import React, {useState}from 'react'
import  Axios  from 'axios';
import { useNavigate } from 'react-router-dom';

function Add() {
    const navigate = useNavigate()
  

    const [data, setData] = useState({ 
        product_id:"",
        product_name:"",
        description:"",
        price:"",
        availability:"",
        url:"",
        category:"",
        rating:null
    })

    function collectIt(e) {
        //const name = e.target.name;
        const value = e.target.value;

        setData({ ...data, [e.target.name]: value })

    }

async function AddItem(){
    await Axios.post(`http://localhost:8000/admin/product/add`,{data:data})
    .then((output) => {
        if(output.data)
        {
            alert("1 product inserted")
            setData({
             product_id:"",
            product_name:"",
            description:"",
            price:"",
            availability:"",
            url:"",
            category:"",
            rating:null
            })
        }
    

    })
    .catch((error) => {
        console.log(error)
    })
 }


 


    return (
        <div className='flex flex-col gap-4 pt-20 text-lg mx-auto w-2/4' >

            <div className='flex justify-between' >
                <label htmlFor="" className='w-44'>Product ID :</label>
                <input type="text" name='product_id' className=' w-96 rounded-md border-2 py-1.5 text-gray-900 ' onChange={collectIt} value={data.product_id} /><br />
            </div>

            <div className='flex justify-between' >
                <label htmlFor="" className='w-44'>Product Name :</label>
                <input type="text" name='product_name' className='  w-96 rounded-md border-2 py-1.5 text-gray-900 ' onChange={collectIt} value={data.product_name} /><br />
            </div>


            <div className='flex items-center justify-between' >
                <label htmlFor="" className='w-44'>Product description :</label>
                <textarea name="description" id="" cols="46" rows="4" className=' rounded-md border-2 py-1.5 text-gray-900 ' value={data.description} onChange={collectIt} ></textarea><br />
            </div>


            <div className='flex justify-between' >
                <label htmlFor="" className='w-44'>Product Price :</label>
                <input type="text" name='price' className='  w-96 rounded-md border-2 py-1.5 text-gray-900 ' onChange={collectIt} value={data.price} /><br />
            </div>

            <div className='flex justify-between'>
                <label htmlFor="" className='w-44'>Availabiltiy :</label>
                <input type="text" name='availability' className='  w-96 rounded-md border-2 py-1.5 text-gray-900 ' onChange={collectIt} value={data.availability} /><br />
            </div>

            <div className='flex justify-between'>
                <label htmlFor="" className='w-44'> Product URL :</label>
                <input type="text" name='url' className=' w-96 rounded-md border-2 py-1.5 text-gray-900 ' onChange={collectIt} value={data.url} /><br />
            </div>

            <div className='flex justify-between'>
                <label htmlFor="" className='w-44'> Product Category :</label>
                <input type="text" name='category' className='  w-96 rounded-md border-2 py-1.5 text-gray-900 ' onChange={collectIt} value={data.category} /><br />
            </div>

            <div className='flex justify-between'>
                <label htmlFor="" className='w-44'> Product Ratings :</label>
                <input type="text" name='rating' className='  w-96 rounded-md border-2 py-1.5 text-gray-900 ' onChange={collectIt} value={data.rating} /><br />
            </div>

            <div><button className='bg-green-400 py-1 px-2 rounded-sm' onClick={AddItem} >ADD</button></div>
        </div>


    )
}

export default Add