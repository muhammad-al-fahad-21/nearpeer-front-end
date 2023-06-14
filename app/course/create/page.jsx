'use client'

import {useEffect, useState, Suspense } from 'react'
import AcessDenied from '../../../components/access_denied'
import { createUserCourses } from '../../../services/courseService'
import { getUserProfile } from '../../../services/userDetailsService'
import Message from '../../../components/message'
import Course from '../../../components/course'
import { useRouter } from 'next/navigation'

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
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState([])
  const [authToken, setAuthToken] = useState('')
  
  const router = useRouter();

  const {user_id, title, description, rating, publisher, upload_date, err, success} = course

  const handleChangeInput = (props) => {
    const {name, value} = props.target
    setCourse({...course, [name]: value, err: '', success: ''})
  }

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
      setCourse({...course, publisher: res.user.name, err: '', success: ''})
    }

    fetchData(token)

  }, [])

  const handleSubmit = async (props) => {
    props.preventDefault()

    if(rating < 0 || rating > 5) return setCourse({...course, err: 'Rating range is (0 - 5)', success: ''})

    const field = !title ? 'Title' : !publisher ? 'Publisher' : !upload_date ? 'Upload Date' : ''

    if(field !== '') return setCourse({...course, err: `Please fill the ${field} field!`, success: ''})

    const data = await createUserCourses(authToken, user_id, {title, description, rating, publisher, upload_date})

    if(!data.success) return setCourse({...course, err: data.msg, success: ''})

    setCourse({...course, err: '', success: data.msg})
    router.push('/course/all')
  }

  if(!auth && !user) return <></>

  return (
    <Suspense fallback={<div> Loading... </div>}>
      <title> Create Course </title>
      <Message err={err} success={success}/> 
      {
        user && user.admin
        ? <Course course={course} handleSubmit={handleSubmit} handleChangeInput={handleChangeInput}/>
        : auth && <AcessDenied/>
      }
    </Suspense>
  )
}

export default Create