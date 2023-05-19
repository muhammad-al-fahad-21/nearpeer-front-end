import Link from 'next/link'

const Navbar = ({isAuth, setIsAuth, err, type, admin}) => {

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuth(false)
        window.location.href = '/login'
    }

  return (
    <>
        <nav className="navbar" style={{backgroundColor: "#e3f2fd"}}>
            <div className="container-fluid">
                <Link className="navbar-brand" href='/'>Dashboard</Link>

                <div className="d-flex" style={{marginRight: '500px', marginTop: '20px'}}>
                    <ul className="d-flex">
                        <li className="mx-2 nav-item">
                            <Link className="nav-link" href="/course/user"> Course </Link>
                        </li>
                        <li className="mx-2 nav-item">
                            <Link className="nav-link" href="/profile"> Profile </Link>
                        </li>
                        {  admin &&
                            <li className="mx-2 nav-item">
                                <Link className="nav-link" href="/course/all"> Courses </Link>
                            </li>
                        }
                    </ul>
                </div>

                <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>

                <div className='mx-4'>
                    {
                        !isAuth && <Link href={type === "login" ? '/signup' : '/login'}><button className='gradient-border-button'> {type === "login" ? "Signup" : "Login"} </button></Link>
                    }
                    {
                        (isAuth || err === 'Invalid Authentication') && <Link href='/'><button className='gradient-button' onClick={logout}> Logout </button></Link>
                    }
                </div>
                </form>
            </div>
        </nav>
    </>
  )
}

export default Navbar