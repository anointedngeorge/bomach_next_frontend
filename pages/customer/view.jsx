import { AppScript } from 'components/lib/AppScript'
import Script from 'next/script'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { authentication_token, delete_xrh_data, get_xrh_data } from 'functions';
import { Tabledata } from 'components/lib/Tabledata';
import { Modal } from 'components/lib/Modal';
import { Layout1 } from 'components/layout/Layout1';
import { AppHead } from 'components/lib/AppHead';
import * as icons from "react-icons/bs";





export default function View(props){
    const router = useRouter();
    const { param, title} = router.query
    const [content2, setContent2] = useState(props.customer)
    const [formfield, setFormfield] = useState(props.formfield)



   async function remove_formfield(el) {
    const id = el.target.dataset['unique_id'];
    const url = `${process.env.customer}/customer/delete-customer/${id}/`
    delete_xrh_data(url)
  }

  function contentReloader(params) {
    get_xrh_data(`${process.env.customer}/customer/get-customer/`, false).then(data => {
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

        <Tabledata 
        thead={formfield}
        tbody={content2}
        current_param={param}
        button={[]}
        reload_fun_content={contentReloader}
        pages={
            [
              {pagename:`${param}/view_single`, 
              title:'View', 
              modalclassid:'modal_container', 
              classname:'btn btn-sm btn-primary', show_modal:true,
              icon:'BsFillArchiveFill',
              iconsize:'20px'
              },

              {pagename:`${param}/view_related_payment`, 
              title:'Email', 
              modalclassid:'modal_container', 
              classname:'btn btn-sm btn-dark', show_modal:true,
              icon:'BsFillChatSquareDotsFill',
              iconsize:'20px'
              },

              {pagename:`whatsapp`, 
              title:'whatsapp', 
              modalclassid:'modal_container', 
              classname:'btn btn-sm btn-success', show_modal:true,
              icon:'BsWhatsapp',
              iconsize:'20px'
              },
              
              {pagename:`${param}/view_related_payment`, 
              title:'payments', 
              modalclassid:'modal_container', 
              classname:'btn btn-sm btn-warning', show_modal:true,
              icon:'BsFillCartCheckFill',
              iconsize:'20px'
              },
            ]
        }
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
  const url3 = `${process.env.customer}/customer/get-customer/`
  const res1 = await fetch(url3)
  const data = await res1.json()

  // fetch formfields
  const res2 = await fetch(`${process.env.main}/formfield/get-formfield/${query.param}/`)
  const data_formfield = await res2.json()

  return {
    props: {
      user: user,
      user_status:user.status,
      customer:data,
      formfield:data_formfield,
    },
  };
}
