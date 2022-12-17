import React from 'react'
import { useRouter } from 'next/router';
import { Branch } from 'components/lib/Branch';
import { Customer } from 'components/lib/Customer';


export default function sell_plot() {

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
      <div className='mt-4'>
          <h3>Sell This Plot ({qy.id})</h3>
          <div className='row'>
            {JSON.stringify(qy)}
            <div className='col-md-4'>
              <Branch name_attr='branch' on_change_fun={branch_fun}  />
              <input hidden name='branch_name' id='branch_name' />
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
            <label>Plot Id</label>
              <input
              className='form-control form-control-sm'
              type={'text'} 
              readOnly 
              name='receiver' 
              defaultValue={qy.id} />
            </div>

          </div>
          <div className='row'>
              <div className='col-md-4'>
                  <label>Initiator</label>
                  <input 
                  type={'text'} 
                  className='form-control form-control-sm' 
                  name='initiator' 
                  defaultValue={'Onovo Arinze'}/>
              
                  <input
                  hidden
                  type={'text'} 
                  className='form-control form-control-sm' 
                  name='status' 
                  defaultValue={'pending'}/>

              </div>

              <div className='col-md-4'>
                  <label>Plot Name</label>
                  <input 
                  type={'text'} 
                  className='form-control form-control-sm' 
                  name='name' 
                  defaultValue={qy.name}/>
              </div>


              <div className='col-md-4'>
                  <Customer name='customer' on_change_fun={customer_fun} />
                  <input hidden name='customer_name' id='customer_name' />
              </div>

          </div>
      </div>
    </div>
  )
}
