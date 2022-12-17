import React from 'react'

export const Status = ({name=''}) => {
  return (
    <div className='col-md-12'>
        <select name={name} className="form-control form-control-sm">
            <option defaultChecked='true' disabled>Choose</option>
            <option value={'pending'}>Pending</option>
            <option value={'available'}>available</option>
            <option value={'reserved'}>reserved</option>
            <option value={'sold'}>sold</option>
        </select>
    </div>
  )
}
