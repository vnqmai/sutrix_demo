import React from 'react';
import axios from 'axios';

export class LoginComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            user: {
                username: '',
                password: ''
            },
            loginResult:{
                isSuccess: false,
                errorMessage: ''
            }
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
        console.log("user",user);
        axios.post('http://localhost:3001/login',user).then(res=>{
            this.setState({
                loginResult: res.data
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
                                <td><input type="text" name="username" onChange={this.handleInputsChange}/></td>
                            </tr>
                            <tr>
                                <td>Password:</td>
                                <td><input type="password" name="password" onChange={this.handleInputsChange}/></td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <input type="button" className="btn-orange" value="Login" onClick={()=>this.checkLoginInfo(this.state.user)}/>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    {this.state.loginResult?(this.state.loginResult.isSuccess?'Success': this.state.loginResult.errorMessage):''}
                                </td>
                            </tr>
                        </table>
                    </form>            
                </div>
            </div>            
        );
    }
}