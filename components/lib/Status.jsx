import React from 'react'

export const Status = ({name='', label='', on_change_fun='', id=''}) => {
  async function default_fun(params) { }
  return (
    <div className='col-md-12'>
        <label>{label}</label>
        <select name={name} onChange={on_change_fun || default_fun } id={id} className="form-control form-control-sm">
            <option defaultChecked='true' disabled>Choose</option>
            <option value={'pending'}>Pending</option>
            <option value={'available'}>Available</option>
            <option value={'sold'}>sold</option>
            <option value={'confirmed'}>Confirmed</option>
            <option value={'rejected'}>Rejected</option>
            
        </select>
    </div>
  )
}

export const Status2 = ({name='', label='', on_change_fun=''}) => {
    async function default_fun(params) { }
    return (
      <div className='col-md-12'>
          <label>{label}</label>
          <select name={name} onChange={on_change_fun || default_fun } className="form-control form-control-sm">
              <option defaultChecked='true' disabled>Choose</option>
              <option value={'pending'}>Pending</option>
              <option value={'rejected'}>Unlock</option>
          </select>
      </div>
    )
  }
