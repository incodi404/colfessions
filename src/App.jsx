import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import Error from './pages/Error'
import UserInfo from './pages/UserInfo'
import Landing from './pages/Landing'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { SERVER_LINK } from './constant'
import { login, logout } from './store/authSlice.js'
import Post from './pages/Post'
import MyProfile from './pages/MyProfile'
import Institution from './pages/Institution'
import Update from './pages/Update'

function App() {

  const dispatch = useDispatch()
  const auth = useSelector((state)=> state.auth.status)

  useEffect(()=>{
    async function fetchUser() {
      try {
        const res = await axios({
          url: `${SERVER_LINK}/user/get-user`,
          method: "get",
          withCredentials: true
        })
        const userData = res.data.data
        dispatch(login({userData: userData}))
        if(!userData['age']){
          return <UserInfo />
        }
      } catch (error) {
        dispatch(logout())
      }
    }

    fetchUser()
  }, [auth])

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path='' element={auth? <Dashboard/> : <Landing/>} />
        <Route path='user-info' element={<UserInfo/>} />
        <Route path='create-post' element={<Post/>} />
        <Route path='my-profile' element={<MyProfile/>} />
        <Route path='institutions' element={<Institution/>} />
        <Route path='update' element={<Update/>} />
        <Route path='error' element={<Error/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App