import React,{useContext, useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Axios from 'axios'
import AppContext from '../context/AppContext'

export default function LoginPage() {

  const context = useContext(AppContext)

  const navigate = useNavigate()

  const [user , setUser] = useState({
      email:"",
      password:""
  })

  function setLoginData(e){
      setUser({...user, [e.target.name]:e.target.value})
  }

 async function loginAsUser(e){
  e.preventDefault()
     await Axios.post("http://localhost:8000/user",{"message":user})
     .then((output)=>{
      console.log(output.data)
      if(output.data){
        context.setLogin(output.data[0].email)
       navigate('/')
      }
      else{
          alert("User details incorrect")
      }
      
     })
     .catch((error)=>{
      alert(error)
     })
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-16 lg:px-8 ">

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}  onChange={setLoginData}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={user.password}  onChange={setLoginData}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={loginAsUser}>
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Create a Account
          </Link>
        </p>
      </div>
      <div className='flex justify-center'>
       <Link to='/admin'> <button
          type="submit"
          className="w-96 mt-10  rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
          Log in as Admin
        </button></Link>
      </div>
    </div>
  )
}
