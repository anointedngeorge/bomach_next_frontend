import { AppScript } from 'components/lib/AppScript'
import Script from 'next/script'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { authentication_token, get_xrh_data, settings_form,delete_xrh_data } from 'functions';
import { DynamicFormData } from 'components/lib/DynamicForm';
import { Services } from 'components/lib/Services';
import { FORMTYPE } from 'navigation';
import { Layout1 } from 'components/layout/Layout1';
import { AppHead } from 'components/lib/AppHead';
import { Table2, Tabledata } from 'components/lib/Tabledata';


export default function Create(props){
    const router = useRouter();
    const { param, title} = router.query
    const [content, setContent] = useState([])
    const [formfield, setFormField] = useState([])
    const [formfield2, setFormField2] = useState([])

    useEffect(() => {
        // const response = `${el.target.value}`.split(' ').join;
        get_xrh_data(`${process.env.main}/form/get-form/`, 
        false).then(data => {
            setFormField2(data.data);  
        });

        get_xrh_data(`${process.env.main}/form/get-form/${param}/`, false).then(data => {
            setContent(data.data);  
        });

        // setInterval(() => {
        //     get_xrh_data(`${process.env.main}/form/get-form/${param}/`, false).then(data => {
        //         setContent(data.data);  
        //     });
        // }, 60000);
    }, [param])


   async function title_to_name(el) {
        const name_title = `${el.target.value}`.split(' ').join('_');
        document.getElementById('id_name').value = name_title;
   }

  async function getServiceRelatedFields(el) {
        // const response = `${el.target.value}`.split(' ').join;
        await get_xrh_data(`${process.env.main}/formfield/get-formfield/${el.target.value}/`, 
        false).then(data => {
            setFormField(data.data);  
        });
  }
   
  async function remove_formfield(el) {
    const id = el.target.dataset['unique_id'];
    const url = `${process.env.main}/form/delete-form/${id}/`
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
        action={`${process.env.main}/form/register-form`} 
        onSubmit={settings_form} 
        method='POST'>

            <div className='row'>
                <div className='col-md-4'>
                    <Services 
                        name='form_service' 
                        title='Choose Service'
                        on_change_fun={getServiceRelatedFields}
                    />
                </div>

                <div className='col-md-4'>
                    <label>Title</label>
                    {/* formfield */}
                    <select 
                    onChange={title_to_name} 
                    name='title' 
                    className='form-control form-control-sm'>
                    <option defaultValue={true} disabled>Choose</option>
                    {formfield.map((data, i) => {
                        return (
                            <option key={`id_sasddswe_${i}`} value={data.field}>{`${data.field}`.toUpperCase()}</option>
                        )
                    })}
                       
                    </select>
                </div>

                <div className='col-md-4'>
                    <label>Form Type</label>
                    <select  
                    name='form_type' 
                    className='form-control form-control-sm'>
                    <option defaultValue={true} disabled>Choose</option>
                    {FORMTYPE.map((data, i) => {
                        return (
                            <option key={`id_sasd_${i}`} value={data}>{`${data}`.toUpperCase()}</option>
                        )
                    })}
                    </select>
                </div>

            </div>

            <div className='row'>
                <div className='col-md-6'>
                    <label>Classname</label>
                    <input type={'text'} 
                    placeholder='classname'
                    defaultValue={'col-md-4'}
                    name='classname' className='form-control form-control-sm' />
                </div>
                

                <div className='col-md-3'>
                    <label>Standalone</label>
                    <select name='standalone' className='form-control form-control-sm'>
                    <option defaultValue={true} disabled>Choose</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>

                <div className='col-md-3'>
                    <label>name</label>
                    <input type={'text'} 
                    name='name' readOnly className='form-control form-control-sm'  id='id_name' />
                </div>

                

            </div>
            
            <div className='row'>
                <div className='col-md-4'>
                    <label>Is Required</label>
                    <select name='is_required' className='form-control form-control-sm'>
                        <option defaultValue={true} disabled>Choose</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>

                <div className='col-md-4'>
                    <label>Is Disabled</label>
                    <select  
                    name='is_disabled' 
                    className='form-control form-control-sm'>
                        <option defaultValue={true} disabled>Choose</option> 
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>

                <div className='col-md-2'>
                    <label>Index</label>
                    <input type={'number'} 
                    defaultValue={0}
                    name='index' className='form-control form-control-sm' />
                </div>

                <div className='col-md-2'>
                    <label>form element</label>
                    <select  
                    name='form_element' 
                    className='form-control form-control-sm'>
                        <option defaultValue={true} disabled>Choose</option>
                        <option value='input'>Input</option>
                        <option value='testarea'>Testarea</option>
                    </select>
                </div>

            </div>
            <div className='mt-4'>
            <button type='submit' className='btn btn-primary btn-sm btn-block'>Submit</button>
            </div>
        </form>
    
        <div className='mt-4'>
        <Tabledata 
        tbody={formfield2} 
        thead={['title','form_service','form_type','form_element']} 
        remove_xrh_data={remove_formfield}
        fontsize="15px"
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
