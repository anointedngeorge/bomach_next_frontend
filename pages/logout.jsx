import { SessionNotification } from 'components/layout/Sessionnotification'
import { AppHead } from 'components/lib/AppHead'
import React from 'react'
var Cookies = require('cookies')

export default function logout() {
  
  return (
    <>
      <AppHead title='Logout Page' />
      <SessionNotification />
    </>
  )
}

export const getServerSideProps = async ({ params, query, req, res }) => {
    const cookies = new Cookies(req, res);
    cookies.set('user_token', '')
    cookies.set('user_status', false)
    return {
        props: {}
    }
 }
