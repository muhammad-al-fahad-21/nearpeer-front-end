'use client'

import {useEffect, useState } from 'react'
import { updateCourse } from '../../../services/courseService'
import CourseId from '../../../components/course'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { Success, Error } from '../../../store/model'
import { Auth } from '../../../store/user'
import { Course } from '../../../store/course'

const initialState = {
  user_id: 0,
  title: '',
  description: '',
  rating: 0,
  publisher: '',
  last_update: '',
  upload_date: ''
}

const Update = ({ params: {id} }) => {

  const [userCourse, setUserCourse] = useState(initialState)
  const router = useRouter();
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  const {user_id, title, description, rating, publisher, last_update, upload_date} = userCourse
  const { user, course } = state

  useEffect(() => {
    if(token) {
      dispatch(Auth(token))
      dispatch(Course(token, id))
    }
  }, [token])

  const handleChangeInput = (props) => {
    const {name, value} = props.target
    setUserCourse({...userCourse, [name]: value})
  }

  useEffect(() => {
    if(course && course.course) setUserCourse({
        ...userCourse, 
        user_id: course.course.user_id,
        title: course.course.title,
        description: course.course.description,
        rating: course.course.rating,
        publisher: course.course.publisher,
        last_update: course.course.last_update,
        upload_date: course.course.upload_date
    })

}, [course])

  const handleSubmit = async (props) => {
    props.preventDefault()

    if(rating < 1 || rating > 5) return dispatch(Error('Rating range is (1 - 5)'))

    const field = !title ? 'title' : !publisher ? 'publisher' : !last_update ? 'Latest Update' : !upload_date ? 'upload_date' : ''

    if(field !== '') return dispatch(Error(`Please fill the ${field} field!`))

    const data = await updateCourse(user.token, id, user_id, {title, description, rating, publisher, last_update, upload_date})

    if(!data.success) return dispatch(Error(data.msg)) 

    dispatch(Success(data.msg))
    router.push('/course/all')
  }

  if(!token && !user.token) return router.push('/login')

  return (
    <>
    <title> Update Course </title>
  
    {
      user && user.info && user.info.admin
      && <CourseId course={userCourse} handleSubmit={handleSubmit} handleChangeInput={handleChangeInput} id={id}/>
    }
    </>
  )
}

export default Update