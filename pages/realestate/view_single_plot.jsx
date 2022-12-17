import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { get_xrh_data } from 'functions';
import { Table2, Table3, Tabledata } from 'components/lib/Tabledata';
import { Modal } from 'components/lib/Modal';


const View_single = () => {
  const [content, setContent] = useState([])
  const [content2, setContent2] = useState([])
  const [formfield, setFormfield] = useState([])
  const [content3, setContent3] = useState([])

  const router = useRouter();
  const qy = router.query

  useEffect( () => {
        get_xrh_data(`${process.env.main}/formfield/get-formfield/realestate/`, false).then(data => {
          setFormfield(data.data);  
      });

      get_xrh_data(`${process.env.realestate}/estate/plot/get-estate-plot/`, false).then(data => {
          setContent2(data.data);  
      });
      const estate_id = qy.id;
      get_xrh_data(`${process.env.realestate}/estate/plot/get-plot-estate-id/${estate_id}/`, false).then(data => {
        setContent3(data.data);  
    });
      
  }, [qy] )

  
  return (
    
    <div className='col-lg-12'>
      <h2>View Estate plot</h2>
      <Table3 
      thead={['date_of_purchase']}
      tbody={content3}
      href={`${process.env.realestate}/estate/plot/get-plot-estate-id`}
      />
    </div>
    
  )
}

export default View_single