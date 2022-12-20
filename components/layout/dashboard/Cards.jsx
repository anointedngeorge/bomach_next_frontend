import { get_xrh_data } from 'functions'
import React, { useEffect, useState } from 'react'

export const Cards = () => {
  const [content, setContent] = useState([])

  useEffect( () => {
    const url = `${process.env.main}/general/get-count`
    get_xrh_data(url, false).then(data => {
      setContent(data.data);
    })
  }, [] )


  return (
    <div className="row">
         
            <div className="col-xl-3 col-md-6">
              <div className="card bg-primary text-white mb-4">
                <div className="card-body">Estate Section</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <a className="small text-white stretched-link" href="#">View Details</a>
                  <div className="small text-white"><i className="fas fa-angle-right" />
                    <h4 >
                    {content['estate']? content['estate']['total'] : ''}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-warning text-white mb-4">
                <div className="card-body">Total Payments</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <a className="small text-white stretched-link" href="#">View Details</a>
                  <div className="small text-white"><i className="fas fa-angle-right" />
                    <h4>
                    {content['payment']? content['payment']['total'] : ''}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-success text-white mb-4">
                <div className="card-body">Customer</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <a className="small text-white stretched-link" href="#">View Details</a>
                  <div className="small text-white"><i className="fas fa-angle-right" />
                    <h4>
                    {content['customer']? content['customer']['total'] : ''}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-danger text-white mb-4">
                <div className="card-body">Employee</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <a className="small text-white stretched-link" href="#">View Details</a>
                  <div className="small text-white"><i className="fas fa-angle-right" />
                    <h4>
                    {content['employee']? content['employee']['total'] : ''}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
           
            
    </div>
  )
}
