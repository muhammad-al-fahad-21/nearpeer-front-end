'use client'

import { useEffect, Suspense } from 'react'
import User from '../../components/getAllUsers'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { Auth, Users } from '../../store/user'

const allUser = () => {

  const router = useRouter();
  const dispatch = useDispatch()
  const token = localStorage.getItem("token");
  const state = useSelector(state => state)
  const { user } = state

  useEffect(() => {
    if(token) {
      dispatch(Auth(token))
      dispatch(Users(token))
    }
  }, [token, user.users])

  if(!token) return router.push('/login')
  
  return (
    <>
        <title> All Users </title>

        {
          user && user.info && user.info.admin && <User users={user.users} info={user.info}/>
        }
    </>
  )
}

export default allUser