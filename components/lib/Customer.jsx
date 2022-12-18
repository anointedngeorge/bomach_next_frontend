import { get_xrh_data } from 'functions'
import React, { useEffect, useState } from 'react'

export const Customer = ({name='', label='', on_change_fun=''}) => {
    const [content, setContent] = useState([])

    useEffect( () => {
        const url = `${process.env.customer}/customer/get-customer/`
        get_xrh_data(url, false).then(data => {
            setContent(data.data)
        })
    }, [] )


    async function default_fun(params) {
        
    }

  return (
    <div>
        <label>{label}</label>
        <select required onChange={on_change_fun || default_fun} name={name} className="form-control form-control-sm" >
        <option defaultValue={true} >Choose</option>
            {content.map( (data, i) => {
                return (
                    <option key={`id_asf334434_${i}`} value={`${data.id}`} > 
                        {data.first_name} {data.last_name}
                    </option>
                )
            } )}
        </select>
    </div>
  )
}
