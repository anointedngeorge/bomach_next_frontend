import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Script from 'next/script';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



export default function Editor (){
    
    const router = useRouter();
    const qy = router.query
    

  return (
    <div className='col-md-12 mt-4'>
        <h3>
        {qy.id}
        </h3>

        <form>
            <div className='form-group'>
                <label>Property Title</label>
                <select className='form-control form-control-sm' >
                    <option value={'deed_of_assignment'}>Deed Of Assignment</option>
                    <option value={'power_of_attorney'}>Power Of Attorney</option>
                    <option value={'registered_survery_plan'}>Registered Survey Plan</option>
                    <option value={'contract_of_sales'}>Contracts Of Sales (Offer Letter)</option>
                </select>
            </div>

            <div id="editor">
                <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
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
