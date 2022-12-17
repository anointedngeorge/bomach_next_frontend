import React from 'react'

export const Navbar = ({navbar=[], navbar_title}) => {
  return (
    <div>

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">{navbar_title}</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
        </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
               {navbar.map( (data, i) => {
                    return (
                        <li className="nav-item" key={`id_dafda_${i}`}>
                            <a href={data.href} className="nav-link" >
                                {data.title}
                            </a>
                        </li>
                    )
               })}
            </ul>
        </div>
        </nav>


    </div>
  )
}
