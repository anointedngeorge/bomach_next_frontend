import { AppScript } from 'components/lib/AppScript'
import Script from 'next/script'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { get_xrh_data, settings_form } from 'functions';
import { DynamicFormData } from 'components/lib/DynamicForm';
import { Services } from 'components/lib/Services';
import { Layout1 } from 'components/layout/Layout1';
import { AppHead } from 'components/lib/AppHead';
import { Table2 } from 'components/lib/Tabledata';







export default function Create(){
    const router = useRouter();
    const { param, title} = router.query
    const [content, setContent] = useState([])


    const [formfield2, setFormField2] = useState([])

    useEffect(() => {
        // const response = `${el.target.value}`.split(' ').join;
        get_xrh_data(`${process.env.main}/formfield/get-formfield/`, 
        false).then(data => {
            setFormField2(data.data);  
        });
        get_xrh_data(`${process.env.main}/form/get-form/${param}/`, false).then(data => {
          setContent(data.data);  
      });
    }, [param])


   
  return (
    <Layout1 >
      <AppHead title={`Bomach Group | `} />
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
          <Table2 tbody={formfield2} thead={['form_service','field']} />
        </div>
  </Layout1>

  )
}
