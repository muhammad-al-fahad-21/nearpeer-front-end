import Link from 'next/link'
import { useEffect } from 'react'
import { Delete, Success, Error } from '../store/model'
import { useDispatch, useSelector } from 'react-redux'
import courseService from '../services/courseService'
import Swal from 'sweetalert2'

const getAllCourses = ({ courses }) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const { user, model } = state

    useEffect(() => {
        if(model.delete.length !== 0) {
            Swal.fire({
                title: 'Delete',
                text: `You want to delete ${model.delete.title} ?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33', 
                confirmButtonText: 'Yes'
            }).then((result) => {
                if(result.isConfirmed) {
                    courseService.deleteCourse(user.token, model.delete.id).then(res => {
                        if(!res.success) return dispatch(Error(res.msg))
                        dispatch(Success(res.msg))
                    })
                }
                dispatch(Delete([]))
            })
        }
    }, [model.delete])

  return (
    <>
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
                    <th> Action </th>
                </tr>
            </thead>

            <tbody>
                    {
                        courses && courses.map((course) => (
                            <tr key = {course.id}>
                                <td>{course.id}</td>
                                <td>{course.user_id}</td>
                                <td>{course.title && (course.title).substring(0, 20)}</td>
                                <td title={course.description.length > 20 && course.description}>{course.description && (course.description).substring(0, 20) + (course.description.length > 20 ? '...' : '')}</td>
                                <td>{course.rating}</td>
                                <td>{course.publisher}</td>
                                <td>{new Date(course.last_update).toDateString()}</td>
                                <td>{new Date(course.upload_date).toDateString()}</td>
                                <td style={{display: 'flex', alignItems: 'center'}}>
                                    <Link href={`/course/${course.id}`}><button style={{color: 'green', fontSize: '16px', borderWidth: '2px', padding: '10px', borderRadius: '15px', borderColor: 'darkgreen'}}> Update  </button></Link>
                                    <Link href='/course/all'><button style={{color: 'red', fontSize: '16px', marginLeft: '20px', borderWidth: '2px', padding: '10px', borderRadius: '15px', borderColor: 'darkred'}} onClick={() => dispatch(Delete(course))} > Delete </button></Link>
                                </td>
                            </tr>
                        ))
                    }
            </tbody>
        </table>
    </>

  )
}

export default getAllCourses