import { AppScript } from 'components/lib/AppScript'
import Script from 'next/script'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { authentication_token, delete_xrh_data, get_xrh_data } from 'functions';
import { Tabledata } from 'components/lib/Tabledata';
import { Modal } from 'components/lib/Modal';
import { Layout1 } from 'components/layout/Layout1';
import { AppHead } from 'components/lib/AppHead';
import { Remita } from 'components/lib/Remita';






export default function View(props){
    const router = useRouter();
    const qy = router.query
    const [content, setContent] = useState(props.estate)
    

    function percentage(percentage = 1, amount=0) {
        let result = 0;
        result = parseInt(percentage) / 100 * parseFloat(amount);
        return result;
    }
    
  return (
    <div className='container'>
    {/* {JSON.stringify(qy)} */}
        <Remita querys={qy}  content={[
            {name:'Plot Price', price:`${qy.price}`},
            {name:'Legal Fee', price:`${content[0].legal_fee}`},
            {name:'survey plan', price:`${content[0].survey_plan}`},
            {name:`development Fee (${content[0].development_fee}%)`, 
            price:percentage(`${content[0].development_fee}`,`${qy.price}` )},
        ]} />
    </div>
  )
}


export async function getServerSideProps({params, query, req, res }) {
    const user_token = req.cookies.user_token;
    const user_status = req.cookies.user_status;
    const url = `${process.env.auth}/login/get_user`
    const user = await authentication_token(url, user_token);
  
    const estate = `${process.env.realestate}/estate/get-estate/${query.estate_id}`
    const res2 = await fetch(estate)
    const data_estate = await res2.json()
    
    return {
      props: {
        user: user,
        user_status:user.status,
        estate:data_estate,
      },
    };
  }
  
