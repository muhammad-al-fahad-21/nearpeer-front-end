'use client'

import { useState, Suspense, useEffect } from "react"
import { login } from '../../services/loginService'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Auth } from '../../store/user'
import { useDispatch, useSelector } from 'react-redux'
import { Error, Success } from '../../store/model'

const initialState = {
  email: '',
  password: ''
}

const Login = () => {

  const [user1, setUser] = useState(initialState)
  const dispatch = useDispatch()
  const token = localStorage.getItem("token");
  const state = useSelector(state => state)
  const { user } = state;

  const router = useRouter();
  const {email, password } = user1

  const handleChangeInput = (props) => {
    const {name, value} = props.target
    setUser({ ...user1, [name]:value })
  }

  const handleSubmit = async (props) => {
    props.preventDefault()

    const data = await login({ email, password })
    if(!data.success) return dispatch(Error(data.msg))

    dispatch(Auth(data.refresh_token))
    dispatch(Success(data.msg))
    localStorage.setItem("token", data.refresh_token);
    router.push('/')
  }

  if(token && user.token) return router.push('/')

  return (
    <>
      <title> Login </title>
        <div className="login_page">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="text" placeholder="Enter email address" id="email"
                    value={email} name="email" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter password" id="password"
                    value={password} name="password" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <button type="submit" >Login</button>
                </div>

                <p>Create New Account? <Link href="/signup" color="red"> Register Now </Link></p>
            </form>
        </div>
    </>
  )
}

export default Login