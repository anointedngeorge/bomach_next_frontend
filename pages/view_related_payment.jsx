import { AppScript } from 'components/lib/AppScript'
import Script from 'next/script'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { authentication_token, delete_xrh_data, get_xrh_data } from 'functions';
import { Table3, Tabledata } from 'components/lib/Tabledata';
import { Modal } from 'components/lib/Modal';
import { Layout1 } from 'components/layout/Layout1';
import { AppHead } from 'components/lib/AppHead';




export default function View(props){
    const router = useRouter();
    const qy = router.query
    const [content, setContent] = useState(props.payment)

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


export async function getServerSideProps({params, query, req, res }) {
  const user_token = req.cookies.user_token;
  const user_status = req.cookies.user_status;
  const url = `${process.env.auth}/login/get_user`
  const user = await authentication_token(url, user_token);

  const formfield = `${process.env.main}/formfield/get-formfield/realestate/`
  const res1 = await fetch(formfield)
  const data_formfield = await res1.json()

 
  const payment = `${process.env.main}/payment/get-payment/`
  const res2 = await fetch(payment)
  const data_payment = await res2.json()
  
  return {
    props: {
      user: user,
      user_status:user.status,
      formfield:data_formfield,
      payment:data_payment,
    },
  };
}
