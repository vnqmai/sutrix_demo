import React from 'react';
import { Link } from 'react-router-dom';

export class NavbarComponent extends React.Component{
    constructor(){
        super();
    }

    componentDidMount(){
        console.log('path: ',this.props.path);
    }
    render(){
        return(                        
            <nav className="navbar navbar-default" role="navigation">            
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" id="back">
                        <img src="/images/back.png" alt="<" id="back"/>
                    </button>

                    <div className="dropdown">
                        <button type="button" className="navbar-toggle dropdown-toggle show" data-toggle="dropdown" data-target="dropdown-menu">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>                    
                        <div className="dropdown-menu dropdown-menu-right">
                            <ul>
                                <li>
                                    <ul>
                                        <li><b>Welcome <span>Admin</span></b></li>
                                        <li><Link to='/logout' id="logoutDropdown">Logout</Link></li>
                                    </ul>
                                </li>
                                <hr/>
                                <li>
                                    <ul>
                                        <li><Link to='/dashboard' className="active">Dashboard</Link></li>
                                        <li><Link to='/staff'>Staff</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
            
                    </div>
                    <h1 className="navbar-brand">SUTRIX HRM</h1>
                </div>

            </nav>       
        );
    }
}