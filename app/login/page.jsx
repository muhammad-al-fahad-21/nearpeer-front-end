'use client'

import { useEffect, useState } from "react"
import { login } from '../../services/loginService'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Auth } from '../../store/user'
import { useDispatch, useSelector } from 'react-redux'
import { Error, Success } from '../../store/model'

const Login = () => {
  const initialState = {
    email: '',
    password: ''
  }

  const [user1, setUser] = useState(initialState)
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const { user } = state;

  const router = useRouter();
  const {email, password } = user1

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token) return router.push('/')
  }, [])

  const handleChangeInput = (props) => {
    const {name, value} = props.target
    setUser({ ...user1, [name]:value })
  }

  const handleSubmit = async (props) => {
    props.preventDefault()

    const data = await login({ email, password })
    if(!data.success) return dispatch(Error(data.msg))
    localStorage.setItem("token", data.refresh_token)
    dispatch(Auth(data.refresh_token))
    dispatch(Success(data.msg))
    return router.push('/')
  }

  return (
    <div>
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

                <div className="link">
                  <p>Create New Account? <Link href="/signup" color="red"> Register Now </Link></p>
                  <p>Do you forget password? <Link href="/forget_password" color="red"> Forget </Link></p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login