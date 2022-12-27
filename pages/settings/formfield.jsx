import { AppScript } from 'components/lib/AppScript'
import Script from 'next/script'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { authentication_token, delete_xrh_data, get_xrh_data, settings_form } from 'functions';
import { DynamicFormData } from 'components/lib/DynamicForm';
import { Services } from 'components/lib/Services';
import { Layout1 } from 'components/layout/Layout1';
import { AppHead } from 'components/lib/AppHead';
import { Table2, Tabledata } from 'components/lib/Tabledata';







export default function Create(props){
    const router = useRouter();
    const { param, title} = router.query
    const [formfield2, setFormField2] = useState(props.formfield)

    function contentReloader(params) {
      get_xrh_data(`${process.env.main}/formfield/get-formfield/`, 
        false).then(data => {
            setFormField2(data.data);  
        });
    }


    async function remove_formfield(el) {
      const id = el.target.dataset['unique_id'];
      const url = `${process.env.main}/formfield/delete-formfield/${id}/`
      delete_xrh_data(url)
    }
   
  return (
    <Layout1 user={props.user} user_status={props.user_status} >
      <AppHead title={`Bomach Group | ${title}`} />
    <main>
    <div className="container-fluid px-4">
      <h1 className="mt-4">{title}</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">{title}</li>
      </ol>
      
        <form
        action={`${process.env.main}/formfield/register-formfield`} 
        onSubmit={settings_form} 
        method='POST'>

            <div className='row'>
                <div className='col-md-6'>
                    <Services 
                        name='form_service' 
                        title='Choose Service'
                    />
                </div>

                <div className='col-md-6'>
                    <label>Field</label>
                    <input type={'text'} 
                    placeholder='Field'
                    name='field' className='form-control form-control-sm' />
                </div>

            </div>
            <div className='mt-4'>
            <button type='submit' className='btn btn-primary btn-sm btn-block'>Submit</button>
            </div>
        </form>
    
        
    </div>
    <AppScript path='../../' />
  </main>
        <div className='mt-4 col-lg-12'>
          <Tabledata
            tbody={formfield2} 
            thead={['form_service','field']}
            reload_fun_content={contentReloader}
            remove_xrh_data={remove_formfield}
            />
        </div>
  </Layout1>

  )
}


export async function getServerSideProps({params, query, req, res }) {
  const user_token = req.cookies.user_token;
  const user_status = req.cookies.user_status;
  const url = `${process.env.auth}/login/get_user`
  const user = await authentication_token(url, user_token);

  // fetch formfields
  const res2 = await fetch(`${process.env.main}/formfield/get-formfield/`)
  const data_formfield = await res2.json()

  return {
    props: {
      user: user,
      user_status:user.status,
      formfield:data_formfield,
    },
  };
}