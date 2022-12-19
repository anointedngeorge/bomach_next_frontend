import { NAVIGATION } from 'navigation'
import React, {useState, useEffect} from 'react'
import keyIndex from 'react-key-index';

export const Sidebar = ({user={}}) => {
    const [navigation, setNavigation] = useState([])
   

  return (
    <div id="layoutSidenav_nav">
      <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
          <div className="nav">
            {/* <div className="sb-sidenav-menu-heading">Core</div> */}

            {NAVIGATION.map((data, i) => {
                return data.has_dropdown? (
                    <div key={`id_sdsd_${i}`}>
                         {/* <div className="sb-sidenav-menu-heading">Interface</div> */}
                        <a 
                        className="nav-link collapsed" href="#" data-bs-toggle="collapse" 
                        data-bs-target={`#${data.id}`} aria-expanded="false" 
                        aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon">
                        <i className="fas fa-columns" /></div>
                        {data.name} 
                        <div className="sb-sidenav-collapse-arrow">
                        <i className="fas fa-angle-down" /></div>
                        </a>
                        <div className="collapse" id={`${data.id}`} aria-labelledby="headingOne" 
                        data-bs-parent="#sidenavAccordion">
                        <nav   className="sb-sidenav-menu-nested nav">
                            {data.sub.map((d, i) => {
                                return (
                                    <div key={`id_dsdwe3434344343_${i}`}>
                                    <a className="nav-link" href={d.href}>
                                    {d.name} </a>
                                    </div>
                                )
                            })}
                        </nav>
                        </div>
                    </div>
                ) : (
                    <div key={`id_weasgsfdhse3434_{i}`}>
                        <a className="nav-link" href={data.href}>
                            <div className="sb-nav-link-icon">
                            <i className="fas fa-tachometer-alt" /></div>
                            {data.name} 
                        </a>
                   </div>
                    
                )
            })}
           
          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">Logged in as:</div>
          <p  className='text text-info'>
            {user.first_name} {user.last_name}
          </p>
          <p className='text text-warning'>
          {user.email} <br />
          {user.phone_number}
          
          </p>
        </div>
      </nav>
    </div>
  )
}
