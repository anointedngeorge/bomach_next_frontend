import React, {useEffect, useReducer, useState} from 'react'
import { delete_xrh_data, get_xrh_data, queryBuilder, _iframe_func } from 'functions'
import * as icons from "react-icons/bs";



export const IconData = ({icon='', fontSize='12px'}) => {
    const Iconx = icons[icon || 'BsFillCaretLeftFill']
    return (
        <Iconx fontSize={fontSize} />
    )
}

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
                    <td key={`id_asdas34340_${i}`}>
                        <a
                        data-toggle="modal"
                        data-target=".bd-example-modal-lg"
                        className={`${data.classname} ${data.modalclassid}`}
                        href={`/${data.pagename}/${get_query}`}
                        data-container={`${data.modalclassid}`}
                        onClick={_iframe_func}
                        >
                        <span className='mr-1'>
                        <IconData icon={data.icon} fontSize={data.iconsize} />
                        </span>
                        <span>
                        {data.title}
                        </span>
                        </a>
                        </td>
                ) : (
                    <td key={`id_asdas343403434_${i}`}>
                        <a 
                        className={`${data.classname} ${data.modalclassid}`}
                        href={`/${data.pagename}/${get_query}`}
                        data-container={`${data.modalclassid}`}
                        onClick={_iframe_func}
                        >
                        <span className='mr-1'>
                        <IconData icon={data.icon} fontSize={data.iconsize} />
                        </span>
                        <span>
                        {data.title}
                        </span>
                        </a>
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
    }, [querydata])
    return (
        <>
            <a  href={`/${query}`}>Delete</a>
        </>
    )

 }



 export const Button3 = ({
    querydata, 
    buttons={}, 
    href='', 
    status='',
    remove_delete_fun=''
    }) => {
    const [query, setQuery] = useState([])
    const [content, setContent] = useState([])
    const [selectBtn, setSelectedBtn] = useState([]) 
    // const url = `${href}/${querydata.id}`;
    
    useEffect(() => { queryBuilder(querydata).then((data) => { 
            setQuery(data);
        })
      
        setSelectedBtn(buttons[status])
    }, [querydata, status, buttons])


    async function remove_formfield(el) {
        const id = el.target.dataset['unique_id'];
        const url = `${process.env.realestate}/estate/plot/delete-estate-plot/${id}/`
        // alert(url)
        delete_xrh_data(url)
    }
  
    
    return (
        <div>
            {selectBtn? selectBtn.map( (data, i) => {

                return(
                    <a  
                        title={data.tooltip}
                        data-obj={JSON.stringify(querydata)}
                        key={`id_dsa34r34423454_${i}`}
                        className={`${data.classname} buttonx`}
                        href={`${data.href}/${query}`}> 
                        <span className='mr-1'>
                        <IconData icon={data.icon} fontSize={data.iconsize} />
                        </span>
                        <span>
                        {data.name}
                        </span>
                    </a>
                )

            }) : []}
            <button onClick={remove_delete_fun || remove_formfield} className='btn btn-sm btn-danger buttonx' data-unique_id={querydata.id}>Delete </button>
        </div>
    )

 }