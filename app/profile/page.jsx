'use client'

import {useState, useEffect, Suspense } from "react"
import { updateUser } from "../../services/userDetailsService"
import { Auth } from "../../store/user"
import { useDispatch, useSelector } from 'react-redux'
import { Success, Error } from '../../store/model'
import { useRouter } from 'next/navigation'

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

const Profile = () => {

    const [user1, setUser] = useState(initialState)
    const dispatch = useDispatch()
    const router = useRouter()
    const token = localStorage.getItem("token")
    const state = useSelector(state => state);
    const { user } = state

    const {name, email, password, confirm_password, city, dob, phone, gender } = user1

    const handleChangeInput = (props) => {
        const {name, value} = props.target
        setUser({...user1, [name]:value })
    }

    useEffect(() => {
        if(token) dispatch(Auth(token))
    }, [token])

    useEffect(() => {
        if(user.token && user.info) setUser({
            ...user1, 
            name: user.info.name,
            email: user.info.email,
            city: user.info.city,
            dob: user.info.dob,
            phone: user.info.phone,
            gender: user.info.gender
        })

    }, [user])

    const handleSubmit = async (props) => {
        props.preventDefault()

        if(password !== confirm_password) return dispatch(Error('Password do not match!'))

        if(!email || !password || !city || !dob || !phone || gender === "select") return dispatch(Error('Please fill all the fields!'))

        const data = await updateUser(user.token, {name, email, password, city, dob, phone, gender})

        if(!data.success) return dispatch(Error(data.msg))

        dispatch(Success(data.msg))
    }

    if(!token && !user.token) return router.push('/login')
      
    return (
        <>
        <title> Profile </title>

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
                    value={email} name="email" disabled/>
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
                    <button type="submit"> Update </button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Profile