'use client'

import { useEffect } from 'react'
import User from '../../components/getAllUsers'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { Users } from '../../store/user'

const allUser = () => {

  const router = useRouter();
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const { user } = state

  useEffect(() => {
    if(user.token) dispatch(Users(user.token))
  }, [user.token])

  if(!user.token) return router.push('/login')
  
  return (
    <div>
        <title> All Users </title>

        {
          user && user.info && user.info.admin && <User users={user.users} info={user.info}/>
        }
    </div>
  )
}

export default allUser