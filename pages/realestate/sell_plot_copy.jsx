import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Branch } from 'components/lib/Branch';
import { Customer } from 'components/lib/Customer';
import { get_xrh_data, settings_form, _settingFormWithConfirmationPrompt } from 'functions';


export default function Sell_plot() {
    const [content, setContent] = useState([])
    const router = useRouter();
    const qy = router.query

    useEffect(() => {
      const url = `${process.env.main}/branch/get-branch/`;
      get_xrh_data(url, false).then(data => {
        setContent(data.data);
      })
    }, [])
    
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
      <form onSubmit={_settingFormWithConfirmationPrompt} method="POST" action={`${process.env.main}/payment/register-payment`} >
      <div className='mt-4'>
          <h3>Sell This Plot ({qy.name} - {qy.id})</h3>
          <div className='row'>
            {/* {JSON.stringify(qy)} */}
            <div className='col-md-4'>
              <Branch data={content} required name_attr='branch' on_change_fun={branch_fun}  />
              <div className='col-md-12'>
              {/* <label>Branch name</label> */}
              <input hidden required className='form-control form-control-sm' name='branch_name' id='branch_name' />
              </div>
            </div>

            <div className='col-md-4'>
            <label>Originator</label>
              <input
              className='form-control form-control-sm'
              type={'text'} 
              readOnly 
              name='originator' 
              defaultValue={qy.estate_id} />
            </div>

            <div className='col-md-4'>
            <label>receiver</label>
              <input
              className='form-control form-control-sm'
              type={'text'} 
              readOnly 
              name='receiver' 
              defaultValue={qy.id} />
            </div>

          </div>
          <div className='row'>
              <div className='col-md-3'>
                  <label>Initiator</label>
                  <input 
                  type={'text'} 
                  className='form-control form-control-sm' 
                  name='initiator' 
                  defaultValue={'Onovo Arinze'} />
              
                  <input
                  hidden
                  type={'text'} 
                  className='form-control form-control-sm' 
                  name='status' 
                  defaultValue={'pending'}  />

              </div>

              <div className='col-md-3'>
                  <label>Plot Name</label>
                  <input
                  readOnly
                  type={'text'} 
                  className='form-control form-control-sm' 
                  name='name' 
                  defaultValue={qy.name}/>
              </div>

              <div className='col-md-3'>
                  <label>total amount</label>
                  <input
                  readOnly
                  type={'text'} 
                  className='form-control form-control-sm' 
                  name='total_amount' 
                  defaultValue={qy.amount}/>
              </div>


              <div className='col-md-3'>
                  <Customer label='Select Customer' name='customer' on_change_fun={customer_fun} />
                  <div className='col-md-12'>
                    <input hidden required name='customer_name' id='customer_name' />
                  </div>
              </div>

          </div>
      </div>
      <div className='mt-4'>
        <button type='submit'>Create</button>
      </div>
      </form>
    </div>
  )
}

