import { AppScript } from 'components/lib/AppScript'
import Script from 'next/script'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { authentication_token, delete_xrh_data, get_xrh_data, settings_form, update_xhr_data, update_xhr_data_with_data } from 'functions';
import { DynamicFormData } from 'components/lib/DynamicForm';
import { Services } from 'components/lib/Services';
import { Layout1 } from 'components/layout/Layout1';
import { AppHead } from 'components/lib/AppHead';
import { Navbar } from 'components/lib/Navbar';
import { Tabledata } from 'components/lib/Tabledata';




export default function Create(props){
    const router = useRouter();
    const { param, title} = router.query
    const [content, setContent] = useState(props.forms)
    let counter = 1;

   async function remove_formfield(el) {
         const id = el.target.dataset['unique_id'];
         const url = `${process.env.main}/form/delete-form/${id}/`
         delete_xrh_data(url)
   }
   
  return (
    <Layout1 user={props.user} user_status={props.user_status}  >
      <AppHead title={`Bomach Group | ${title}`} />
        <main>
        <div className="container-fluid px-4">
        <h1 className="mt-4">{title}</h1>
        <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active">{title}</li>
        </ol>

        <div className='row'>
            <Navbar navbar={[{
                   title:'Back >> Formfield',
                   href:'/settings/formfieldsetting?param=formfield&title=Create Form Field'
                }]} />
        </div>

        <Tabledata 
          thead={['name','form_type', 'form_element']} 
          tbody={content} 
          reload_fun_content={remove_formfield}
          />
            
        </div>
        <AppScript path='../../' />
        </main>
    </Layout1>

  )
}


export async function getServerSideProps({ req, res }) {
    const user_token = req.cookies.user_token;
    const user_status = req.cookies.user_status;
    const url = `${process.env.auth}/login/get_user`
    const user = await authentication_token(url, user_token);
    
    const url2 = `${process.env.main}/form/get-form/`;
    const res1 = await fetch(url2)
    const data = await res1.json()

    return {
      props: {
        user: user,
        user_status:user.status,
        forms:data,
      },
    };
  }