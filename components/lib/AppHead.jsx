import Head from 'next/head'
import React from 'react'



export const AppHead = ({title='Bomach'}) => {

  return (
    <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content='true' />
        <meta name="author" content='true' />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />

        <title>
            {title}
        </title>
      </Head>
  )
}
