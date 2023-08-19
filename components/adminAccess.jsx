import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookMedical, faUsers } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

const adminAccess = () => {

    const state = useSelector(state => state);
    const [show, setShow] = useState(false)
    const { user } = state

    useEffect(() => {
      const token = localStorage.getItem("token")
      if(token) setShow(true)
  }, [user.token])

  return (
    <div>
        { show && user.info.admin && (
            <div>
              <div className="create-course">
                  <Link href='/course/create' legacyBehavior><a style={{borderWidth: '2px', padding: '10px', paddingTop: '20px', borderColor: 'green', borderRadius: '10px'}}><FontAwesomeIcon icon={faBookMedical} size='2x' color='green'/></a></Link>
              </div>

              <div className="users">
                  <Link href='/users' legacyBehavior><a style={{borderWidth: '2px', padding: '12px', borderColor: 'red', borderRadius: '10px'}}><FontAwesomeIcon icon={faUsers} size='lg' color='red'/></a></Link>
              </div>
          </div>
        )}
    </div>
  )
}

export default adminAccess