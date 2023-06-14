'use client'

import {useEffect, useState, Suspense} from 'react'
import { getUserCourse } from '../../../services/courseService'
import { getUserProfile} from '../../../services/userDetailsService'
import Message from '../../../components/message'
import { useRouter } from 'next/navigation'

const Courses = () => {

  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState([])
  const [authToken, setAuthToken] = useState('')

  const [course, setCourse] = useState([])
  const [err, setErr] = useState('')
  const router = useRouter();

  useEffect(() => {

    const fetchCourses = async (token) => {
        const data = await getUserCourse(token)

        if(data && !data.success) return setErr(data.msg)

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
        <title> Course List</title>
        <Message err={err} success={''}/> 

        <table className="table__body">
            <thead>
                <tr>
                    <th> Id </th>
                    <th> User_Id </th>
                    <th> Title </th>
                    <th> Description </th>
                    <th> Rating </th>
                    <th> Publisher </th>
                    <th> Last Update </th>
                    <th> Upload Date </th>
                </tr>
            </thead>

            <tbody>
                    {
                        course && course.map((courses) => (
                            <tr key = {courses.id}>
                                <td>{courses.id}</td>
                                <td>{courses.user_id}</td>
                                <td>{courses.title && (courses.title).substring(0, 21)}</td>
                                <td>{courses.description && (courses.description).substring(0, 21) + '...'}</td>
                                <td>{courses.rating}</td>
                                <td>{courses.publisher}</td>
                                <td>{courses.last_update}</td>
                                <td>{courses.upload_date}</td>
                            </tr>
                        ))
                    }
            </tbody>
        </table>
    </Suspense>
  )
}

export default Courses