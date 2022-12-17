import React, {useEffect, useState} from 'react'
import { delete_xrh_data, get_xrh_data, queryBuilder, _iframe_func } from 'functions'

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



 export const Button3 = ({querydata, buttons={}, href='', status=''}) => {
    const [query, setQuery] = useState([])
    const [content, setContent] = useState([])
    const [selectBtn, setSelectedBtn] = useState([])
    // const url = `${href}/${querydata.id}`;
    
    useEffect(() => { queryBuilder(querydata).then((data) => { 
            setQuery(data);
        })
      
        setSelectedBtn(buttons[status])
    }, [])
  
    
    return (
        <div>
            {selectBtn.map( (data, i) => {

                return(
                    <a  
                        data-obj={JSON.stringify(querydata)}
                        key={`id_dsa344423454_${i}`}
                        className={`${data.classname}`}
                        href={`${data.href}/${query}`}> 
                        {data.name}
                    </a>
                )

            })}
            <a className='btn btn-sm btn-danger' href={`/${query}`}>Delete </a>
        </div>
    )

 }