'use client'

import { useState, useEffect } from "react"
import userDetailsService from '../../../services/userDetailsService'
import Message from "../../../components/message"
import Navbar from '../../../components/navbar'
import Access_denied from "../../../components/access_denied"
import { faBookMedical, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from "next/link"

const isAdmin = ({params: {id}}) => {

  const [isAuth, setIsAuth] = useState(false)
  const [isRoot, setIsRoot] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState([])
  const [err, setErr] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {

    const token = localStorage.getItem('token')
    token && setIsAuth(true)

    if(!token) return setErr('Please sign in to continue!')

    const fetchProfile = async (token) => {
        const data = await userDetailsService.getUserProfile(token)

        if(data && !data.success) return setErr(data.msg)

        setSuccess(data.msg)
        setIsRoot(data.user.root)
    }

    fetchProfile(token)

  }, [Date.now()])

  useEffect(() => {

    const token = localStorage.getItem('token')

    const fetchProfile = async (token, id) => {
        const data = await userDetailsService.getUserInformation(token, id)

        if(data && !data.success) return setErr(data.msg)

        setSuccess(data.msg)
        setUser(data.user)
        setIsAdmin(data.user.admin)
    }

    fetchProfile(token, id)

  }, [isRoot])

  const handleSubmit = async (props) => {
    props.preventDefault()

    const token = localStorage.getItem('token')

    const data = await userDetailsService.isAdmin(token, id, {admin})

    if(!data.success) return setErr(data.msg)

    setSuccess(data.msg)
    window.location.href = '/users';
  }

  return (
    <>
        <title> Role </title>
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} admin={isAdmin}/>
        <Message err={err} success={success}/>

        {
          isRoot
          ? 
          <div className="login_page">
            <form onSubmit={handleSubmit}>
              <div>
                  <label htmlFor="email"> Email </label>
                  <input type="text" placeholder="Enter user email" id="email"
                  value={user.email} name="email" disabled/>
              </div>

              <div className="d-flex my-2">
                  <label className="my-2" htmlFor="isAdmin"> Admin </label>
                  <input className="mx-3 my-2" type="checkbox" id="isAdmin" style={{width: '25px', height: '25px'}}
                  value={isAdmin} name="isAdmin" checked={isAdmin} onChange={(e) => setAdmin(e.target.checked)}/>
              </div>

              <div className="row" style={{marginTop: '10px'}}>
                <button type="submit"> Update </button>
              </div>
            </form>
          </div>
          : isAuth && <Access_denied/>
        }
        {
          isAdmin && (
              <>
                  <div class="fixed-button-1">
                      <Link href='/course/create'><button><FontAwesomeIcon icon={faBookMedical} size='2x' color='green'/></button></Link>
                  </div>

                  <div class="fixed-button">
                      <Link href='/users'><button><FontAwesomeIcon icon={faUsers} size='lg' color='red'/></button></Link>
                  </div>
              </>
          )
        }
    </>
  )
}

export default isAdmin