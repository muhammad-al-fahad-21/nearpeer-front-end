'use client'

import React, {useEffect, useState } from 'react'
import AcessDenied from '../../../components/access_denied'
import courseService from '../../../services/courseService'
import userDetailsService from '../../../services/userDetailsService'
import Message from '../../../components/message'
import Navbar from '../../../components/navbar'
import Course from '../../../components/course'

const initialState = {
  user_id: 0,
  title: '',
  description: '',
  rating: 0,
  publisher: '',
  lastest_update: '',
  upload_date: '',
  err: '',
  success: ''
}

const Create = () => {

  const [course, setCourse] = useState(initialState)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const {user_id, title, description, rating, publisher, lastest_update, upload_date, err, success} = course

  const handleChangeInput = (props) => {
    const {name, value} = props.target
    setCourse({...course, [name]: value, err: '', success: ''})
  }

  useEffect(() => {

    const token = localStorage.getItem('token')

    const fetchProfile = async (token) => {
        const data = await userDetailsService.getUserProfile(token)

        if(data && !data.success) return setCourse({...course, err: data.msg, success: ''})

        setCourse({...course, publisher: data.user.name, err: '', success: ''})
        setIsAdmin(data.user.admin)
    }

    if(!token) {

      return window.location.href = '/login'

    }else {

      setIsAuth(true)
      fetchProfile(token)

    }

  }, [])

  const handleSubmit = async (props) => {
    props.preventDefault()

    const token = localStorage.getItem('token')
    if(!token) return setCourse({...course, err: 'Please sign in to continue!', success: ''})
    if(rating < 0 && rating > 100) return setCourse({...course, err: 'Rating range is (0 - 100)', success: ''})

    const field = !title ? 'Title' : !publisher ? 'Publisher' : !upload_date ? 'Upload Date' : ''

    if(field !== '') return setCourse({...course, err: `Please fill the ${field} field!`, success: ''})

    const data = await courseService.createUserCourses(token, user_id, {title, description, rating, publisher, lastest_update, upload_date})

    if(!data.success) return setCourse({...course, err: data.msg, success: ''})

    setCourse({...course, err: '', success: data.msg})
    window.location.href = '/course/all';
  }

  if(isAuth === false) return <></>

  return (
    <>
    <title> Create Course </title>
    <Navbar isAuth={isAuth} setIsAuth={setIsAuth} admin={isAdmin}/>
    <Message err={err} success={success}/> 
    {
      isAdmin
      ? <Course course={course} handleSubmit={handleSubmit} handleChangeInput={handleChangeInput}/>
      : <AcessDenied/>
    }
    </>
  )
}

export default Create