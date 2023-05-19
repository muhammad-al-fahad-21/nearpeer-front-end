'use client'

import {useEffect, useState} from 'react'
import courseService from '../../../services/courseService'
import userDetailsService from '../../../services/userDetailsService'
import Message from '../../../components/message'
import Navbar from '../../../components/navbar'
import { faBookMedical, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from "next/link"
import { useRouter } from 'next/navigation'

const Courses = () => {

  const [isAuth, setIsAuth] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [course, setCourse] = useState([])
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter();

  useEffect(() => {

    const token = localStorage.getItem('token')

    const fetchCourses = async (token) => {
        const data = await courseService.getUserCourse(token)

        if(data && !data.success) return setErr(data.msg)
    
        setSuccess(data.msg)
        setCourse(data.course)
    }
      
    fetchCourses(token)

  }, [isAuth])

  useEffect(() => {

    const token = localStorage.getItem('token')

    const fetchProfile = async (token) => {
        const data = await userDetailsService.getUserProfile(token)

        if(data && !data.success) return setErr(data.msg)

        setSuccess(data.msg)
        setIsAdmin(data.user.admin)
    }

    if(!token) {

      return router.push('/login')

    }else {

      setIsAuth(true)
      fetchProfile(token)

    }

  }, [])

  if(isAuth === false) return <></>
  
  return (
    <>
        <title> Course List</title>
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} admin={isAdmin}/>
        <Message err={err} success={success}/> 

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
                        isAuth && course && course.map((courses) => (
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

        {
        isAdmin && (
          <>
            <div class="fixed-button-1">
              <Link href='/course/create' legacyBehavior><a style={{borderWidth: '2px', padding: '10px', paddingTop: '20px', borderColor: 'green', borderRadius: '10px'}}><FontAwesomeIcon icon={faBookMedical} size='2x' color='green'/></a></Link>
            </div>

            <div class="fixed-button">
              <Link href='/users' legacyBehavior><a style={{borderWidth: '2px', padding: '12px', borderColor: 'red', borderRadius: '10px'}}><FontAwesomeIcon icon={faUsers} size='lg' color='red'/></a></Link>
            </div>
          </>
        )
      }
    </>
  )
}

export default Courses