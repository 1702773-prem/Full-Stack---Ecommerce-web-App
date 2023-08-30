import { useState } from "react";
import AppContext from "./AppContext";
import { useNavigate } from "react-router-dom";
import  Axios  from "axios";

function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [login, setLogin] = useState(false)
  const [adminLogin, setadminLogin] = useState(false)
  const [product, setProduct] =useState([])
  const [search, setSearch] = useState('')

  const navigate = useNavigate()

  const appName = "MyNewStore";

  async function addProductToCart(product) {
        if(login)
        {
            //Check if the product already exists in cart

            await Axios.post('http://localhost:8000/product/addToCart',{data:product, login:login})
            .then((output)=>{
             alert(output.data)
            })
            .catch((error)=>{
              console.log(error)
            })

        }
        else
        {
          navigate('/login')
        }
       
  }

  console.log(cart)

  return (
    <AppContext.Provider value={{ appName, cart, setCart, addProductToCart, login, setLogin,product,setProduct,adminLogin,setadminLogin , search, setSearch }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;