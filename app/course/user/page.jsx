'use client'

import { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Auth } from '../../../store/user'
import { User } from '../../../store/course'
import { useRouter } from 'next/navigation'

const Courses = () => {

  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const router = useRouter();
  const token = localStorage.getItem("token")
  const { course, user } = state

  useEffect(() => {
    if(token) dispatch(Auth(token))
  }, [token])

  useEffect(() => {
    if(user.token) dispatch(User(token))
  }, [user.token])

  if(!token && !user.token) return router.push('/login')
  
  return (
    <>
        <title> Course List</title>
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
                        course && course.user.map((courses) => (
                            <tr key = {courses.id}>
                                <td>{courses.id}</td>
                                <td>{courses.user_id}</td>
                                <td>{courses.title && (courses.title).substring(0, 20)}</td>
                                <td title={courses.description.length > 20 && courses.description}>{courses.description && (courses.description).substring(0, 20) + (courses.description.length > 20 ? '...' : '')}</td>
                                <td>{courses.rating}</td>
                                <td>{courses.publisher}</td>
                                <td>{courses.last_update}</td>
                                <td>{courses.upload_date}</td>
                            </tr>
                        ))
                    }
            </tbody>
        </table>
    </>
  )
}

export default Courses