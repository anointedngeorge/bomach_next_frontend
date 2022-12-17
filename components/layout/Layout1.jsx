import Script from 'next/script'
import React, { Children } from 'react'
import { Footer } from './Footer'
import { Sidebar } from './Sidebar'
import { Topnav } from './Topnav'



export  function Layout1({children}){
  return (
   <>
      <Topnav />
      <div id="layoutSidenav">
        <Sidebar />
        <div id="layoutSidenav_content">
        {children} 
        <Footer />
        </div>
      </div>
      
  </>

  )
}
