'use client'

import React, {useState } from "react"
import Link from 'next/link'
import { showErrMsg, showSuccessMsg } from '../../components/notification'
import signupService from '../../services/signupService'

const initialState = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    city: '',
    dob: '',
    phone: '',
    gender: '',
    err: '',
    success: ''
}

const Signup = () => {

    const [user, setUser] = useState(initialState)

    const {name, email, password, confirm_password, city, dob, phone, gender, err, success} = user

    const handleChangeInput = (props) => {
        const {name, value} = props.target
        setUser({...user, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async (props) => {
        props.preventDefault()

        if(password !== confirm_password) return setUser({...user, err: 'Password do not match!', success: ''})

        if(!email || !password || !city || !dob || !phone || gender == "select") return setUser({...user, err: 'Please fill all the fields!', success: ''})

        const data = await signupService.signup({name, email, password, city, dob, phone, gender})

        if(!data.success) return setUser({...user, err: data.msg, success: ''})

        setUser({...user, err: '', success: data.msg})
        window.location.href = '/login';
    }
      
    return (
        <>
        <title> Signup </title>
        <div style={{alignItems: 'center', width: '30%', margin: '10px', marginLeft: '35%'}}>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
        </div>
        <div className="login_page">
            <h2>Register</h2>

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

                <div>
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
            </form>

            <p>Already have an account? <Link href="/login" style={{color: 'red', marginTop: '10px'}}>Login Now</Link></p>
        </div>
        </>
    )
}

export default Signup