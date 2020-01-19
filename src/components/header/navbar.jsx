import React from 'react';

export class NavbarComponent extends React.Component{
    render(){
        return(                        
            <nav className="navbar navbar-default" role="navigation">            
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle show" id="back">
                        <img src="images/back.png" alt="<" id="back"/>
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
                                        <li><a href="" id="logoutDropdown">Logout</a></li>
                                    </ul>
                                </li>
                                <hr/>
                                <li>
                                    <ul>
                                        <li><a href="" className="active">Dashboard</a></li>
                                        <li><a href="">Staff</a></li>
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