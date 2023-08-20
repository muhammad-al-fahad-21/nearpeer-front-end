'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { User } from '../../../store/course'
import { useRouter } from 'next/navigation'

const Courses = () => {

  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const router = useRouter();
  const { course, user } = state

  useEffect(() => {
    if(user.token) dispatch(User(user.token))
    else return router.push('/login')
  }, [user.token])
  
  return (
    <div>
        <title> Course List</title>
        <div class="outer-wrapper">
            <div class="inner-wrapper">
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
                                        <td>{new Date(courses.last_update).toDateString()}</td>
                                        <td>{new Date(courses.upload_date).toDateString()}</td>
                                    </tr>
                                ))
                            }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Courses