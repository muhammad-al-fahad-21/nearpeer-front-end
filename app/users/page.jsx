'use client'

import { useEffect, useState } from 'react'
import User from '../../components/getAllUsers'
import Access_denied from '../../components/access_denied'
import userDetailsService from '../../services/userDetailsService'
import Message from '../../components/message'
import Navbar from '../../components/navbar'

const Users = () => {

  const [isRoot, setIsRoot] = useState(false)
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

  }, [isRoot])

  useEffect(() => {

    const token = localStorage.getItem('token')
    token && setIsAuth(true);

    if(!token) return setErr('Please sign in to continue!')

    const fetchProfile = async (token) => {
        const data = await userDetailsService.getUserProfile(token)

        if(data && !data.success) return setErr(data.msg)

        data && data.user && setIsRoot(data.user.root)
        setIsAdmin(data.user.admin)
    }
        
    fetchProfile(token)

  }, [])
  
  return (
    <>
        <title> All Users </title>
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} admin={isAdmin}/>
        <Message err={err} success={success}/>

        {
          isAdmin
          ? <User allUser={user} token={tokenUser} setErr={setErr} setSuccess={setSuccess} isRoot={isRoot}/>
          : isAuth && <Access_denied/>
        }
    </>
  )
}

export default Users