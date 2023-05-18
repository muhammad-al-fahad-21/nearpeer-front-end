'use client'

import React, { useState, useEffect } from "react"
import Message from '../../components/message'
import loginService from '../../services/loginService'
import Navbar from '../../components/navbar'

const initialState = {
  email: '',
  password: '',
  err: '',
  success: ''
}

const Login = () => {

  const [user, setUser] = useState(initialState)
  const [isAuth, setIsAuth] = useState(false)

  const {email, password, err, success} = user

  const handleChangeInput = (props) => {
    const {name, value} = props.target
    setUser({...user, [name]:value, err: '', success: ''})
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    token && setIsAuth(true)
  }, [])

  const handleSubmit = async (props) => {
    props.preventDefault()

    const data = await loginService.login({email, password})

    if(!data.success) return setUser({...user, err: data.msg, success: ''})

    setUser({...user, err: '', success: data.msg})

    localStorage.setItem('token', data.refresh_token)
 
    window.location.href = '/';
  }

  return (
    <>
      <title> Login </title>
      
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} type="login"/>
      <Message err={err} success={success}/>
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
            </form>
        </div>
    </>
  )
}

export default Login