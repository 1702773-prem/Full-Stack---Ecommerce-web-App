const express = require('express')
const Cors = require("cors")
const BodyParser = require("body-parser")
const app = express()
const mysql = require('mysql2')
app.use(Cors())
app.use(BodyParser.json())
//app.use(express.urlencoded()) 


    const connection = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"Prem@1800",
        database:"ecommerce"
    })


connection.connect((error)=>{
    if(error){
        console.log("Connection failed")
        return
    }

    console.log("connected")
})




app.post('/admin', function(req,res){
    const message = req.body.message
   const email = req.body.message.email
   const password = req.body.message.password

   try {

      if(message)
      {
        connection.query('select * from admin where email = ? and password = ? ',[email,password], (error,result)=>{
            if(error){
                throw error
               
            }
           // console.log(result)
            if(result.length>0)
            {
                res.send(true)
            }
            else{
                res.send(false)
            }
           
        })
      }
    
   } catch (error) {
    
   }
  
 
})

app.post('/user', function(req,res){
    const message = req.body.message
   const email = req.body.message.email
   const password = req.body.message.password

   try {

      if(message)
      {
        connection.query('select * from users where email = ? and password = ? ',[email,password], (error,result)=>{
            if(error){
                throw error
               
            }
           // console.log(result)
            if(result.length>0)
            {
                res.send(result)
            }
            else{
                res.send(false)
            }
           
        })
      }
    
   } catch (error) {
    console.log(error)
   }
  
 
})

app.post('/signup', function(req,res){
    const message = req.body.message
    const name = req.body.message.name
   const email = req.body.message.email
   const password = req.body.message.password

   try {

      if(message)
      {
        connection.query(`insert into users values ("${name}", "${email}", "${password}")`, (error,result)=>{
            if(error){
                throw error
               
            }
    
            if(result.affectedRows>0)
            {
                res.send(true)
            }
            else{
                res.send(false)
            }
           
        })
      }
    
   } catch (error) {
    console.log(error)
   }
  
 
})

app.get('/products',function(req,res){
    connection.query('select * from products',(error, result)=>{
     
        if(error){
            throw error
        }

       res.send(result)

    }
    )
})

app.get('/admin/product',function(req,res){
    connection.query('select * from products',(error, result)=>{
     
        if(error){
            throw error
        }

       res.send(result)

    }
    )
})

app.get('/products/categories',function(req,res){
    connection.query('select category from products',(error, result)=>{
     
        if(error){
            throw error
        }

       res.send(result)

    }
    )
})



app.get('/products/category/:category',function(req,res){
    
    const cat =  req.params.category
   // console.log(cat)
    connection.query('select * from products where category = ?',[cat],(error, result)=>{
     
        if(error){
            throw error
        }

       res.send(result)

    }
    )
})

app.delete('/admin/product/:id',function(req,res){

     const id = Number( req.params.id)

    connection.query('delete from products where product_id = ? ',[id],(error,result)=>{
        if(error){
            throw error
        }
        res.send(result)
    })

})

app.get('/admin/product/:id',function(req,res){

    const id = Number( req.params.id)
   connection.query('select * from products where product_id = ? ',[id],(error,result)=>{
       if(error){
           throw error
       }
       res.send(result)
   })

})

app.get('/product/:id',function(req,res){

    const id = Number( req.params.id)
   connection.query('select * from products where product_id = ? ',[id],(error,result)=>{
       if(error){
           throw error
       }
       res.send(result)
   })

})

app.put('/admin/product/:id',function(req,res){

    const id = Number( req.params.id)
    const data = req.body.data
   connection.query('update products set product_id = ? , product_name = ? , description = ? , price = ? , availability = ? ,  url = ?, category = ?, rating = ? where product_id = ? ',[Number(data.product_id), data.product_name, data.description, Number(data.price), data.availability, data.url, data.category, Number(data.rating), id], (error,result)=>{
       if(error){
           throw error
       }
       res.send(true)
   })

})

app.post('/admin/product/add/',function(req,res){

    const data = req.body.data
   connection.query(`insert into products (product_id,product_name,description,price,availability,url,rating,category) values (${Number(data.product_id)},"${data.product_name}", "${data.description}", ${Number(data.price)}, "${data.availability}","${data.url}", ${Number(data.rating)},"${data.category}")`, (error,result)=>{
       if(error){
           throw error
       }
       res.send(true)
   })

})

app.post('/product/addToCart',function(req,res){
    const data = req.body.data
    const email = req.body.login

    connection.query('select * from cart where email = ? and product_id = ?', [email,data.product_id], (error,result)=>{

        if(error){
            throw error
        }

        if(result.length==0)
        {
            connection.query(`insert into cart values("${email}",${data.product_id},"${data.product_name}",1,${data.price})`,(error,result)=>{

                if(error)
                {
                    throw error
                }
                res.send("item added to cart")
            })
        }
        else{

            const newquant = result[0].quantity+1
            connection.query('update cart set quantity = ? , price = ? where email = ? and product_id = ? ',[newquant, newquant*data.price, email, data.product_id ], (error,result)=>{

                if(error)
                {
                    throw error
                }
                res.send("1 more item added to cart")
            })

        }
    })

})

app.get('/cart/:email', function(req,res){
    const email = req.params.email
    console.log(email)
  connection.query('select product_id, product_name, quantity, price from cart where email = ? ',[email], (error,result)=>{
        if(error)
        {
            throw new error
        }
        res.send(result)
    })
})

app.delete('/cart/:id',async function(req,res){
    const id = Number( req.params.id)
 connection.query('delete from cart where product_id = ?',[id], (error,result)=>{
        if(error)
        {
            throw new error
        }
       
    })
})



app.listen(8000, ()=>{
    console.log("server is runing")
})