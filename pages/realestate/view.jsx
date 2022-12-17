import { AppScript } from 'components/lib/AppScript'
import Script from 'next/script'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { delete_xrh_data, get_xrh_data } from 'functions';
import { Tabledata } from 'components/lib/Tabledata';
import { Modal } from 'components/lib/Modal';
import { Layout1 } from 'components/layout/Layout1';
import { AppHead } from 'components/lib/AppHead';






export default function View(){
    const router = useRouter();
    const { param, title} = router.query
    const [content, setContent] = useState([])
    const [content2, setContent2] = useState([])
    const [formfield, setFormfield] = useState([])

    
   useEffect(() => {
        get_xrh_data(`${process.env.main}/formfield/get-formfield/${param}/`, false).then(data => {
            setFormfield(data.data);  
        });

      get_xrh_data(`${process.env.realestate}/estate/get-estate/`, false).then(data => {
          setContent2(data.data);  
      });

        setInterval(() => {
            get_xrh_data(`${process.env.main}/formfield/get-formfield/${param}/`, false).then(data => {
                setFormfield(data.data);  
            });
            get_xrh_data(`${process.env.realestate}/estate/get-estate/`, false).then(data => {
                setContent2(data.data);  
            });
      }, 30000);
   }, [param])

   async function remove_formfield(el) {
      const id = el.target.dataset['unique_id'];
      const url = `${process.env.realestate}/estate/delete-estate/${id}/`
      delete_xrh_data(url)
      
  }

  return (
    <Layout1 >
      <AppHead title={`Bomach Group | `} />
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
        pages={
            [
             {pagename:`${param}/view_single`, 
            title:'View', 
            modalclassid:'modal_container', 
            classname:'btn btn-sm btn-primary', show_modal:false
            
            },

            {pagename:`${param}/view_single`, 
            title:'Edit', 
            modalclassid:'modal_container', 
            classname:'btn btn-sm btn-warning', show_modal:false
            },

            {pagename:`${param}/create_plot`, 
              title:'Create Plot', 
              modalclassid:'modal_container', 
              classname:'btn btn-sm btn-info', show_modal:false
              },

            {pagename:`${param}/view_single_plot`, 
              title:'View Plot', 
              modalclassid:'modal_container', 
              classname:'btn btn-sm btn-warning', show_modal:false
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
