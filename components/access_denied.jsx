import React from 'react'

const Access_denied = ({err}) => {
  return (
    <div className="container">
        <h1 style={{fontSize: '48px'}}>{err}</h1>
    </div>
  )
}

export default Access_denied