import { AppScript } from 'components/lib/AppScript'
import Script from 'next/script'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { get_xrh_data, settings_form } from 'functions';
import { DynamicFormData } from 'components/lib/DynamicForm';
import { Layout1 } from 'components/layout/Layout1';
import { AppHead } from 'components/lib/AppHead';






export default function Create(){
    const router = useRouter();
    const qy = router.query
    const { param, title} = router.query
    const [content, setContent] = useState([])
    const [content2, setContent2] = useState([])

   useEffect( () => {
        get_xrh_data(`${process.env.main}/form/get-form/realestateplot/`, false).then(data => {
          setContent(data.data);  
      });
   }, [] )

   
  return (
    // <Layout1 >
    //   <AppHead title={`Bomach Group | `} />
      <main>
      <div className="container-fluid px-4">
        <h1 className="mt-4">{title}</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">{title}</li>
        </ol>
        
          <form action={`${process.env.realestate}/estate/plot/register-estate-plot`} 
          onSubmit={settings_form} method='POST'>
          <div className='row'>
            <label>
              Estate Identification
            <input type={'text'} defaultValue={qy.id} readOnly name='estate_id' className='form-control form-control-sm' />

            </label>
          </div>
          <DynamicFormData
           show_branch={false}
           show_country={false}
            dynamicForms={content}
           />
          </form>
      </div>
      <AppScript path='../../' />
      </main>
    // {/* </Layout1> */}

  )
}
