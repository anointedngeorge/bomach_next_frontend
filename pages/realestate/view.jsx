import { AppScript } from 'components/lib/AppScript'
import Script from 'next/script'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { authentication_token, delete_xrh_data, get_xrh_data, settings_form } from 'functions';
import { Tabledata } from 'components/lib/Tabledata';
import { Modal } from 'components/lib/Modal';
import { Layout1 } from 'components/layout/Layout1';
import { AppHead } from 'components/lib/AppHead';






export default function View(props){
    const router = useRouter();
    const { param, title} = router.query
    const [content2, setContent2] = useState(props.realestate)
    const [formfield, setFormfield] = useState(props.formfield)



   async function remove_formfield(el) {
      const id = el.target.dataset['unique_id'];
      const url = `${process.env.realestate}/estate/delete-estate/${id}/`
      // delete_xrh_data(url)
      alert(url)
  }

  function contentReloader(params) {
        get_xrh_data(`${process.env.realestate}/estate/get-estate/`, false).then(data => {
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
            classname:'btn btn-sm btn-primary', show_modal:true
            },

            {pagename:`${param}/view_single`, 
            title:'Edit', 
            modalclassid:'modal_container', 
            classname:'btn btn-sm btn-warning', show_modal:true
            },

            {pagename:`${param}/create_plot`, 
              title:'Create Plot', 
              modalclassid:'modal_container', 
              classname:'btn btn-sm btn-info', show_modal:true
              },

            {pagename:`${param}/view_single_plot`, 
              title:'View Plot', 
              modalclassid:'modal_container', 
              classname:'btn btn-sm btn-warning', show_modal:true
              },

              {pagename:`${param}/extra_fees`, 
              title:'Extra Fees', 
              modalclassid:'modal_container', 
              classname:'btn btn-sm btn-dark', show_modal:true,
              icon:'BsFillBookmarkFill',
              iconsize:'11px'
              },
            
              {pagename:`view_related_payment`, 
              title:'Payments', 
              modalclassid:'modal_container', 
              classname:'btn btn-sm btn-primary', show_modal:true
              },

            ]
        }
            remove_xrh_data={remove_formfield}
         />
        </div>
         
        
    </div>
    <Modal />
    <AppScript path='../' />
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

  const res1 = await fetch(`${process.env.realestate}/estate/get-estate/`)
  const data = await res1.json()

  // fetch formfields
  const res2 = await fetch(`${process.env.main}/formfield/get-formfield/${query.param}/`)
  const data_formfield = await res2.json()

  return {
    props: {
      user: user,
      user_status:user.status,
      realestate:data,
      formfield:data_formfield,
    },
  };
}
