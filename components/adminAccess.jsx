import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookMedical, faUsers } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const adminAccess = () => {

    const state = useSelector(state => state);
    const token = localStorage.getItem("token")
    const { user } = state

    if(!token) return <></>

  return (
    <>
        { user.info.admin && (<>
          <div className="create-course">
              <Link href='/course/create' legacyBehavior><a style={{borderWidth: '2px', padding: '10px', paddingTop: '20px', borderColor: 'green', borderRadius: '10px'}}><FontAwesomeIcon icon={faBookMedical} size='2x' color='green'/></a></Link>
          </div>

          <div className="users">
              <Link href='/users' legacyBehavior><a style={{borderWidth: '2px', padding: '12px', borderColor: 'red', borderRadius: '10px'}}><FontAwesomeIcon icon={faUsers} size='lg' color='red'/></a></Link>
          </div>
        </>)}
    </>
  )
}

export default adminAccess