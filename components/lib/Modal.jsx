import React from 'react'

export const Modal = () => {
  return (
    <>
    {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Large modal</button> */}
    <div className="modal fade bd-example-modal-lg" tabIndex={-1} role="dialog" 
    aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
            <div className="modal-content" id='modal_container'>
                ...
            </div>
        </div>
    </div>
</>
  )
}
