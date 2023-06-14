'use client'

import {useEffect, useState, Suspense } from 'react'
import AcessDenied from '../../../components/access_denied'
import { getCourse, updateCourse } from '../../../services/courseService'
import Message from '../../../components/message'
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
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState([])
  const [authToken, setAuthToken] = useState('')

  const [course, setCourse] = useState(initialState)
  const router = useRouter();

  const {user_id, title, description, rating, publisher, last_update, upload_date, err, success} = course

  const handleChangeInput = (props) => {
    const {name, value} = props.target
    setCourse({...course, [name]: value, err: '', success: ''})
  }

  useEffect(() => {
    const fetchProfile = async (token) => {
        const data = await getCourse(token, id)

        if(data && !data.success) return setCourse({...course, err: data.msg, success: ''})

        setCourse({...course, user_id: data.course.user_id, title: data.course.title, description: data.course.description, rating: data.course.rating, publisher: data.course.publisher, last_update: data.course.last_update, upload_date: data.course.upload_date, err: '', success: ''})
    }
      
    authToken && fetchProfile(authToken)

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

  const handleSubmit = async (props) => {
    props.preventDefault()

    if(rating < 0 || rating > 5) return setCourse({...course, err: 'Rating range is (0 - 5)', success: ''})

    const field = !title ? 'title' : !publisher ? 'publisher' : !last_update ? 'Latest Update' : !upload_date ? 'upload_date' : ''

    if(field !== '') return setCourse({...course, err: `Please fill the ${field} field!`, success: ''})

    const data = await updateCourse(authToken, id, user_id, {title, description, rating, publisher, last_update, upload_date})

    if(!data.success) return setCourse({...course, err: data.msg, success: ''})

    setCourse({...course, err: '', success: data.msg})
    router.push('/course/all')
  }

  if(!auth && !user) return <></>

  return (
    <Suspense fallback={<div> Loading... </div>}>
    <title> Update Course </title>
    <Message err={err} success={success}/> 
  
    {
      user && user.admin
      ? <Course course={course} handleSubmit={handleSubmit} handleChangeInput={handleChangeInput} id={id}/>
      : auth && <AcessDenied/>
    }
    </Suspense>
  )
}

export default Update