import { AppScript } from 'components/lib/AppScript'
import Script from 'next/script'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { delete_xrh_data, get_xrh_data } from 'functions';
import { Table3, Tabledata } from 'components/lib/Tabledata';
import { Modal } from 'components/lib/Modal';
import { Layout1 } from 'components/layout/Layout1';
import { AppHead } from 'components/lib/AppHead';
import downloadCsv from 'download-csv';





export default function View(){
    const router = useRouter();
    const qy = router.query
    const [columnsK, setColumns] = useState([])
    const [datak, setDatak] = useState([])
    const k_colume = {}
    // in your project, like this
    useEffect( () => {
        setColumns(Object.keys(qy));
        setDatak(Object(qy))
    }, [qy] )

    function JSONIFIED(key, value) {
        this.key = key;
        this.value = value
    }

    async function download_csv_file() {
        const datas = [
            { name: 'test1', score: 1},
    
          ];
           
        const columns = columnsK;
        // downloadCsv(datas, columns, 'data.csv');
          console.log(columns);
     
        
        // console.log(columns);
    }

    

  return (
    <div className='container'>

       <div className='table-responsive'>
        <div style={{marginTop:100+'px'}}>
            <div className='mt-4 mb-4'>
                <h3 className='text text-center'>Generate Payment CSV {qy.estate_title || qy.name}</h3>
            </div>
            <button className='btn btn-lg btn-primary btn-block' onClick={download_csv_file}>
                Generate CSV
            </button>
        </div>
       </div>
    </div>
  )
}
