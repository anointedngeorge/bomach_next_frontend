import { delete_xrh_data, get_xrh_data, queryBuilder, _iframe_func } from 'functions'
import React, {useEffect, useState} from 'react'



export const Button = ({query, pages=[], current_param=''}) => {
    const [get_query, setQuery ] = useState({});
    useEffect(() => {
      queryBuilder(query).then(data => setQuery(data) );
    }, [query])
    
    return (
        <>
            {pages.map((data, i) => {
                {/* const d = {pagename:'',title:'',modalclass:''} */}
                return data.show_modal == true? (
                    <td key={`id_asdas343403434_${i}`}>
                        <a 
                        className={`${data.classname} ${data.modalclassid}`}
                        href={`/${data.pagename}/${get_query}`}
                        data-container={`${data.modalclassid}`}
                        onClick={_iframe_func}
                        >{data.title}</a>
                    </td>
                ) : (
                        <td key={`id_asdas34340_${i}`}>
                        <a
                        data-toggle="modal"
                        data-target=".bd-example-modal-lg"
                        className={`${data.classname} ${data.modalclassid}`}
                        href={`/${data.pagename}/${get_query}`}
                        data-container={`${data.modalclassid}`}
                        onClick={_iframe_func}
                        >{data.title}</a>
                        </td>
                    )
            })} 
            
        </>
    )
}




export const Tabledata = ({
    thead=[], 
    tbody=[], 
    current_param='', pages=[],
    show_button=true,
    remove_xrh_data=""
}) => {
    const counter = 1;
    const [query, setQuery] = useState([])
    useEffect(() => {
        queryBuilder(tbody).then(data => { setQuery(data); })
    }, [])


    async function remove_default(el) {

    }

  return (
    <div className='row table-responsive'>
        <table className='table table-sm'>
            <thead>
                <tr>
                    <td>#</td>
                    {thead.map((data, i) => {
                        const head =  `${data.field}`.split('_').join(' ');
                        
                        return (
                            <td key={`id_asdfe_${i}`}>
                                {`${head}`.toLocaleUpperCase()}
                            </td>
                        )
                    })}
                    <td>...</td>
                    <td>...</td> 
                </tr>
            </thead>

            <tbody>
                {tbody.map((data2, i) => {
                    
                    return (
                        <tr key={`id_data_${i}`}>
                        <td>{counter + i}</td>
                        {thead.map((data3, i) => {
                            const head =  `${data3.field}`.split(' ').join('_');
                            return (
                                <td key={`id_343dsd_${i}`}>
                                    {data2[head]}
                                </td>
                            )
                        })}
                        
                        {show_button?
                            <Button 
                            query={data2} 
                            pages={pages}
                            current_param={current_param}
                            /> : ''
                        }

                        <td>
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
  )
}





export const Button2 = ({querydata}) => {
    const [query, setQuery] = useState([])
    useEffect(() => {queryBuilder(querydata).then((data) => { 
            setQuery(data); })
    }, [])
    return (
        <>
            <a  href={`/${query}`}>Delete</a>
        </>
    )

 }


 export const Button3 = ({querydata, buttons={}, href=''}) => {
    const [query, setQuery] = useState([])
    const [content, setContent] = useState([])
    // const url = `${href}/${querydata.id}`;
   
   
    useEffect(() => { queryBuilder(querydata).then((data) => { 
            setQuery(data);
        })
        // get_xrh_data(url, false).then(data => {
        //     setContent(data.data)
        // })
    }, [])
  
    
    return (
        <div>
            <a  href={`/${query}`}>Delete </a>
        </div>
    )

 }




export const Table2 = ({
    thead=[], 
    tbody=[], 
}) => {

  return (
    <div className='row'>
        <table className='table table-sm'>
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
    href=''
}) => {
  return (
    <div className='row'>
        <table className='table table-sm'>
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
                        />
                        </td>
                      
                    </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}