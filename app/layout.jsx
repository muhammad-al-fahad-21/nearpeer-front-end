'use client'

import '../styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Suspense } from 'react';
import { Provider } from 'react-redux'
import { store } from '../store/storeConfigure';
import Notify from '../components/notify';
import Navbar from '../components/navbar';
import AdminAccess from '../components/adminAccess';

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/>
        <link className="icon" rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"/>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
      </head>
      <body>
      <Provider store={store}>
        <Notify/>
        <Navbar/>
        <AdminAccess/>
        {children}
      </Provider>
      </body>
    </html>
  )
}

export default RootLayout
