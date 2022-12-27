import axios from 'axios'
import { get_xrh_data } from 'functions'
import React, {useState, useEffect} from 'react'


export const Branch = ({data=[], on_change_fun='', div_class_name='col-lg-12', required=true, name_attr='branch_id', label_title='Choose Branch'}) => {
    const [branch, setBranch] = useState(data)


    async function default_fun(params) {
        
    }

  return (
    
        <div className={div_class_name}>
            <lable>
                <b>{label_title}</b>
            </lable>
            <select onChange={on_change_fun || default_fun} name={name_attr} className='form-control form-control-sm' required={required}>
                <option defaultValue={true} disabled>Choose</option>
                {branch.map(data => {
                    return (<option key={data.id} value={data.id}>{data.name}</option> )
                })}
            </select>
        </div>
  )
}
