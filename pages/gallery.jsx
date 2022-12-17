import React from 'react'
import { useRouter } from 'next/router';


export default function gallery() {

    const router = useRouter();
    const qy = router.query
    

  return (
    <div className='container'>
        <div className='col-lg-12 mt-4'>
        <form 
        action={`${process.env.main}/gallery/register-gallery`}
        method='POST'
        encType='multipart/form-data'
        >
            <div className='form-group'>
                <label>Choose File</label>
                <input 
                    required
                    type={'text'}  
                    className="form-control form-control-sm" 
                    name='name'
                    defaultValue={qy.id}
                    readOnly
                />
            </div>


            <div className='form-group '>
                <label>Choose File</label>
                <input
                    required
                    type={'file'} 
                    className="form-control form-control-sm" 
                    name='file'
                />
            </div>

            <div className='form-group '>
                <button type='submit' className='btn btn-sm btn-secondary'>
                    Create
                </button>
            </div>
        </form>
    </div>
    </div>
  )
}
