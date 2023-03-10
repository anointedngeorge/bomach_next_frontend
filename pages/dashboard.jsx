import { Cards } from 'components/layout/dashboard/Cards'
import { DashboardCharts } from 'components/layout/dashboard/DashboardCharts'
import { DataTable } from 'components/layout/dashboard/DataTable'
import { Layout1 } from 'components/layout/Layout1'
import { AppHead } from 'components/lib/AppHead'
import { AppScript } from 'components/lib/AppScript'
import { authentication_token } from 'functions'
import Head from 'next/head'
import Script from 'next/script'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';



export default function Dashboard(props) {
  const router = useRouter();
  const {param, title} = router.query

  return (
    <Layout1 user={props.user} user_status={props.user_status} >
      <AppHead title={`Bomach Group | Welcome to bomach Group`} />
      <main>
      {/* {JSON.stringify(props)} */}
        <div className="container-fluid px-4">
          <h1 className="mt-4">Welcome {props.user.first_name}</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active">Dashboard</li>
            {/* <li className='breadcrumb-item'>
              
            </li> */}
          </ol>
          <Cards data={props.general_data} />
          <DashboardCharts />
          {/* <DataTable /> */}
        </div>
      </main>
    </Layout1>

  )
}



export async function getServerSideProps({params, query, req, res }) {
  const user_token = req.cookies.user_token;
  const user_status = req.cookies.user_status;
  const url = `${process.env.auth}/login/get_user`
  const user = await authentication_token(url, user_token);

  const url_forms = `${process.env.main}/general/get-count`
  const res2 = await fetch(url_forms)
  const data = await res2.json()
  
  return {
    props: {
      user: user,
      user_status:user.status,
      general_data:data,
    },
  };
}
