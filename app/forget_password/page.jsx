'use client'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Error, Success } from '../../store/model'
import { forgetPassword } from '../../services/forgetPasswordService'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const initialState = {
    email: '',
    password: '',
    confirm_password: ''
}

function ForgetPassword() {
    const [user, setUser] = useState(initialState)
    const { password, confirm_password, email } = user
    const dispatch = useDispatch()
    const router = useRouter()

    const handleChangeInput = (props) => {
        const {name, value} = props.target
        setUser({...user, [name]:value })
    }

    const handleSubmit = async (props) => {
        props.preventDefault()

        if(password !== confirm_password) return dispatch(Error('Password does not match!'))

        const data = await forgetPassword({email, password})

        if(!data.success) return dispatch(Error(data.msg))
        dispatch(Success(data.msg))

        return router.push('/login')
    }

  return (
    <div className='login_page'>
        <title> Forget Password </title>
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

            <div>
                <label htmlFor="confirm_password">Confirm Password</label>
                <input type="password" placeholder="Confirm password" id="confirm_password"
                value={confirm_password} name="confirm_password" onChange={handleChangeInput} />
            </div>

            <div className="row" style={{marginTop: '10px'}}>
                <button type="submit"> Confirm </button>
            </div>

            <p className='signup'>Do you have account? <Link href="/login" color="red"> Login </Link></p>
        </form>
    </div>
  )
}

export default ForgetPassword