'use client'

import { useState, useEffect } from "react"
import userDetailsService from '../../../services/userDetailsService'
import Message from "../../../components/message"
import Navbar from '../../../components/navbar'
import Access_denied from "../../../components/access_denied"
import { faBookMedical, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from "next/link"

const initialState = {
  name: '',
  email: '',
  password: '',
  confirm_password: '',
  city: '',
  dob: '',
  phone: '',
  gender: '',
  admin: '',
  err: '',
  success: ''
}

const isAdmin = ({params: {id}}) => {

  const [isAuth, setIsAuth] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState(initialState)

  const { admin, email, err, success } = user

  useEffect(() => {

    const token = localStorage.getItem('token')

    const fetchProfile = async (token) => {
        const data = await userDetailsService.getUserProfile(token)

        if(data && !data.success) return setUser({...user, err: data.msg, success: ''})

        setUser({...user, err: data.msg, success: ''})
        setIsAdmin(data.user.admin)
    }

    if(!token) {

      return window.location.href = '/login'

    }else {

      setIsAuth(true)
      fetchProfile(token)

    }

  }, [])

  useEffect(() => {

    const token = localStorage.getItem('token')

    const fetchProfile = async (token, id) => {
        const data = await userDetailsService.getUserInformation(token, id)

        if(data && !data.success) return setUser({...user, err: data.msg, success: ''})

        setUser({...user, admin: data.user.admin, email: data.user.email, err: '', success: ''})
    }

    fetchProfile(token, id)

  }, [isAdmin])

  const handleSubmit = async (props) => {
    props.preventDefault()

    const token = localStorage.getItem('token')

    const data = await userDetailsService.isAdmin(token, id, {admin})

    if(!data.success) return setUser({...user, err: data.msg, success: ''})

    setUser({...user, err: '', success: data.msg})
    window.location.href = '/users';
  }

  if(isAuth === false) return <></>

  return (
    <>
        <title> Role </title>
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} admin={isAdmin}/>
        <Message err={err} success={success}/>

        {
          isAdmin
          ? 
          <>
            <div className="login_page">
              <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email"> Email </label>
                    <input type="text" placeholder="Enter user email" id="email"
                    value={email} name="email" disabled/>
                </div>

                <div className="d-flex my-2">
                    <label className="my-2" htmlFor="admin"> Admin </label>
                    <input className="mx-3 my-2" type="checkbox" id="admin" style={{width: '25px', height: '25px'}}
                    value={admin} name="admin" checked={admin} onChange={(e) => setUser({...user, admin: e.target.checked, err: '', success: ''})}/>
                </div>

                <div className="row" style={{marginTop: '10px'}}>
                  <button type="submit"> Update </button>
                </div>
              </form>
            </div>

            <div class="fixed-button-1">
            <Link href='/course/create'><button><FontAwesomeIcon icon={faBookMedical} size='2x' color='green'/></button></Link>
            </div>

            <div class="fixed-button">
            <Link href='/users'><button><FontAwesomeIcon icon={faUsers} size='lg' color='red'/></button></Link>
            </div>
          </>
          : isAuth && <Access_denied/>
        }
    </>
  )
}

export default isAdmin