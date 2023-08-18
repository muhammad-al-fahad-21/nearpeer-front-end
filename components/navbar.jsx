import Link from 'next/link'
import { useRef } from 'react'
import { logoutUser } from '../services/userDetailsService'
import { Auth, deleteData } from '../store/user'
import { Error, Success } from '../store/model'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from "next/navigation"

const Navbar = () => {
    const navRef = useRef();
    const state = useSelector(state => state);
    const dispatch = useDispatch()
    const router = useRouter()
    const { user } = state

    const logoutAuth = async (props) => {;
        const message = await logoutUser(props);
        if(!message.success) return dispatch(Error(message.msg))

        dispatch(deleteData())
        dispatch(Success(message.msg))
        localStorage.removeItem("token")
        return router.push('/login')
    }

  if(!user.token) return (
    <div>
    </div>
  )

  return (
    <div style={{position: "sticky", width: "100%", top: 0}}>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary sticky">
            <div className="container-fluid" >
            <div className='d-flex'>
            <div style={{marginTop: "5px"}}>
                <Link href='/' legacyBehavior>
                    <a className="navbar-brand mx-2 text-light"> Dashboard </a>
                </Link>
            </div>
                <nav ref={navRef} className='d-flex my-2 navbar-link'>
                    <Link href='/course/user' legacyBehavior><a className='mx-4'style={{textDecoration: 'none', color: 'white'}}> Course </a></Link>
                    <Link href='/profile' legacyBehavior><a className='mx-4' style={{textDecoration: 'none', color: 'white'}}> Profile </a></Link>
                    { user.info && user.info.admin && <Link href='/course/all' legacyBehavior><a className='mx-4' style={{textDecoration: 'none', color: 'white'}}> Courses </a></Link> }
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
    </div>
  )
}

export default Navbar