import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, logout } from '../../actions/auth';

class NavbarComponent extends React.Component{
    constructor(){
        super();        
    }

    render(){        
        return(                        
            <nav className="navbar navbar-default" role="navigation">            
                <div className="navbar-header">
                    <button type="button" className={this.props.history.location.pathname!=='/'?'navbar-toggle show':'navbar-toggle'} id="back" onClick={this.props.history.goBack}>
                        <img src="/images/back.png" alt="<" id="back"/>
                    </button>

                    <div className="dropdown">
                        <button type="button" className="navbar-toggle dropdown-toggle show" data-toggle="dropdown" data-target="dropdown-menu">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>                    
                        {
                            this.props.token?
                            <div className="dropdown-menu dropdown-menu-right">
                                <ul>
                                    <li>
                                        <ul>
                                            <li><b>Welcome <span>{this.props.username}</span></b></li>
                                            <li><Link to='/' id="logoutDropdown" onClick={this.props.logout}>Logout</Link></li>
                                        </ul>
                                    </li>
                                    <hr/>
                                    <li>
                                        <ul>
                                            <li><Link to='/dashboard' className={window.location.pathname==='/dashboard'?'active':''}>Dashboard</Link></li>
                                            <li><Link to='/staff/filter'className={window.location.pathname==='/staff/filter'?'active':''}>Staff</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            :''
                        }
            
                    </div>
                    <h1 className="navbar-brand">SUTRIX HRM</h1>
                </div>

            </nav>       
        );
    }
}

const mapStateToProps = state => {
    return {        
        userId: state.auth.userId,
        username: state.auth.username,
        token: state.auth.token,
        expires: state.auth.expires
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(logout())
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(NavbarComponent);