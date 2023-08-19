'use client'

import {useEffect, useState } from 'react'
import { createUserCourses } from '../../../services/courseService'
import Course from '../../../components/course'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { Success, Error } from '../../../store/model'
import { Courses } from '../../../store/course'

const initialState = {
  user_id: 0,
  title: '',
  description: '',
  rating: 0,
  lastest_update: '',
  upload_date: ''
}

const Create = () => {

  const [course, setCourse] = useState(initialState)
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const router = useRouter();

  const {user_id, title, description, rating, upload_date} = course
  const { user } = state

  useEffect(() => {
    if(user.token) dispatch(Courses(user.token))
    else return router.push('/login')
  }, [user.token])

  const handleChangeInput = (props) => {
    const {name, value} = props.target
    setCourse({...course, [name]: value})
  }

  const handleSubmit = async (props) => {
    props.preventDefault()

    if(rating < 1 || rating > 5) return dispatch(Error('Rating range is (1 - 5)'))
    const field = !title ? 'Title' : !upload_date ? 'Upload Date' : ''
    if(field !== '') return dispatch(Error(`Please fill the ${field} field!`))

    const data = await createUserCourses(user.token, user_id, {title, description, rating, publisher: user.info.name, upload_date})
    if(!data.success) return dispatch(Error(data.msg)) 

    dispatch(Success(data.msg)) 
    router.push('/course/all')
  }

  return (
    <div>
      <title> Create Course </title>
      {
        user && user.info && user.info.admin
        && <Course course={course} handleSubmit={handleSubmit} handleChangeInput={handleChangeInput}/>
      }
    </div>
  )
}

export default Create