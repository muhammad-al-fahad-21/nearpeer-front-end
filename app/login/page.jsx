'use client'

import React, { useState } from "react"
import { showErrMsg, showSuccessMsg } from '../../components/notification'
import loginService from '../../services/loginService'
import Link from "next/link"

const initialState = {
  email: '',
  password: '',
  err: '',
  success: ''
}

const Login = () => {

  const [user, setUser] = useState(initialState)

  const {email, password, err, success} = user

  const handleChangeInput = (props) => {
    const {name, value} = props.target
    setUser({...user, [name]:value, err: '', success: ''})
  }

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
      
      <div style={{alignItems: 'center', width: '30%', margin: '10px', marginLeft: '35%'}}>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
      </div>
        <div className="login_page">
            <h2>Login</h2>

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

                <p>You don't have an account? <Link href="/signup" style={{color: 'red', marginTop: '10px'}}>Register Now</Link></p>
            </form>
        </div>
    </>
  )
}

export default Login