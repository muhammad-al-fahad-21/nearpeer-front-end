import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

const Navbar = ({token, admin}) => {

    const router = useRouter()
    const navRef = useRef();

    const logout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        await fetch(`${process.env.NEXT_PUBLIC_MAIN_BACKEND}/logout`, {
            method: 'POST',
            headers: {
                'Authorization': token
            }
        }).then(res => {
            const data = res.json();

            if(data.msg === 'Logout Successfully') return router.push('/login')
        }).catch(err => console.error(err.message))
    }

    if(!token) return <></>

  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
            <div className="container-fluid" >
            <div className='d-flex'>
            <div style={{marginTop: "5px"}}>
                <Link href='/' legacyBehavior>
                    <a className="navbar-brand mx-2 text-light"> Dashboard </a>
                </Link>
            </div>
                <nav ref={navRef} className='d-flex my-2 navbar-link'>
                    <Link href='/course/user' legacyBehavior><a className='mx-4'style={{textDecoration: 'none', color: 'white'}}> Course </a></Link>
                    {admin && <Link href='/course/all' legacyBehavior><a className='mx-4' style={{textDecoration: 'none', color: 'white'}}> Courses </a></Link>}
                    <Link href='/profile' legacyBehavior><a className='mx-4' style={{textDecoration: 'none', color: 'white'}}> Profile </a></Link>
                </nav>
            </div>
            <div className="justify-content-end" style={{marginRight: 50}}>
                <ul className="navbar-nav p-1">
                <li className="nav-item">
                    {
                        !token ? 
                            <Link href='/login' legacyBehavior>
                                <a className="text-light nav-link"><i className='fas fa-user text-light' aria-hidden="true"></i> Login </a>
                            </Link>
                        :   <Link href='/login' legacyBehavior>
                                <a className="text-light nav-link" onClick={logout}><i className='fas fa-user text-light' aria-hidden="true"></i> Logout </a>
                            </Link>
                    } 
                </li>
                </ul>
            </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar