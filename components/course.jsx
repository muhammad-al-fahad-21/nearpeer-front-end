'use client'

import {useEffect, useState} from 'react'
import { showErrMsg, showSuccessMsg } from './notification'
import courseService from '../services/courseService'
import userDetailsService from '../services/userDetailsService'
import Link from "next/link"

const initialState = {
    name: '',
    email: '',
    city: '',
    dob: '',
    phone: '',
    gender: '',
    isAdmin: false,
    err: '',
    success: ''
}

const Courses = () => {

  const [user, setUser] = useState(initialState)
  const [isAuth, setIsAuth] = useState('')
  const [course, setCourse] = useState([])
  const { name, email, city, dob, phone, gender, isAdmin, err, success} = user

  useEffect(() => {

    const token = localStorage.getItem('token')
    token && setIsAuth(true);

    if(!token) return setUser({...user, err: 'Please sign in to continue!', success: ''})

    const fetchCourses = async (token) => {
        const data = await courseService.getUserCourse(token)

        if(data && !data.success) return setUser({...user, err: data.msg, success: ''})
    
        setUser({...user,  err: '', success: data.msg})
        setCourse(data.course)
    }
      
    fetchCourses(token)

  }, [])

  useEffect(() => {

    const token = localStorage.getItem('token')
    token && setIsAuth(true);

    if(!token) return setUser({...user, err: 'Please sign in to continue!', success: ''})

    const fetchProfile = async (token) => {
        const data = await userDetailsService.getUserProfile(token)

        if(data && !data.success) return setUser({...user, err: data.msg, success: ''})

        setUser({
            ...user,
            name: data.user.name,
            email: data.user.email,
            city: data.user.city,
            dob: data.user.dob,
            phone: data.user.phone,
            gender: data.user.gender,
            isAdmin: data.user.isAdmin, 
            err: '', 
            success: data.msg
        })
    }
        
    fetchProfile(token)

  }, [])

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuth(false)
  }
  
  return (
    <>
        <title> Course List</title>
            <div className='flex items-center justify-between' style={{margin: '10px'}}>
                <div style={{marginLeft: '30%', width: '30%'}}>
                    {err && showErrMsg(err)}
                    {success && showSuccessMsg(success)}
                </div>
                <div>
                    {
                        !isAuth && <Link href='/login'> <button className='gradient-border-button'> Login </button> </Link>
                    }
                    {
                        isAuth && <Link href='/'> <button className='gradient-button' onClick={logout}> Logout </button> </Link>
                    }
                </div>
            </div>

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
                        <Link href='/course/create'><button><img src= 'course.svg' alt= 'new admin' width='30px' height='30px'/></button></Link>
                    </div>

                    <div class="fixed-button">
                        <Link href='/users'><button><img src= 'user.svg' alt= 'new admin' width='30px' height='30px'/></button></Link>
                    </div>
                </>
            )
        }

    </>
  )
}

export default Courses