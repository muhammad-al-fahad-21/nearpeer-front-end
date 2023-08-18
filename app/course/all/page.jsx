'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { Courses } from '../../../store/course'
import Course from '../../../components/getAllCourses'

const AllCourses = () => {
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const router = useRouter();
  const { course, user } = state

  useEffect(() => {
    if(user.token) dispatch(Courses(user.token))
    else return router.push('/login')
  }, [course.courses])
  
  return (
    <div>
        <title> All Courses </title>

        {
          user && user.info && user.info.admin && <Course courses={course.courses}/>
        }
    </div>
  )
}

export default AllCourses