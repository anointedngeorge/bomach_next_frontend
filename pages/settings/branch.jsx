import { AppScript } from 'components/lib/AppScript'
import Script from 'next/script'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { authentication_token, get_xrh_data, settings_form, delete_xrh_data } from 'functions';
import { DynamicFormData } from 'components/lib/DynamicForm';
import { Services } from 'components/lib/Services';
import { Layout1 } from 'components/layout/Layout1';
import { AppHead } from 'components/lib/AppHead';
import { Table3, Tabledata } from 'components/lib/Tabledata';





export default function Create(props){
    const router = useRouter();
    const { param, title} = router.query
    const [content, setContent] = useState([])

    useEffect(() => {
      get_xrh_data(`${process.env.main}/branch/get-branch/`, false).then(data => {
        setContent(data.data);  
    });
    }, [])

   async function remove_formfield(el) {
    const id = el.target.dataset['unique_id'];
    const url = `${process.env.main}/branch/delete-branch/${id}/`
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
          action={`${process.env.main}/branch/register-branch`} 
          onSubmit={settings_form} 
          method='POST'>

              <div className='row'>
                  <div className='col-md-6'>
                  <label>Branch Name</label>
                      <input type={'text'} 
                      placeholder='branch name'
                      name='name' className='form-control form-control-sm' />
                  </div>

                  <div className='col-md-6'>
                      <label>Phone number</label>
                      <input type={'text'} 
                      placeholder='Phone number'
                      name='phone_number' className='form-control form-control-sm' />
                  </div>

              </div>

              <div className='row'>
                  <div className='col-md-12'>
                  <label>Description</label>
                      <textarea className='form-control form-control-sm' placeholder='Description' name='description'></textarea>
                  </div>

              </div>

              <div className='mt-4'>
              <button type='submit' className='btn btn-primary btn-sm btn-block'>Submitd</button>
              </div>
          </form>

        <div className='col-lg-12'>
          <Table3
            thead={['name','phone_number','description']}
            tbody={content}
            href={`${process.env.main}/branch/delete-branch`}
            remove_delete_fun={remove_formfield}
          />
        </div>
          
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

  return {
    props: {
      user: user,
      user_status:user.status,
    },
  };
}