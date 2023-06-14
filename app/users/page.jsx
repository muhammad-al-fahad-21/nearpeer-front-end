'use client'

import { useEffect, useState, Suspense } from 'react'
import User from '../../components/getAllUsers'
import Access_denied from '../../components/access_denied'
import { getAllUsers, getUserProfile } from '../../services/userDetailsService'
import Message from '../../components/message'
import { useRouter } from 'next/navigation'

const Users = () => {

  const [auth, setAuth] = useState(false)
  const [sUser, setSUser] = useState([])
  const [authToken, setAuthToken] = useState('')

  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')
  const [user, setUser] = useState([])
  const router = useRouter();

  useEffect(() => {

    const fetchUsers = async (token) => {
        const data = await getAllUsers(token)

        if(data && !data.success) return setErr(data.msg)
    
        setUser(data.user)
    }
      
    authToken && fetchUsers(authToken)

  }, [authToken])

  useEffect(() => {

    const token = localStorage.getItem('token')

    if(token) {
        setAuth(true) 
        setAuthToken(token)
    }

    const fetchData = async (token) => {
      const res = await getUserProfile(token)

      if(!res.success) return router.push('/login');

      setSUser(res.user)
    }

    fetchData(token)

  }, [])

  if(!auth && !sUser) return <></>
  
  return (
    <Suspense fallback={<div> Loading... </div>}>
        <title> All Users </title>
        <Message err={err} success={success}/>

        {
          sUser && sUser.admin
          ? <User allUser={user} token={authToken} setErr={setErr} setSuccess={setSuccess}/>
          : auth && <Access_denied/>
        }
    </Suspense>
  )
}

export default Users