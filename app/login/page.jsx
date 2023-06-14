'use client'

import { useState, useEffect, Suspense } from "react"
import { login } from '../../services/loginService'
import Message from '../../components/message'
import Link from "next/link"
import { useRouter } from 'next/navigation'


const initialState = {
  email: '',
  password: '',
  err: '',
  success: ''
}

const Login = () => {

  const [user, setUser] = useState(initialState)
  const router = useRouter();

  const {email, password, err, success} = user

  const handleChangeInput = (props) => {
    const {name, value} = props.target
    setUser({...user, [name]:value, err: '', success: ''})
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if(token) return router.push('/')
  }, [])

  const handleSubmit = async (props) => {
    props.preventDefault()

    const data = await login({email, password})

    if(!data.success) return setUser({...user, err: data.msg, success: ''})

    setUser({...user, err: '', success: data.msg})

    localStorage.setItem('token', data.refresh_token)

    router.push('/')
  }

  return (
    <Suspense fallback={<div> Loading... </div>}>
      <title> Login </title>
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

                <p>Create New Account? <Link href="/signup" color="red"> Register Now </Link></p>
            </form>
        </div>
    </Suspense>
  )
}

export default Login