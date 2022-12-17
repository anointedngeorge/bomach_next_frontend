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
    const { param, title} = router.query
    const [content, setContent] = useState([])

    useEffect( () => {
      get_xrh_data(`${process.env.main}/form/get-form/${param}/`, false).then(data => {
        setContent(data.data);  
    });
    }, [param] )
   
  return (
    <Layout1 >
      <AppHead title={`Bomach Group | `} />
    <main>
    <div className="container-fluid px-4">
      <h1 className="mt-4">{title}</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">{title}</li>
      </ol>
      
        <form action={`${process.env.realestate}/estate/register-estate`} onSubmit={settings_form} method='POST'>
        <DynamicFormData dynamicForms={content} />
        </form>
    
        
    </div>
    <AppScript path='../../' />
    </main>
    </Layout1>

  )
}
