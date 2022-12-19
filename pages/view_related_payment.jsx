import { AppScript } from 'components/lib/AppScript'
import Script from 'next/script'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { delete_xrh_data, get_xrh_data } from 'functions';
import { Table3, Tabledata } from 'components/lib/Tabledata';
import { Modal } from 'components/lib/Modal';
import { Layout1 } from 'components/layout/Layout1';
import { AppHead } from 'components/lib/AppHead';






export default function View(){
    const router = useRouter();
    const qy = router.query
    const [content, setContent] = useState([])


    
   useEffect(() => {
        get_xrh_data(`${process.env.main}/payment/get-payment/`, false).then(data => {
            setContent(data.data);  
        });

   }, [qy])

   const gallery = [...content.filter(data => data.originator === qy.id)];

 

  return (
    <div className='container'>

       <div className='table-responsive'>
       <div className='mt-4 mb-4'>
       <h3>View All Payments related to {qy.estate_title || qy.name}</h3>
  
       </div>
        <Table3 
        thead={['name', 'total_amount','status','initiator','created_at']}
        tbody={content}
        buttons={
          {
            "confirmed":[
                {name:'download', href:'generate_csv', classname:'btn btn-sm btn-info',tooltip:'download this file'},
                
              ],
           
          }
        }
        />
       </div>
    </div>
  )
}
