'use client'

import {useEffect, useState} from 'react'
import courseService from '../../../services/courseService'
import userDetailsService from '../../../services/userDetailsService'
import Message from '../../../components/message'
import Navbar from '../../../components/navbar'
import Courses from '../../../components/getAllCourses'
import Access_denied from '../../../components/access_denied'

const AllCourses = () => {

  const [isAdmin, setIsAdmin] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')
  const [course, setCourse] = useState([])
  const [tokenUser, setTokenUser] = useState(null)

  useEffect(() => {

    const token = localStorage.getItem('token')

    setTokenUser(token)

    const fetchCourses = async (token) => {
        const data = await courseService.getAllCourses(token)

        if(data && !data.success) return setErr(data.msg)
    
        setCourse(data.course)
    }
      
    fetchCourses(token)

  }, [isAdmin])

  useEffect(() => {

    const token = localStorage.getItem('token')

    const fetchProfile = async (token) => {
        const data = await userDetailsService.getUserProfile(token)

        if(data && !data.success) return setErr(data.msg)

        data && data.user && setIsAdmin(data.user.admin)
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
        <title> All Courses </title>
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} admin={isAdmin}/>
        <Message err={err} success={success}/> 

        {
          isAdmin
          ? <Courses course={course} token={tokenUser} setErr={setErr} setSuccess={setSuccess}/>
          : isAuth && <Access_denied/>
        }
    </>
  )
}

export default AllCourses