import { Cards } from 'components/layout/dashboard/Cards'
import { DashboardCharts } from 'components/layout/dashboard/DashboardCharts'
import { DataTable } from 'components/layout/dashboard/DataTable'
import { Layout1 } from 'components/layout/Layout1'
import { AppHead } from 'components/lib/AppHead'
import { AppScript } from 'components/lib/AppScript'
import { authentication_token } from 'functions'
import Head from 'next/head'
import Script from 'next/script'
import React from 'react'



export default function Dashboard(props) {
  return (
    <Layout1 user={props.user} user_status={props.user_status} >
      <AppHead title={`Bomach Group | `} />
      <main>
      {/* {JSON.stringify(props)} */}
        <div className="container-fluid px-4">
          <h1 className="mt-4">Welcome {props.user.first_name}</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active">Dashboard</li>
            {/* <li className='breadcrumb-item'>
              
            </li> */}
          </ol>
          <Cards />
          <DashboardCharts />
          {/* <DataTable /> */}
        </div>
      </main>
    </Layout1>

  )
}



export async function getServerSideProps({ req, res }) {
  const user_token = req.cookies.user_token;
  const user_status = req.cookies.user_status;
  const url = `${process.env.auth}/login/get_user`
  const user = await authentication_token(url, user_token);

  return {
    props: {
      user: user,
      user_status:user.status,
    },
  };
}
