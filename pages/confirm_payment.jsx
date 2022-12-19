import { AppScript } from 'components/lib/AppScript'
import Script from 'next/script'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { delete_xrh_data, get_xrh_data, update_xhr_data_with_data, _settingFormWithConfirmationPrompt } from 'functions';
import { Tabledata } from 'components/lib/Tabledata';
import { Modal } from 'components/lib/Modal';
import { Layout1 } from 'components/layout/Layout1';
import { AppHead } from 'components/lib/AppHead';
import { Status, Status2 } from 'components/lib/Status';






export default function View(){
    const router = useRouter();
    const qy = router.query
    const [content, setContent] = useState([])
    const [passwordunlocker, setpasswordUnlocker] = useState(Boolean)


   useEffect(() => {
        get_xrh_data(`${process.env.main}/payment/get-payment/`, false).then(data => {
            setContent(data.data);  
        });
   }, [qy])

   const filtered =  [...content.filter(data => data.receiver === qy.id)][0]

   async function _update_form(el) {
        el.preventDefault()
        const url = el.target.action;
        const forms = new FormData(el.target)
        const data = {status:forms.get('status'), receiver:forms.get('receiver')}
        update_xhr_data_with_data(url, data).then(data => {
            console.log(data);
        })
   }


   async function _update_form2(el) {
    el.preventDefault()

    if (window) {
        if (window.confirm(`
        This action will make available this service for reselling
        `)) {
            const url = el.target.action;
            const forms = new FormData(el.target)
            const data = {status:forms.get('status'), receiver:forms.get('receiver')}
            update_xhr_data_with_data(url, data).then(data => {
                console.log(data);
            })
        }
    }
    
}



   async function remove_formfield(el) {
      const id = el.target.dataset['unique_id'];
      const url = `${process.env.payment}/estate/delete-estate/${id}/`
      delete_xrh_data(url)
  }

  async function  passwordUnlocker(el) {
    let passwordChecker = el.target.value;
    if (passwordChecker == '12345') {
        setpasswordUnlocker(true)
    }else {
        setpasswordUnlocker(false)
    }
    
  }

  return (
    <div>


    <div className='container' hidden={(qy.status === 'unavailable') || (qy.status === 'sold')? true:false}>
        <div className='mb-3 mt-4 col-md-12'>
            <h3>Payment Confirmation</h3>
        </div>
        <form
        onSubmit={_update_form}
        method='POST' 
        action={`${process.env.main}/payment/update-payment/${filtered? filtered.id : 0}/`}>
        <div className='row'>
            <div className='col-md-4'>
                <Status name='status' label='Choose Status' id='status' />
            </div>

            <div className='col-md-4'>
                <label>Total Amount</label>
                <input type={'text'} readOnly className='form-control form-control-sm' 
                name='total_amount' defaultValue={filtered? filtered.total_amount: 0} />
            </div>

            <div className='col-md-4'>
                <label>Receiver</label>
                <input type={'text'} readOnly className='form-control form-control-sm' 
                name='receiver' defaultValue={filtered? filtered.receiver: ''} />
            </div>

        </div>

        <div className='mt-3 col-md-12'>
        <button className='btn btn-sm btn-primary' type='submit'>Confirm</button>
        </div>
        </form>
    </div>






    {/* untoggle the payment */}


    <div className='container' hidden={(qy.status === 'unavailable') || (qy.status === 'sold')? false:true}>
        <div className='mb-3 mt-4 col-md-12'>
            <h3>Unlock Reserved Mode</h3>
        </div>

        <div className='col-lg-12 mb-4'>
            <label>Password Manager</label>
            <input 
            type={'text'} 
            onKeyUp={passwordUnlocker}
            className='form-control form-control-sm'
            placeholder='Provide password to onlock this section'
              />
        </div>

        <form
        hidden={passwordunlocker === true ? false : true}
        onSubmit={_update_form2}
        method='POST' 
        action={`${process.env.main}/payment/update-payment/${filtered? filtered.id : 0}/`}>
        <div className='row'>
            <div className='col-md-6'>
                <Status2 name='status' label='Choose Status' id='status' />
            </div>

        
            <div className='col-md-6'>
                <label>Receiver</label>
                <input type={'text'} readOnly className='form-control form-control-sm' 
                name='receiver' defaultValue={filtered? filtered.receiver: ''} />
            </div>

        </div>

        <div className='mt-3 col-md-12'>
        <button className='btn btn-sm btn-primary' type='submit'>Confirm</button>
        </div>
        </form>
    </div>



    </div>
  )
}
