'use client'

import React, {useState, useEffect } from "react"
import Message from '../../components/message'
import Navbar from '../../components/navbar'
import userDetailsService from "../../services/userDetailsService"
import Access_denied from "../../components/access_denied"
import { faBookMedical, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from "next/link"

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

    const [user, setUser] = useState(initialState)
    const [isAuth, setIsAuth] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    const {name, email, password, confirm_password, city, dob, phone, gender, err, success} = user

    const handleChangeInput = (props) => {
        const {name, value} = props.target
        setUser({...user, [name]:value, err: '', success: ''})
    }

    useEffect(() => {

      const token = localStorage.getItem('token')
  
      const fetchProfile = async (token) => {
          const data = await userDetailsService.getUserProfile(token)
  
          if(data && !data.success) return setUser({...user, err: data.msg, success: ''})
  
          data && data.user && setUser({...user, name: data.user.name, email: data.user.email, city: data.user.city, dob: data.user.dob, phone: data.user.phone, gender: data.user.gender, err: '', success: ''})
          setIsAdmin(data.user.admin)
      }
          
      if(!token) {

        return window.location.href = '/login'
  
      }else {
  
        setIsAuth(true)
        fetchProfile(token)
  
      }
  
    }, [])

    const handleSubmit = async (props) => {
        props.preventDefault()

        const token = localStorage.getItem('token')

        if(password !== confirm_password) return setUser({...user, err: 'Password do not match!', success: ''})

        if(!email || !password || !city || !dob || !phone || gender === "select") return setUser({...user, err: 'Please fill all the fields!', success: ''})

        const data = await userDetailsService.updateUser(token, {name, email, password, city, dob, phone, gender})

        if(!data.success) return setUser({...user, err: data.msg, success: ''})

        setUser({...user, err: '', success: data.msg})
        window.location.href = '/profile';
    }

    if(isAuth === false) return <></>
      
    return (
        <>
        <title> Profile </title>
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} admin={isAdmin}/>
        <Message err={err} success={success}/>

        {
            isAuth ?
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
        {
            isAdmin && (
                <>
                    <div class="fixed-button-1">
                        <Link href='/course/create'><button><FontAwesomeIcon icon={faBookMedical} size='2x' color='green'/></button></Link>
                    </div>

                    <div class="fixed-button">
                        <Link href='/users'><button><FontAwesomeIcon icon={faUsers} size='lg' color='red'/></button></Link>
                    </div>
                </>
            )
        }
        </>
    )
}

export default Profile