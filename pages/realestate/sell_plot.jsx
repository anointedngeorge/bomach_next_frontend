import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Branch } from 'components/lib/Branch';
import { Customer } from 'components/lib/Customer';
import { authentication_token, get_xrh_data, settings_form, update_xhr_data, _settingFormWithConfirmationPrompt } from 'functions';
import { Status2, Status3 } from 'components/lib/Status';


export default function Sell_plot(props) {
    const [content, setContent] = useState(props.branch)
    const router = useRouter();
    const qy = router.query

    async function branch_fun(el) {
      const indx = el.target.selectedIndex;
      const txt = el.target[indx].textContent
      document.getElementById('branch_name').value=txt;
    }

    async function customer_fun(el) {
      const indx = el.target.selectedIndex;
      const txt = el.target[indx].textContent
      document.getElementById('customer_name').value=txt;
    }

  return (
    <div className='container'>
      
      <form 
      onSubmit={update_xhr_data} 
      action={`${process.env.realestate}/estate/plot/update-estate-plot/${qy.id}`} >
      <div className='mt-4'>
          <h3>Sell this plot ({qy.name} - {qy.id})</h3>
          <p>
            <i>
              Update status - PENDING to generate remita receipt. 
            </i>
          </p>
          <div className='row mt-4'>
            {/* {JSON.stringify(qy)} */}
            <div className='col-md-12'>
              <Status3 name='status' label='Choose Status' />
            </div>

      
              {/* <div className='col-md-6'>
                  <label>Plot Name</label>
                  <input
                  readOnly
                  type={'text'} 
                  className='form-control form-control-sm' 
                  name='name' 
                  defaultValue={qy.name}/>
              </div> */}
          </div>
      </div>
      <div className='mt-4'>
        <button className='btn btn-sm btn-warning btn-block' type='submit'>Update</button>
      </div>
      </form>
    </div>
  )
}


export async function getServerSideProps({params, query, req, res }) {
  const user_token = req.cookies.user_token;
  const user_status = req.cookies.user_status;
  const url = `${process.env.auth}/login/get_user`
  const user = await authentication_token(url, user_token);
  const url_branch = `${process.env.main}/branch/get-branch`
  const res1 = await fetch(url_branch)
  const data_branch = await res1.json()

 
  return {
    props: {
      user: user,
      user_status:user.status,
      branch:data_branch,
    },
  };
}