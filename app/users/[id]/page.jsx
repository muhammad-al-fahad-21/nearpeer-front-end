'use client'

import { useState, useEffect } from "react"
import { isAdmin } from '../../../services/userDetailsService'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { Success, Error } from '../../../store/model'
import { Auth, Role } from "../../../store/user"

const updateRole = ({params: {id}}) => {
  const [admin, setAdmin] = useState(false)
  const router = useRouter();

  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const token = localStorage.getItem("token")
  const { user } = state

  useEffect(() => {
    if(token) dispatch(Auth(token))
  }, [token])

  useEffect(() => {
    dispatch(Role(token, id))
  }, [user.token])

  useEffect(() => {
    setAdmin(user.role.admin);
  }, [user])

  const handleSubmit = async (props) => {
    props.preventDefault()

    const data = await isAdmin(user.token, id, {admin})

    if(!data.success) return dispatch(Error(data.msg))
    dispatch(Success(data.msg))
    router.push('/users')
  }

  if(!user.token) return (
    <div></div>
  )

  return (
    <div>
        <title> Role </title>

        {
          
          user && user.info && user.info.admin &&
          <div>
            <div className="login_page">
              <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email"> Email </label>
                    <input type="text" placeholder="Enter user email" id="email"
                    value={user.role.email} name="email" disabled/>
                </div>

                <div className="d-flex my-2">
                    <label className="my-2" htmlFor="admin"> Admin </label>
                    <input className="mx-3 my-2" type="checkbox" id="admin" style={{width: '25px', height: '25px'}}
                    value={admin} name="admin" checked={admin} onChange={(e) => setAdmin(e.target.checked)}/>
                </div>

                <div className="row" style={{marginTop: '10px'}}>
                  <button type="submit"> Update </button>
                </div>
              </form>
            </div>
          </div>
        }
    </div>
  )
}

export default updateRole