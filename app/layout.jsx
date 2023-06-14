'use client'

import '../styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Navbar from '../components/navbar'
import { faBookMedical, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link'
import { useEffect, useState, Suspense } from 'react';
import { getUserProfile } from '../services/userDetailsService'

const RootLayout = ({ children }) => {

  const [auth, setAuth] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [authToken, setAuthToken] = useState('')
  const [counter, setCounter] = useState(0);

  useEffect(() => {

    const token = localStorage.getItem('token')

    if(!token){
      setAuthToken('')
      setAuth(false)
      setAdmin(false)
    }

    setAuthToken(token)
    setAuth(true)

      const fetchData = async (token) => {
        const res = await getUserProfile(token)

        if(!res.success) return;

        setAdmin(res.user.admin)
      }

      fetchData(token)
  }, [counter])

    useEffect(() => {
      const timer = setTimeout(() => {
        if(window.location.origin === 'http://localhost:3000' || window.location.href === 'http://localhost:3000/login') setCounter(counter + 1);
      }, 1000);

      return () => clearTimeout(timer);
    }, [counter]);

  return (
    <html lang='en'>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/>
        <link className="icon" rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
      </head>
      <body>
      <div>
        {auth && <Navbar token={authToken} admin={admin}/>}
        {
          auth && admin && (
            <div>
              <div class="fixed-button-1">
                  <Link href='/course/create' legacyBehavior><a style={{borderWidth: '2px', padding: '10px', paddingTop: '20px', borderColor: 'green', borderRadius: '10px'}}><FontAwesomeIcon icon={faBookMedical} size='2x' color='green'/></a></Link>
              </div>

              <div class="fixed-button">
                  <Link href='/users' legacyBehavior><a style={{borderWidth: '2px', padding: '12px', borderColor: 'red', borderRadius: '10px'}}><FontAwesomeIcon icon={faUsers} size='lg' color='red'/></a></Link>
              </div>
            </div>
          )
        }
      </div>
      <Suspense fallback={<div> Loading... </div>}>{children}</Suspense>
      </body>
    </html>
  )
}

export default RootLayout
