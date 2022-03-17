
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
// import Navbar from './components/Navbar/Navbar';
import Navbarloggedin from './components/Navbar/NavbarLoggedin/NavbarLoggedIn';

import CreatePost from './pages/createPost';
import Dashboard from './pages/Dashboard';
import LoginForm from './pages/forms/login';
import PasswordReset from './pages/forms/passwordReset';
import RegisterForm from './pages/forms/register';
import Home from './pages/Home';
import SinglePost from './pages/SinglePost';

import { updateposts } from './app/slices/posts';
import { getPosts } from './services/posts/posts';
import EditPost from './pages/editPost';


const AppRoutes = () => {
   const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
   const dispatch = useDispatch()

   useEffect(() => {
      if (!isAuthenticated) return console.log('not authenticated')
      getPosts(0, (err, res) => {
         if (err) return console.log(err)
         dispatch(updateposts(res.data))
      })
   }, [isAuthenticated])

   return (
      <BrowserRouter>
         {isAuthenticated && <Navbarloggedin />}
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<RegisterForm />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/password-reset/:id/:token' element={<PasswordReset />} />

            <Route path='/create'
               element={
                  <RequireAuth isAuthenticated={isAuthenticated}>
                     <CreatePost />
                  </RequireAuth>
               }
            />
             <Route path={`/post/:id`}
               element={
                  <RequireAuth isAuthenticated={isAuthenticated}>
                     <SinglePost />
                  </RequireAuth>
               }
            />
             <Route path={`/dashboard`}
               element={
                  <RequireAuth isAuthenticated={isAuthenticated}>
                     <Dashboard />
                  </RequireAuth>
               }
            />
               <Route path={`/post/:id/edit`}
               element={
                  <RequireAuth isAuthenticated={isAuthenticated}>
                     <EditPost />
                  </RequireAuth>
               }
            />
            {/* <Route path='*' element={<RegisterForm />} /> */}

         </Routes>
      </BrowserRouter>
   )
}


function RequireAuth({ children, isAuthenticated }) {
   return isAuthenticated ? children : <Navigate to='/' />;
}

export default AppRoutes
