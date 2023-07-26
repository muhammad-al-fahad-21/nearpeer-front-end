'use client'

import {useState, Suspense } from "react"
import { signup } from '../../services/signupService'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Auth } from '../../store/user'
import { Success, Error } from '../../store/model'
import { useDispatch, useSelector } from 'react-redux'

const initialState = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    city: '',
    dob: '',
    phone: '',
    gender: ''
}

const Signup = () => {

    const [user1, setUser] = useState(initialState)
    const router = useRouter();
    const dispatch = useDispatch()
    const token = localStorage.getItem("token");
    const state = useSelector(state => state)
    const { user } = state;

    const {name, email, password, confirm_password, city, dob, phone, gender} = user1

    const handleChangeInput = (props) => {
        const {name, value} = props.target
        setUser({...user1, [name]:value })
    }

    const handleSubmit = async (props) => {
        props.preventDefault()

        if(password !== confirm_password) return dispatch(Error('Password do not match!'))

        if(!email || !password || !city || !dob || !phone || gender == "select") return dispatch(Error('Please fill all the fields!'))

        const data = await signup({name, email, password, city, dob, phone, gender})

        if(!data.success) return dispatch(Error(data.msg))
    
        dispatch(Auth(data.refresh_token))
        dispatch(Success(data.msg))
        localStorage.setItem("token", data.refresh_token);
        router.push('/')
    }

    if(token && user.token) return router.push('/')
      
    return (
        <Suspense fallback={<div> Loading... </div>}>
        <title> Signup </title>
        <div className="login_page">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Enter your name" id="name"
                    value={name} name="name" onChange={handleChangeInput} />
                </div>

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

                <div>
                    <label htmlFor="city">Location</label>
                    <input type="text" placeholder="Enter your location" id="city"
                    value={city} name="city" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="dob">Date Of Birth</label>
                    <input type="date" placeholder="Enter your date of birth" id="dob"
                    value={dob} name="dob" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="phone">Phone</label>
                    <input type="text" placeholder="Enter your phone number" id="phone"
                    value={phone} name="phone" onChange={handleChangeInput} />
                </div>

                <div className="custom-select">
                    <label htmlFor="gender"> Gender </label>
                    <select id="gender" value={gender} name="gender" onChange={handleChangeInput}>
                        <option value="select">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div className="row" style={{marginTop: '10px'}}>
                    <button type="submit">Register</button>
                </div>

                <p>Already an account? <Link href="/login"> Login Now </Link></p>
            </form>
        </div>
        </Suspense>
    )
}

export default Signup