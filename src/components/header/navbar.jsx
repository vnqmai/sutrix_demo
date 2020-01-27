import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, logout } from '../../actions/auth';

class NavbarComponent extends React.Component{
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
                        {
                            this.props.token?
                            <div className="dropdown-menu dropdown-menu-right">
                                <ul>
                                    <li>
                                        <ul>
                                            <li><b>Welcome <span>{this.props.username}</span></b></li>
                                            <li><a id="logoutDropdown" onClick={this.props.logout}>Logout</a></li>
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