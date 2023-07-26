import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { Delete, Success, Error } from '../store/model'
import Swal from 'sweetalert2'
import userDetailsService from '../services/userDetailsService'
import { useEffect } from 'react'

const getAllUsers = ({ users, info }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const { user, model } = state

    useEffect(() => {
        if(model.delete.length !== 0) {
            Swal.fire({
                title: 'Delete',
                text: `You want to delete ${model.delete.name} ?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33', 
                confirmButtonText: 'Yes'
            }).then((result) => {
                if(result.isConfirmed) {
                    userDetailsService.deleteUser(user.token, model.delete.id).then(res => {
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
                        users && users.map((user) => (
                            <tr key = {user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.city && (user.city).substring(0, 21) + '...'}</td>
                                <td>{user.dob}</td>
                                <td>{user.phone}</td>
                                <td>{user.gender}</td>
                                <td>{user.admin ? <i class="far fa-check-circle fa-lg" style={{color: 'green'}}></i> : <i class="far fa-times-circle fa-lg" style={{color: 'red'}}></i>}</td>
                                { 
                                    info.id !== user.id && <td style={{display: 'flex', alignItems: 'center'}}>
                                        <Link href={`/users/${user.id}`}><button style={{color: 'green', fontSize: '16px', borderWidth: '2px', padding: '10px', borderRadius: '15px', borderColor: 'darkgreen'}}> Update  </button></Link>
                                        <Link href='/users'>
                                            <button style={{color: 'red', fontSize: '16px', marginLeft: '20px', borderWidth: '2px', padding: '10px', borderRadius: '15px', borderColor: 'darkred'}} 
                                            onClick={() => dispatch(Delete(user))}> Delete </button>
                                        </Link>
                                    </td>
                                }
                            </tr>
                        ))
                    }
            </tbody>
        </table>
    </>

  )
}

export default getAllUsers
