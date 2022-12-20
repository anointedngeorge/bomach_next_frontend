import Link from 'next/link'
import React from 'react'

export function SessionNotification(props) {
  
    return (
        <div className='container mt-4'>

        <div className="jumbotron">
            <h1 className="display-4">Welcome to bomachgroup</h1>
            <p className="lead">This session has expired. You can click on the login button to sign in again, or 
            <Link href='/'> Visit </Link> Homepage
            </p>
            <hr className="my-4" />
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <p className="lead">
                <Link className="btn btn-dark btn-lg" href="/">Click To Login Again</Link>
            </p>
        </div>

        </div>

    )
  
  }
