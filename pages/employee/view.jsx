import { AppScript } from 'components/lib/AppScript'
import Script from 'next/script'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { authentication_token, delete_xrh_data, get_xrh_data } from 'functions';
import { Tabledata, Table3 } from 'components/lib/Tabledata';
import { Modal } from 'components/lib/Modal';
import { Layout1 } from 'components/layout/Layout1';
import { AppHead } from 'components/lib/AppHead';
import * as icons from "react-icons/bs";



export default function View(props){
    const router = useRouter();
    const { param, title} = router.query
    const [content, setContent] = useState([])
    const [content2, setContent2] = useState(props.employee)
    const [formfield, setFormfield] = useState(props.formfield)


   async function remove_formfield(el) {
    const id = el.target.dataset['unique_id'];
    const url = `${process.env.employee}/employee/delete-employee/${id}/`
    delete_xrh_data(url)
}

function contentReloader(params) {
  get_xrh_data(`${process.env.employee}/employee/get-employee/`, false).then(data => {
    setContent2(data.data);  
});
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
      {/* inner_data */}
        <div id='inner_page_container'>

        <Table3
        thead={['first_name','last_name','phone_number','email']}
        tbody={content2}
        reload_fun_content={contentReloader}
        buttons={{
                "pending":[
                  {name:'Attend to', href:'/confirm_payment', 
                        classname:'btn btn-sm btn-warning', tooltip:'Attend to this Application',
                        icon:'BsWhatsapp',
                        iconsize:'20px'
                    },
                ],
              }}
        remove_xrh_data={remove_formfield}
         />
        </div>
         
        
    </div>
    <Modal />
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

  // fetching realestate
  const url3 = `${process.env.employee}/employee/get-employee/`
  const res1 = await fetch(url3)
  const data = await res1.json()

  // fetch formfields
  const res2 = await fetch(`${process.env.main}/formfield/get-formfield/${query.param}/`)
  const data_formfield = await res2.json()

  return {
    props: {
      user: user,
      user_status:user.status,
      employee:data,
      formfield:data_formfield,
    },
  };
}