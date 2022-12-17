import axios from 'axios';
import React, {useState, useEffect} from 'react'
// let csc = require('countries-states-cities')
import csc from 'countries-states-cities'

// /home/eit/SHARASHELL/bomach/node_modules/countries-states-cities-service


export const CountryStates = ({country_name='', country_title='', state_name='', state_title=''}) => {
    const [stateContent, setStateContent] = useState([]);
    let allCountries = csc.getAllCountries();

    function countryWithState(cl){
        let code_id = cl.target.value;
        const filter_country = [...allCountries.filter(data => data.id == code_id )]
        let st = csc.getStatesOfCountry(parseInt(code_id));
        setStateContent(st);
        if(document) {
            document.getElementById('country_name').value = filter_country[0].name;
        }
    }


  return (
    <div className='row'>

        <div className='col-lg-6'>
        <label>{country_title}</label>
            <select className='form-control form-control-sm'  name={country_name} onChange={countryWithState}>
                <option disabled defaultValue='Choose'>Choose Country</option>
                {allCountries.map((data, i) => {
                    return (<option value={data.id} key={parseInt(i) * 200}>{data.name} {data.emoji}</option>
                    )
                })}
            </select>
            <input hidden id='country_name' name='country_name' />
        </div>
        {/*  */}

        <div className='col-lg-6'>
        <label>{state_title}</label>
            <select className='form-control form-control-sm' name={state_name}>
                <option disabled defaultValue='Choose'>Choose State</option>
                {stateContent.map((data, i) => {
                    return (<option value={`${data.name}`} key={parseInt(i) * 500}>{data.name}</option>
                    )
                })}
            </select>
        </div>
    </div>
  )
}
