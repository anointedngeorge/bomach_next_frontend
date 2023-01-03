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



export default function Create(props){
    const router = useRouter();
    const { param, title} = router.query
    const [content, setContent] = useState(props.formfield)
    let counter = 1;

   async function update_formfield(el) {
        const id = el.target.dataset['unique_id'];
        const is_shown = el.target.checked;
        const url = `${process.env.main}/formfield/update-formfield/${id}`
        update_xhr_data_with_data(url, {'is_shown':is_shown}).then(data => {})
        
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

        <div className='row'>
            <Navbar navbar={[{
                   title:'Alter Forms',
                   href:'/settings/alterforms?param=formfield&title=Create Form Field'
                }]} />
        </div>

        <table className='table-sm '>
            <thead>
               <tr>
                    <th>#</th>
                    <th>Service</th>
                    <th>field</th>
                    <th>Display</th>
                    <th>...</th>
               </tr>
            </thead>
            <tbody>
                {content.map( (data, i) => {
                    return (
                        <tr key={`id_formfield_${i}`} id={`id_formfield_${i}`} className={`class_formfield`}>
                            <td>{counter + i}</td>
                            <td>{data.form_service}</td>
                            <td>{data.field}</td>
                            <td>
                                <input
                                    data-unique_id={data.id}
                                    value={data.is_shown}
                                    defaultChecked={data.is_shown} 
                                    type={'checkbox'}
                                    onClick={update_formfield} 
                                    name='is_shown' 
                                />
                            </td>

                            <td>
                                <button
                                data-unique_id={data.id}
                                onClick={remove_formfield}
                                className='btn btn-sm'>
                                    Remove
                                </button>
                            </td>
                            
                        </tr>
                    )
                } )}
                
            </tbody>
        </table>
            
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
  
    const url2 = `${process.env.main}/formfield/get-formfield/`;
    const res1 = await fetch(url2)
    const data = await res1.json()

    return {
      props: {
        user: user,
        user_status:user.status,
        formfield:data,
      },
    };
  }