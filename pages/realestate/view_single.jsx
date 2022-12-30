import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { get_xrh_data } from 'functions';
import { Tabledata } from 'components/lib/Tabledata';
import { Modal } from 'components/lib/Modal';


const View_single = () => {
  const router = useRouter();
  const qy = router.query
  const [content, setContent] = useState({})
  const [key, setContentKey] = useState([])
  useEffect(() => {
    setContent(qy);
    setContentKey(Object.keys(qy))
  }, [qy])

  return (
    <div className='col-md-12 mt-4'>
    <h3>View</h3>
        <div className="row mt-4">
        {key.map((data, i) => {

          return(
            <div key={`id_adsfasd_${i}`} className="col-sm-4">
            <span className='ml-4'>
              {`${data}`.toUpperCase()}
            </span>
            <span>:</span>
            <span className='ml-4'>
              {content[data]}
            </span>
          </div>
          )

        })}
        
        </div>

    </div>
    
  )
}

export default View_single