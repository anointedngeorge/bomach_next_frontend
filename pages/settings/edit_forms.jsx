import { Services } from 'components/lib/Services';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FORMTYPE,ELEMENTFUNCTION, CALCULATORFUNCTION } from 'navigation';
import { authentication_token, get_xrh_data, settings_form,delete_xrh_data, update_xhr_data } from 'functions';



export default function Edit_forms(props) {
    const router = useRouter();
    const qy = router.query;

    const [TargetValue, setTargetValue] = useState('')
    const [elemtitle, setTitle] = useState('')
    const [formfield, setFormField] = useState([])
    const [formfield2, setFormField2] = useState(props.form)

  
   async function title_to_name(el) {
        const name_title = `${el.target.value}`.split(' ').join('_');
        document.getElementById('id_name').value = name_title;
        setTitle(`id_${name_title}`)
   }

  async function getServiceRelatedFields(el) {
        const url = `${process.env.main}/formfield/get-formfield/${el.target.value}`;
        await get_xrh_data(url, 
        false).then(data => {
            setFormField(data.data);  
        });
  }
   
  async function remove_formfield(el) {
    const id = el.target.dataset['unique_id'];
    const url = `${process.env.main}/form/delete-form/${id}`
    delete_xrh_data(url)
}


async function contentReloader(params) {
    await get_xrh_data(`${process.env.main}/form/get-form/`, 
        false).then(data => {
            // console.log(data.data);
            setFormField2(data.data);  
        }).catch(err => {
            JSAlert.alert(JSON.stringify(err))
        });
}


async function checkTargetSelect(params) {
    const target_id =  params.target.value;
    setTargetValue(target_id);
}

  return (
    <div className="container-fluid px-4 mb-4" id='modal_container'>
      <h1 className="mt-4">{'Edit Form with ID'}</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active text text-primary">({qy.form_service}) - ({qy.title}) - {qy.id}</li>
      </ol>
      
        <form
        action={`${process.env.main}/form/update-form/${qy.id}`} 
        onSubmit={update_xhr_data} 
        method='POST'>

            <div className='row'>
                <div className='col-md-4'>
                    <Services 
                        name='form_service' 
                        title='Choose Service'
                        on_change_fun={getServiceRelatedFields}
                    />
                </div>

                <div className='col-md-4'>
                    <label>Title</label>
                    {/* formfield */}
                    <select 
                    onChange={title_to_name} 
                    name='title' 
                    className='form-control form-control-sm'>
                    <option defaultValue={true}>Choose</option>
                    {formfield.map((data, i) => {
                        return (
                            <option key={`id_sasddswe_${i}`} value={data.field}>{`${data.field}`.toUpperCase()}</option>
                        )
                    })}
                       
                    </select>
                </div>

                <div className='col-md-4'>
                    <label>Form Type</label>
                    <select  
                    name='form_type' 
                    className='form-control form-control-sm'>
                    <option defaultValue={true} disabled>Choose</option>
                    {FORMTYPE.map((data, i) => {
                        return (
                            <option key={`id_sasd_${i}`} value={data}>{`${data}`.toUpperCase()}</option>
                        )
                    })}
                    </select>
                </div>

                

            </div>

            <div className='row'>
                <div className='col-md-6'>
                    <label>Classname</label>
                    <input type={'text'} 
                    placeholder='classname'
                    defaultValue={'col-md-4'}
                    name='classname' className='form-control form-control-sm' />
                </div>
                
                <div className='col-md-3'>
                    <label>Standalone</label>
                    <select name='standalone' className='form-control form-control-sm'>
                    <option defaultValue={true} disabled>Choose</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>

                <div className='col-md-3'>
                    <label>name</label>
                    <input type={'text'} 
                    name='name' readOnly className='form-control form-control-sm'  id='id_name' />
                </div>
            </div>
            
            <div className='row'>
                <div className='col-md-4'>
                    <label>Is Required</label>
                    <select name='is_required' className='form-control form-control-sm'>
                        <option defaultValue={true} disabled>Choose</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>

                <div className='col-md-4'>
                    <label>Is Disabled</label>
                    <select  
                    name='is_disabled' 
                    className='form-control form-control-sm'>
                        <option defaultValue={true} disabled>Choose</option> 
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>

                <div className='col-md-2'>
                    <label>Index</label>
                    <input type={'number'} 
                    defaultValue={0}
                    name='index' className='form-control form-control-sm' />
                </div>

                <div className='col-md-2'>
                    <label>form element</label>
                    <select  
                    name='form_element' 
                    className='form-control form-control-sm'>
                        <option defaultValue={true} disabled>Choose</option>
                        <option value='input'>Input</option>
                        <option value='testarea'>Testarea</option>
                    </select>
                </div>

            </div>

            <div className='row'>
                <div className='col-md-12 mt-4'>
                <hr />
                    <i>
                        This section deals with the different function types to implenment.
                        You can implement a <br />
                        <b>
                        a. percentage function: eg 5/100 * n1 <br />
                        b. summation function: eg n1 * n2 = n3 <br />
                        c. division function: eg n1 / n2 = n3 <br />
                        </b>
                        
                        **** ------------------------target--------------------- *** <br />
                        target represent the second input field to get value from. <br />

                        **** ----------------------function target value----------------------- *** <br />
                        function target value represents the input field to update its value value from. <br />
                    </i>
                </div>
            </div>

            <div className='row mt-4'>
            <hr />
            {/* function_target_value */}
            <div className='col-md-4'>
                    <label>Target (html element ID)</label>
                    <select
                    onChange={checkTargetSelect}
                    name='function'
                    className='form-control form-control-sm'>
                    <option defaultValue={true}>Choose</option>
                    {formfield.map((data, i) => {
                        return (
                            elemtitle !== `id_${data.field}`.replace(" ", '_') ? <option key={`id_sa34red_${i}`} 
                            value={`id_${data.field}`.replace(" ", '_')}>
                            {`${data.field}`.toUpperCase()}  </option>: ''
                        )
                    })}
                    </select>
                </div>
                <div className='col-md-4'>
                    <label>Function Type</label>
                    <select 
                    name='function_name'
                    className='form-control form-control-sm'>
                    <option defaultValue={true} disabled>Choose</option>
                    {CALCULATORFUNCTION.map((data, i) => {
                        return (
                            <option key={`id_sasddswe_${i}`} value={data}>{`${data}`.toUpperCase()}</option>
                        )
                    })}
                    </select>
                </div>
                
                <div className='col-md-4'>
            
                    <label>function target value</label>
                    <select 
                    name='function_target_value'
                    className='form-control form-control-sm'>
                    <option defaultValue={true} disabled>Choose</option>
                    {formfield.map((data, i) => {
                        return (
                            (TargetValue !== `id_${data.field}`.replace(" ", '_')) 
                            && 
                            (elemtitle !== `id_${data.field}`.replace(" ", '_')) ? 
                            <option key={`id_s34909904534_${i}`} 
                            value={`id_${data.field}`.replace(" ", '_')}>
                            {`${data.field}`.toUpperCase()}</option> : ''
                        )
                    })}
                    </select>
                </div>

            </div>

            {/* submit button */}
            <div className='mt-4'>
            <button type='submit' className='btn btn-primary btn-sm btn-block'>Submit</button>
            </div>
        </form>
    
                
        <div id='loader' style={{marginTop:'20px'}}></div>

        <div className='mt-4'>
        
        
        </div>
    </div>
  )
}



export async function getServerSideProps({params, query, req, res }) {
    const user_token = req.cookies.user_token;
    const user_status = req.cookies.user_status;
    const url = `${process.env.auth}/login/get_user`
    const user = await authentication_token(url, user_token);
  
    // fetching realestate
    const res1 = await fetch(`${process.env.main}/form/get-form/`);
    const data = await res1.json();
  
    return {
      props: {
        user: user,
        user_status:user.status,
        form:data,
      },
    };
  }