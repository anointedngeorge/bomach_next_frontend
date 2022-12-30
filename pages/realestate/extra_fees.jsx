import React from 'react'
import { useRouter } from 'next/router';
import { settings_form, update_xhr_data, _settingFormWithConfirmationPrompt } from 'functions';


export default function Extrafees(){
    const router = useRouter();
    const qy = router.query


  return (
    <div className='col-md-12 mt-4'>
        <h3>
        Estate ID: {qy.id}
        </h3>

        <form
        action={`${process.env.realestate}/estate/register-fee/${qy.id}`}
        onSubmit={update_xhr_data}
        method="POST"
        >
            <div className='form-group'>
                <label>Legal fee</label>
                <input className='form-control form-control-sm' 
                placeholder='Legal fee' type={'number'} name='legal_fee' />
            </div>

            <div className='form-group'>
                <label>Survey Plan</label>
                <input className='form-control form-control-sm' placeholder='Survey Plan' 
                type={'number'} name='survey_plan' />
            </div>

            <div className='form-group'>
                <label>Development fee</label>
                <input className='form-control form-control-sm' placeholder='Development fee' 
                type={'number'} name='development_fee' />
            </div>

            <div className='form-group'>
                <input 
                type={'submit'} 
                value={`Add Extra Fees for ${qy.id}`} 
                className='btn btn-lg btn-warning btn-block shadow' />
            </div>
        </form>
    </div>
  )
}
