import { useState } from 'react'
import Link from 'next/link'
import Model from './model'
import { faBookMedical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const getAllUsers = ({allUser, token, setErr, setSuccess}) => {

    const [userId, setUserId] = useState(0)
    const [userName, setUserName] = useState('')

    const Delete = (id, name) => {
        setUserId(id)
        setUserName(name)
      }

  return (
    <>
        <table className="table__body">
            <thead>
                <tr>
                    <th> Id </th>
                    <th> Name </th>
                    <th> Email </th>
                    <th> City </th>
                    <th> Date Of Birth </th>
                    <th> Phone </th>
                    <th> Gender </th>
                    <th> isAdmin </th>
                    <th> Action </th>
                </tr>
            </thead>

            <tbody>
                    {
                        allUser && allUser.map((user) => (
                            <tr key = {user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.city && (user.city).substring(0, 21) + '...'}</td>
                                <td>{user.dob}</td>
                                <td>{user.phone}</td>
                                <td>{user.gender}</td>
                                <td>{user.admin ? <i class="far fa-check-circle fa-lg" style={{color: 'green'}}></i> : <i class="far fa-times-circle fa-lg" style={{color: 'red'}}></i>}</td>
                                <td style={{display: 'flex', alignItems: 'center'}}>
                                    <Link href={`/users/${user.id}`}><button style={{color: 'green', fontSize: '16px', borderWidth: '2px', padding: '10px', borderRadius: '15px', borderColor: 'darkgreen'}}> Update  </button></Link>
                                    <Link href='/users'><button style={{color: 'red', fontSize: '16px', marginLeft: '20px', borderWidth: '2px', padding: '10px', borderRadius: '15px', borderColor: 'darkred'}} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => Delete(user.id, user.name)} > Delete </button></Link>
                                </td>
                            </tr>
                        ))
                    }
            </tbody>
        </table>

        <div class="fixed-button-1">
            <Link href='/course/create' legacyBehavior><a style={{borderWidth: '2px', padding: '10px', paddingTop: '20px', borderColor: 'green', borderRadius: '10px'}}><FontAwesomeIcon icon={faBookMedical} size='2x' color='green'/></a></Link>
        </div>

        <Model Id={userId} name={userName} token={token} setErr={setErr} setSuccess={setSuccess} type='User'/>
    </>

  )
}

export default getAllUsers