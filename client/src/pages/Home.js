import React from 'react'
import { useSelector } from 'react-redux'
import RegisterForm from './forms/register'
import Posts from './posts'

//display hero if not authenticated 
const Home = () => {
   const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

   return (
      <>
         {
            isAuthenticated ? <Posts /> : <RegisterForm />
         }
      </>
   )
}

export default Home