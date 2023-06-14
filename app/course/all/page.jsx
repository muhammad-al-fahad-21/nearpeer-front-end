'use client'

import {useEffect, useState, Suspense} from 'react'
import { getAllCourses } from '../../../services/courseService'
import { getUserProfile } from "../../../services/userDetailsService"
import Message from '../../../components/message'
import Courses from '../../../components/getAllCourses'
import Access_denied from '../../../components/access_denied'
import { useRouter } from 'next/navigation'

const AllCourses = () => {

  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState([])
  const [authToken, setAuthToken] = useState('')

  const [success, setSuccess] = useState('')
  const [err, setErr] = useState('')
  const [course, setCourse] = useState([])
  const router = useRouter();

  useEffect(() => {

    const fetchCourses = async (token) => {
        const data = await getAllCourses(token)

        console.log(authToken)

        if(!data.success) return setErr(data.msg)
    
        setCourse(data.course)
    }
      
    authToken && fetchCourses(authToken)

  }, [authToken])

  useEffect(() => {

    const token = localStorage.getItem('token')

    if(token) {
        setAuth(true) 
        setAuthToken(token)
    }

    const fetchData = async (token) => {
      const res = await getUserProfile(token)

      if(!res.success) return router.push('/login');

      setUser(res.user)
    }

    fetchData(token)

  }, [])

  if(!auth && !user) return <></>
  
  return (
    <Suspense fallback={<div> Loading... </div>}>
        <title> All Courses </title>
        <Message err={err} success={success}/> 

        {
          user && user.admin
          ? <Courses course={course} token={authToken} setErr={setErr} setSuccess={setSuccess}/>
          : auth && <Access_denied/>
        }
    </Suspense>
  )
}

export default AllCourses