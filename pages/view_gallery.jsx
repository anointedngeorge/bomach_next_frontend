import { AppScript } from 'components/lib/AppScript'
import Script from 'next/script'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { delete_xrh_data, get_xrh_data } from 'functions';
import { Tabledata } from 'components/lib/Tabledata';
import { Modal } from 'components/lib/Modal';
import { Layout1 } from 'components/layout/Layout1';
import { AppHead } from 'components/lib/AppHead';






export default function View(){
    const router = useRouter();
    const qy = router.query
    const [content, setContent] = useState([])


    
   useEffect(() => {
        get_xrh_data(`${process.env.main}/gallery/get-gallery/`, false).then(data => {
            setContent(data.data);  
        });

   }, [qy])

   const gallery = [...content.filter(data => data.name === qy.id)];

 

   async function remove_formfield(el) {
      const id = el.target.dataset['unique_id'];
      const url = `${process.env.realestate}/estate/delete-estate/${id}/`
      delete_xrh_data(url)
      
  }

  return (
    <div className='container'>

       <div className='table-responsive'>
       <table className='table '>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>filesize</td>
                    <td>file</td>
                </tr>
            </thead>

            <tbody>
            {gallery.map( (data, i) => {
                return (
                    <tr key={`id_asdfsadfw33434s_${i}`}>
                        <td>{data.filename}</td>
                        <td>{data.filesize} mb</td>
                        <td>{data.name}</td>
                    </tr>
                )

            } )}
            </tbody>
        </table>
       </div>
    </div>
  )
}
