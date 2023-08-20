import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { logoutUser } from '../services/userDetailsService'
import { deleteData } from '../store/user'
import { Error, Success } from '../store/model'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from "next/navigation"
import Image from 'next/image'

const Navbar = () => {
    const navRef = useRef();
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()
    const state = useSelector(state => state)
    const { user } = state

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(token) setShow(true)
    }, [user.token])

    const logoutAuth = async (props) => {;
        const message = await logoutUser(props);
        if(!message.success) return dispatch(Error(message.msg))

        dispatch(deleteData())
        dispatch(Success(message.msg))
        setShow(false)
        localStorage.removeItem("token")
        return router.push('/login')
    }

  return (
    <div className='nav-css'>
        { show &&
            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                <div className="container-fluid" >
                <div className='d-flex'>
                <div style={{marginTop: "5px"}}>
                    <Link href='/' legacyBehavior>
                        <Image src='/nearpeer.png' alt='Nearpeer' width={50} height={50} style={{cursor: 'pointer'}}/>
                    </Link>
                </div>
                    <nav ref={navRef} className='d-flex my-2 navbar-link'>
                        <Link href='/course/user' legacyBehavior><a className='mx-4'style={{textDecoration: 'none', color: 'white'}}> User Courses </a></Link>
                        <Link href='/profile' legacyBehavior><a className='mx-4' style={{textDecoration: 'none', color: 'white'}}> Profile </a></Link>
                        { user.info && user.info.admin && 
                            <div>
                                <Link href='/course/all' legacyBehavior><a className='mx-4' style={{textDecoration: 'none', color: 'white'}}> All Courses </a></Link>
                                <Link href='/course/create' legacyBehavior><a className='mx-4' style={{textDecoration: 'none', color: 'white'}}> Add Course </a></Link>
                                <Link href='/users' legacyBehavior><a className='mx-4' style={{textDecoration: 'none', color: 'white'}}> All Users </a></Link>
                            </div>  
                        }
                    </nav>
                </div>
                <div className="justify-content-end" style={{marginRight: 50}}>
                    <ul className="navbar-nav p-1">
                    <li className="nav-item">
                    <Link href='/login' legacyBehavior>
                        <a className="text-light nav-link" onClick={() => logoutAuth(user.token)}><i className='fas fa-user text-light' aria-hidden="true"></i> Logout </a>
                    </Link>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
        }
    </div>
  )
}

export default Navbar