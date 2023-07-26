'use client'

import {useEffect, Suspense} from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { Auth } from '../../../store/user'
import { Courses } from '../../../store/course'
import Course from '../../../components/getAllCourses'

const AllCourses = () => {
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const router = useRouter();
  const token = localStorage.getItem("token")
  const { course, user } = state

  useEffect(() => {
    if(token) dispatch(Auth(token))
  }, [token])

  useEffect(() => {
    if(token) dispatch(Courses(token))
  }, [token, course.courses])

  if(!token && !user.token) return router.push('/login')
  
  return (
    <>
        <title> All Courses </title>

        {
          user && user.info && user.info.admin && <Course courses={course.courses}/>
        }
    </>
  )
}

export default AllCourses