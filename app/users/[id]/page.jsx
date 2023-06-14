'use client'

import { useState, useEffect, Suspense} from "react"
import {isAdmin, getUserInformation, getUserProfile} from '../../../services/userDetailsService'
import Message from "../../../components/message"
import Access_denied from "../../../components/access_denied"
import { useRouter } from 'next/navigation'

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

const updateRole = ({params: {id}}) => {

  const [auth, setAuth] = useState(false)
  const [authToken, setAuthToken] = useState('')
  const [authUser, setAuthUser] = useState([])
  
  const [user, setUser] = useState(initialState)
  const router = useRouter();

  const { admin, email, err, success } = user

  useEffect(() => {

    const token = localStorage.getItem('token')

    if(token) {
        setAuth(true) 
        setAuthToken(token)
    }

    const fetchData = async (token) => {
      const res = await getUserProfile(token)

      if(!res.success) return router.push('/login');

      setAuthUser(res.user)
    }

    fetchData(token)

  }, [])

  useEffect(() => {

    const fetchProfile = async (token, id) => {
        const data = await getUserInformation(token, id)

        if(data && !data.success) return setUser({...user, err: data.msg, success: ''})

        setUser({...user, admin: data.user.admin, email: data.user.email, err: '', success: ''})
    }

    authToken && fetchProfile(authToken, id)

  }, [authToken])

  const handleSubmit = async (props) => {
    props.preventDefault()

    const data = await isAdmin(authToken, id, {admin})

    if(!data.success) return setUser({...user, err: data.msg, success: ''})

    setUser({...user, err: '', success: data.msg})
    router.push('/users')
  }

  if(!auth && !authUser) return <></>

  return (
    <Suspense fallback={<div> Loading... </div>}>
        <title> Role </title>
        <Message err={err} success={success}/>

        {
          
          auth ? 
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
          </>
          : <Access_denied/>
        }
    </Suspense>
  )
}

export default updateRole