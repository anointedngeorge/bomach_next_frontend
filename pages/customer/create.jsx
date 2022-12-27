import { AppScript } from 'components/lib/AppScript'
import Script from 'next/script'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { authentication_token, get_xrh_data, settings_form } from 'functions';
import { DynamicFormData } from 'components/lib/DynamicForm';
import { Layout1 } from 'components/layout/Layout1';
import { AppHead } from 'components/lib/AppHead';





export default function Create(props){
    const router = useRouter();
    const { param, title} = router.query
    const [content, setContent] = useState([])

    useEffect( () => {
      get_xrh_data(`${process.env.main}/form/get-form/${param}/`, false).then(data => {
        setContent(data.data);  
    });
    }, [param] )
   
  return (
    <Layout1 user={props.user} user_status={props.user_status} >
      <AppHead title={`Bomach Group | ${title}`} />
    <main>
    <div className="container-fluid px-4">
      <h1 className="mt-4">{title}</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">{title}</li>
      </ol>
      
        <form action={`${process.env.customer}/customer/register-customer`} onSubmit={settings_form} method='POST'>
        <DynamicFormData
            branch_data={props.branch}
            dynamicForms={content} 
            country_name='country_id' 
            state_name='state' 
        />
        </form>
    
        
    </div>
    <AppScript path='../../' />
    </main>
    </Layout1>

  )
}


export async function getServerSideProps({params, query, req, res }) {
  const user_token = req.cookies.user_token;
  const user_status = req.cookies.user_status;
  const url = `${process.env.auth}/login/get_user`
  const user = await authentication_token(url, user_token);

  const url_branch = `${process.env.main}/branch/get-branch`
  const res1 = await fetch(url_branch)
  const data_branch = await res1.json()

 

  const url_forms = `${process.env.main}/form/get-form/${query.param}/`
  const res2 = await fetch(url_forms)
  const data_forms = await res2.json()
  
  return {
    props: {
      user: user,
      user_status:user.status,
      branch:data_branch,
      forms:data_forms,
    },
  };
}