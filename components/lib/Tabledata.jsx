import { delete_xrh_data, get_xrh_data, queryBuilder, _iframe_func } from 'functions'
import React, {useEffect, useRef, useState} from 'react'
import { Button, Button2, Button3 } from './Buttons';
import * as icons from "react-icons/bs";




export const Tabledata = ({
    thead=[], 
    tbody=[], 
    current_param='', pages=[],
    show_button=true,
    remove_xrh_data="",
    reload_fun_content="",
    fontsize='12px'
}) => {
    const counter = 1;
    const [query, setQuery] = useState([])
    
    useEffect(() => {
        queryBuilder(tbody).then(data => { setQuery(data); })
    }, [tbody])

async function remove_default(el) {
    alert(`
    No Function Attached!
    Please include one...
    `);
}


  return (
    <div>
        <div className='mb-3'>
            <button id='contentreload'  onClick={reload_fun_content || remove_default}>Reload</button>
        </div>
        <div className='row table-responsive'>
        <table className='table table-sm' style={{fontSize:fontsize, maxHeight:'300px', overflow:'scroll'}}>
            <thead>
                <tr>
                    <td>#</td>
                    {thead.map((data, i) => {
                        const head =  data.field !== undefined? `${data.field}`.split('_').join(' ') : `${data}`.split('_').join(' ');
                        
                        return (
                            <td key={`id_asdfe_${i}`}>
                                {`${head}`.toLocaleUpperCase() || `${data}`.toLocaleUpperCase()}
                            </td>
                        )
                    })}
                    <td>...</td>
            
                </tr>
            </thead>

            <tbody className='tabledata'>
                {tbody.map((data2, i) => {
                    return (
                        <tr key={`id_data_${i}`}>
                        <td>{counter + i}</td>
                        {thead.map((data3, i) => {
                            const head = data3.field !== undefined ? `${data3.field}`.split(' ').join('_') : 
                                                    `${data3}`.split(' ').join('_');
                            return (
                                <td key={`id_343dsd_${i}`}>
                                    {data2[head]}
                                </td>
                            )
                        })}
                        
                        <td>
                        {show_button?
                            <Button 
                            query={data2} 
                            pages={pages}
                            current_param={current_param}
                            /> : ''
                        }

                        <button
                            onClick={remove_xrh_data || remove_default}
                            data-unique_id={data2.id}
                            className='btn btn-sm btn-danger'>
                                Remove
                            </button>
                        </td>
                      
                    </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    </div>
  )
}




export const Table2 = ({
    thead=[], 
    tbody=[], 
    fontsize='12px'
}) => {

  return (
    <div className='row'>
        <table className='table table-sm' style={{fontSize:fontsize}}>
            <thead>
                <tr>
                    {thead.map((data, i) => {
                        const head =  `${data}`.split('_').join(' ');
                        
                        return (
                            <td key={`id_asddswe34fe_${i}`}>
                                {`${head}`.toLocaleUpperCase()}
                            </td>
                        )
                    })}
                    <td>...</td> 
                </tr>
            </thead>

            <tbody>
                {tbody.map((data2, i) => {
                    return (
                        <tr key={`id_datadswe_${i}`}>
                        {thead.map((data3, i) => {
                            const head =  `${data3}`.split(' ').join('_');
                            
                            return (
                                <td key={`id_5343ds45dfdds4545we_${i}`}>
                                    {data2[head]}
                                </td>
                            )
                        })}
                        <td>
                            
                           <Button2 key={`id_dasfda_${i}`}  querydata={data2}  />
                        </td>
                    </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}





export const Table3 = ({
    thead=[], 
    tbody=[],
    buttons={},
    href='',
    remove_delete_fun='',
    fontsize='12px',
    reload_fun_content=''
}) => {

    async function remove_default(el) {
        alert(`
        No Function Attached!
        Please include one...
        `);
    }


  return (
        <div>
            <div className='mb-3'>
            <button id='contentreload'  onClick={reload_fun_content || remove_default}>Reload</button>
        </div>
        <div className='table-responsive'>
        <table className='table table-sm' style={{fontSize:fontsize}}>
            <thead>
                <tr>
                    {thead.map((data, i) => {
                        const head =  `${data}`.split('_').join(' ');
                        return (
                            <td key={`id_asddswe34fe_${i}`}>
                                {`${head}`.toLocaleUpperCase()}
                            </td>
                        )
                    })}
                    <td>...</td>
                </tr>
            </thead>
            <tbody>
                {tbody.map((data2, i) => {
                    return (
                        <tr key={`id_datadswe_${i}`}>
                        {thead.map((data3, i) => {
                            const head =  `${data3}`.split(' ').join('_');
                            return (
                                <td key={`id_5343ds45dfdds4545we_${i}`}>
                                    {data2[head]}
                                </td>
                            )
                        })}
                        <td>
                        <Button3
                            key={`id_dasfda_${i}`}  
                            querydata={data2}  
                            buttons={buttons}
                            href={href}
                            status={data2.status}
                            remove_delete_fun={remove_delete_fun}
                        />
                        
                        </td>
                      
                    </tr>
                    )
                })}
            </tbody>
        </table>
        </div>
        </div>
  )
}