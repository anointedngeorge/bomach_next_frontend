import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { get_xrh_data } from 'functions';
import { Table2, Table3, Tabledata } from 'components/lib/Tabledata';
import { Modal } from 'components/lib/Modal';


const View_single = () => {
  const [content, setContent] = useState([])
  const [content2, setContent2] = useState([])
  const [formfield, setFormfield] = useState([])
  const [content3, setContent3] = useState([])

  const router = useRouter();
  const qy = router.query
  const estate_id = qy.id;
  const url1 = `${process.env.realestate}/estate/plot/get-plot-estate-id`;

  useEffect( () => {
        get_xrh_data(`${process.env.main}/formfield/get-formfield/realestate/`, false).then(data => {
          setFormfield(data.data);  
      });

      get_xrh_data(`${process.env.realestate}/estate/plot/get-estate-plot/`, false).then(data => {
          setContent2(data.data);  
      });

      const container = [...content2.filter(data => data.estate_id === estate_id)];
      setContent3(container);
  }, [qy, content2, estate_id] )



  
  return (
    
    <div className='col-lg-12'>
      <h2>View Estate plot</h2>
      <Table3 
      thead={['name','status','unique_code','purchase_code','date_of_purchase']}
      tbody={content3}
      href={url1}
        buttons={
          {
            "available":[
                {name:'sell', href:'/realestate/sell_plot', classname:'btn btn-sm btn-warning',tooltip:'Sell this plot'},
                {name:'Add Files', href:'/gallery', classname:'btn btn-sm btn-warning',tooltip:'Add Attachment'},
                {name:'View Files', href:'/view_gallery', classname:'btn btn-sm btn-warning', tooltip:'View Attachment'},
                {name:'property titles', href:'/realestate/editor', classname:'btn btn-sm btn-warning', tooltip:'View Property Title'},
              ],
            "pending":[
              {name:'Confirm', href:'/confirm_payment', classname:'btn btn-sm btn-warning', tooltip:'Confirm Payment'},
            ],
            "reserved":[],
            "unavailable":[
              {name:'unlock', href:'/confirm_payment', classname:'btn btn-sm btn-warning', tooltip:'Confirm Payment'},
            ],
            "sold":[
              {name:'Print', href:'/gallery', classname:'btn btn-sm btn-warning', tooltip:''},
            ]
          }
        }
      />

      <div id='loader'></div>
    </div>
    
  )
}

export default View_single