import {useState} from 'react'
import Link from 'next/link'
import Model from './model'
import { faBookMedical, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const getAllCourses = ({course, token, setErr, setSuccess}) => {

    const [courseId, setCourseId] = useState(0)
    const [courseTitle, setCourseTitle] = useState('')

    const Delete = (id, title) => {
        setCourseId(id)
        setCourseTitle(title)
      }

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
                    <th> Lastest Update </th>
                    <th> Upload Date </th>
                    <th> Action </th>
                </tr>
            </thead>

            <tbody>
                    {
                        course && course.map((courses) => (
                            <tr key = {courses.id}>
                                <td>{courses.id}</td>
                                <td>{courses.user_id}</td>
                                <td>{courses.title && (courses.title).substring(0, 21)}</td>
                                <td>{courses.description && (courses.description).substring(0, 21) + '...'}</td>
                                <td>{courses.rating}</td>
                                <td>{courses.publisher}</td>
                                <td>{courses.lastest_update}</td>
                                <td>{courses.upload_date}</td>
                                <td style={{display: 'flex', alignItems: 'center'}}>
                                    <Link href={`/course/${courses.id}`}><button style={{color: 'green', fontSize: '16px', borderWidth: '2px', padding: '10px', borderRadius: '15px', borderColor: 'darkgreen'}}> Update  </button></Link>
                                    <Link href='/course/all'><button style={{color: 'red', fontSize: '16px', marginLeft: '20px', borderWidth: '2px', padding: '10px', borderRadius: '15px', borderColor: 'darkred'}} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => Delete(courses.id, courses.title)} > Delete </button></Link>
                                </td>
                            </tr>
                        ))
                    }
            </tbody>
        </table>

        <div class="fixed-button-1">
            <Link href='/course/create'><button><FontAwesomeIcon icon={faBookMedical} size='2x' color='green'/></button></Link>
        </div>

        <div class="fixed-button">
            <Link href='/users'><button><FontAwesomeIcon icon={faUsers} size='lg' color='red'/></button></Link>
        </div>

        <Model Id={courseId} name={courseTitle} token={token} setErr={setErr} setSuccess={setSuccess} type='Course'/>
    </>

  )
}

export default getAllCourses