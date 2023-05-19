'use client'

import {useEffect, useState} from 'react'
import courseService from '../../../services/courseService'
import userDetailsService from '../../../services/userDetailsService'
import Message from '../../../components/message'
import Navbar from '../../../components/navbar'
import { faBookMedical, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from "next/link"
import AccessDenied from '../../../components/access_denied'

const Courses = () => {

  const [isAuth, setIsAuth] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [course, setCourse] = useState([])
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')

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

      return window.location.href = '/login'

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
                <Link href='/course/create'><button><FontAwesomeIcon icon={faBookMedical} size='2x' color='green'/></button></Link>
            </div>

            <div class="fixed-button">
                <Link href='/users'><button><FontAwesomeIcon icon={faUsers} size='lg' color='red'/></button></Link>
            </div>
          </>
        )
      }
    </>
  )
}

export default Courses