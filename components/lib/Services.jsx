import { SERVICES } from 'navigation'
import React from 'react'


export const Services = ({
    title='Choose Available Service',
    name='form_service',
    on_change_fun = ""
}) => {


    async function default_fun(params) {
        // 
    }

  return (
    <div>
        <label>
            {title}
        </label>
        <select onChange={on_change_fun || default_fun} name={name} 
        className='form-control form-control-sm'>
        <option defaultValue={true}>Choose</option>
            {SERVICES.map((data, i) => {
                return (
                    <option key={`id_ssa33434_${i}`} value={`${data.id}`}>
                        {data.name}
                    </option>
                )
            })}
        </select>
    </div>
  )
}
