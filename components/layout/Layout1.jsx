
import { Navbar } from 'components/lib/Navbar'
import { redirect } from 'next/dist/server/api-utils'
import Script from 'next/script'
import Login from 'pages/login'
import React, { useEffect, useState, useReducer, useRef} from 'react'
import { Footer } from './Footer'
import { SessionNotification } from './Sessionnotification'
import { Sidebar } from './Sidebar'
import { Topnav } from './Topnav'





export function Layout1({children, content=[], user=[], user_status=false}){
  // const [redirectUrl, setRedirectUrl] = useState(redirect(<Login />))


  return user_status ? (
   <>
      <Topnav />
      <div id="layoutSidenav">
        <Sidebar user={user} />
        <div id="layoutSidenav_content">
        {/* <Navbar /> */}
        {children} 
        <Footer />
        </div>
      </div>
  </>

  ) : (<SessionNotification />)
}
