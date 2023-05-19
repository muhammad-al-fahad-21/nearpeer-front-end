'use client'

import { useEffect, useState } from 'react'
import User from '../../components/getAllUsers'
import Access_denied from '../../components/access_denied'
import userDetailsService from '../../services/userDetailsService'
import Message from '../../components/message'
import Navbar from '../../components/navbar'

const Users = () => {

  const [isAuth, setIsAuth] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')
  const [user, setUser] = useState([])
  const [tokenUser, setTokenUser] = useState(null)

  useEffect(() => {

    const token = localStorage.getItem('token')

    setTokenUser(token)

    const fetchCourses = async (token) => {
        const data = await userDetailsService.getAllUsers(token)

        if(data && !data.success) return setErr(data.msg)
    
        setUser(data.user)
    }
      
    fetchCourses(token)

  }, [isAdmin])

  useEffect(() => {

    const token = localStorage.getItem('token')

    const fetchProfile = async (token) => {
        const data = await userDetailsService.getUserProfile(token)

        if(data && !data.success) return setErr(data.msg)

        setIsAdmin(data.user.admin)
    }
        
    if(!token) {

      return window.location.href = '/login'

    }else {

      setIsAuth(true)
      fetchProfile(token)

    }

  }, [])

  if(isAuth === false) return <></>
  
  return (
    <>
        <title> All Users </title>
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} admin={isAdmin}/>
        <Message err={err} success={success}/>

        {
          isAdmin
          ? <User allUser={user} token={tokenUser} setErr={setErr} setSuccess={setSuccess}/>
          : isAuth && <Access_denied/>
        }
    </>
  )
}

export default Users