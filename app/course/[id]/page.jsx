'use client'

import React, {useEffect, useState } from 'react'
import AcessDenied from '../../../components/access_denied'
import courseService from '../../../services/courseService'
import userDetailsService from '../../../services/userDetailsService'
import Message from '../../../components/message'
import Navbar from '../../../components/navbar'
import Course from '../../../components/course'
import { useRouter } from 'next/navigation'

const initialState = {
  user_id: 0,
  title: '',
  description: '',
  rating: 0,
  publisher: '',
  last_update: '',
  upload_date: '',
  err: '',
  success: ''
}

const Update = ({ params: {id} }) => {

  const [course, setCourse] = useState(initialState)
  const [isAuth, setIsAuth] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter();

  const {user_id, title, description, rating, publisher, last_update, upload_date, err, success} = course

  const handleChangeInput = (props) => {
    const {name, value} = props.target
    setCourse({...course, [name]: value, err: '', success: ''})
  }

  useEffect(() => {

    const token = localStorage.getItem('token');
    token && setIsAuth(true);
    if (!token) return setCourse({...course, err: 'Please sign in to continue!', success: ''});

    const fetchProfile = async (token) => {
        const data = await courseService.getCourse(token, id)

        if(data && !data.success) return setCourse({...course, err: data.msg, success: ''})

        setCourse({...course, user_id: data.course.user_id, title: data.course.title, description: data.course.description, rating: data.course.rating, publisher: data.course.publisher, last_update: data.course.last_update, upload_date: data.course.upload_date, err: '', success: ''})
    }
      
    fetchProfile(token)

  }, [isAdmin])

  useEffect(() => {

    const token = localStorage.getItem('token');

    const fetchProfile = async (token) => {
        const data = await userDetailsService.getUserProfile(token)

        if(data && !data.success) return setCourse({...course, err: data.msg, success: ''})

        setIsAdmin(data.user.admin)
    }

    if(!token) {

      return router.push('/login')

    }else {

      setIsAuth(true)
      fetchProfile(token)

    }

  }, [])

  const handleSubmit = async (props) => {
    props.preventDefault()

    const token = localStorage.getItem('token');
    token && setIsAuth(true);
    if (!token) return setCourse({...course, err: 'Please sign in to continue!', success: ''});
    if(rating < 0 || rating > 5) return setCourse({...course, err: 'Rating range is (0 - 5)', success: ''})

    const field = !title ? 'title' : !publisher ? 'publisher' : !last_update ? 'Latest Update' : !upload_date ? 'upload_date' : ''

    if(field !== '') return setCourse({...course, err: `Please fill the ${field} field!`, success: ''})

    const data = await courseService.updateCourse(token, id, user_id, {title, description, rating, publisher, last_update, upload_date})

    if(!data.success) return setCourse({...course, err: data.msg, success: ''})

    setCourse({...course, err: '', success: data.msg})
    window.location.href = '/course/all';
  }

  if(isAuth === false) return <></>

  return (
    <>
    <title> Update Course </title>
    <Navbar isAuth={isAuth} setIsAuth={setIsAuth} admin={isAdmin}/>
    <Message err={err} success={success}/> 
  
    {
      isAdmin
      ? <Course course={course} handleSubmit={handleSubmit} handleChangeInput={handleChangeInput} id={id}/>
      : <AcessDenied/>
    }
    </>
  )
}

export default Update