import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Branch } from './Branch';
import { CountryStates } from './CountryStates';
// import { FormCodes } from './FormCodes';
var JSAlert = require("js-alert");
// const shortid = require('shortid');


export const DynamicFormData = ({
    submit_btn_title='Submit',
    show_branch=true, dynamicForms=[], 
    show_country=true,
    country_name='country',
    state_name = 'state',
    country_title='choose country',
    state_title='choose state'
}) => {
    // checks for the forms length
    const [check_form_len, setCheckformLen] = useState([0])
    let counter = 40;
    
  return (
    <div className='container'>
        <div className='row'>
            {/* <div className='col-lg-6'>
                ....
            </div> */}
            {show_branch? 
                <Branch div_class_name='col-lg-12' label_title='Branch' />
            : ''
            }
        </div>
        
        <div className='mt-4'>
        {show_country? <CountryStates country_name={country_name} state_name={state_name} 
                country_title={country_title} state_title={state_title} /> : ''}
        <div className='row'>
        {dynamicForms.map((data, i) => {
            const bool_value = (data.standalone === true)? true : false;
            const fm_name = data.title? data.title.split(" ").join("_").toLowerCase() : data.title.split(" ").join("_").toLowerCase();
           
            return bool_value? (
            <div className='col-sm-6' key={`id_dasdfasfsdadawe_${i}`}>
                <div className='form-group'>
                    <label>{data.title.toUpperCase()}</label>
                        <data.form_element 
                        type={data.form_type} name={data.name}
                        id={`id_${fm_name}`}
                        className={`form-control form-control-sm `}
                        placeholder={data.title}
                        required={data.is_required}
                        />
                      
                    </div>
            </div>
            ) : (
                <div className='col-sm-6' key={`id_asdfasdsa_${i}`}>
                    <div className='form-group'>
                    <label>{data.title.toUpperCase()}</label>
                        <data.form_element 
                        name={data.name}
                        id={`id_${fm_name}`}
                        className={`form-control form-control-sm ${fm_name}`}
                        placeholder={data.title}
                        >
                        </data.form_element>
                    </div>
                </div>
                )
            })}
        </div>
        <div className='mt-4 mb-4'>
            <button  type='submit' className='btn btn-sm btn-warning'>{submit_btn_title}</button>
        </div>
        </div>
    </div>
  )
}
