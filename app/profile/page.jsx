'use client'

import {useState, useEffect, Suspense } from "react"
import Message from '../../components/message'
import { updateUser, getUserProfile } from "../../services/userDetailsService"
import { useRouter } from 'next/navigation'

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

const Profile = () => {

    const [auth, isAuth] = useState(false)
    const [authToken, setAuthToken] = useState('')

    const [user, setUser] = useState(initialState)
    const router = useRouter();

    const {name, email, password, confirm_password, city, dob, phone, gender, err, success} = user

    const handleChangeInput = (props) => {
        const {name, value} = props.target
        setUser({...user, [name]:value, err: '', success: ''})
    }

    useEffect(() => {
  
        const token = localStorage.getItem('token')

        if(token) {
            isAuth(true) 
            setAuthToken(token)
        }
    
        const fetchData = async (token) => {
          const res = await getUserProfile(token)
    
          if(!res.success) return router.push('/login');
    
          setUser({...user, name: res.user.name, email: res.user.email, city: res.user.city, dob: res.user.dob, phone: res.user.phone, gender: res.user.gender, err: '', success: ''})
        }
    
        fetchData(token)
  
    }, [])

    const handleSubmit = async (props) => {
        props.preventDefault()

        if(password !== confirm_password) return setUser({...user, err: 'Password do not match!', success: ''})

        if(!email || !password || !city || !dob || !phone || gender === "select") return setUser({...user, err: 'Please fill all the fields!', success: ''})

        const data = await updateUser(authToken, {name, email, password, city, dob, phone, gender})

        if(!data.success) return setUser({...user, err: data.msg, success: ''})

        setUser({...user, err: '', success: data.msg})

        return router.push('/profile')
    }

    if(!auth && !user) return <></>
      
    return (
        <Suspense fallback={<div> Loading... </div>}>
        <title> Profile </title>
        <Message err={err} success={success}/>

        {
            auth && user ?
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
            : <></>
        }
        </Suspense>
    )
}

export default Profile