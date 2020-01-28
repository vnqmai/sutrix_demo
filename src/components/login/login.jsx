import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { login, logout } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

class LoginComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            user: {
                username: null,
                password: null
            },
            isSuccess: false,
            errorMessage: null
        }
        this.handleInputsChange = this.handleInputsChange.bind(this);
    }

    handleInputsChange = e =>{
        let formData = Object.assign({}, this.state.user);
        formData[e.target.name] = e.target.value;
        this.setState({
            user: formData            
        })
    }

    checkLoginInfo = (user) => {        
        axios.post('https://sutrix-be.herokuapp.com/login',user).then(res=>{
            if(res.data.data){
                if(res.data.data.token){                    
                    this.props.login(res.data.data.userId, res.data.data.username,res.data.data.token, res.data.data.expires);                                        
                    this.props.history.push('/staff/filter');
                }                                 
            }            
            this.setState({
                isSuccess: res.data.isSuccess,
                errorMessage: res.data.errorMessage
            })               
        })
    }

    render(){        
        return(
            <div className="container content">
                <div className="login">            
                    <form>
                        <table className="form-table">
                            <tr>
                                <td>Username:</td>
                                <td><input type="text" name="username" onChange={this.handleInputsChange} value={this.state.user.username}/></td>
                            </tr>
                            <tr>
                                <td>Password:</td>
                                <td><input type="password" name="password" onChange={this.handleInputsChange} value={this.state.user.password}/></td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <input type="button" className="btn-orange" value="Login" onClick={()=>this.checkLoginInfo(this.state.user)}/>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    {!this.isSuccess && this.state.errorMessage}
                                </td>
                            </tr>
                        </table>
                    </form>            
                </div>
            </div>            
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
        login: (userId, username,token, expires) => {
            dispatch(login(userId, username,token, expires));
        },
        logout: () => {
            dispatch(logout())
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginComponent);