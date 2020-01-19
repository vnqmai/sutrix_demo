import React from 'react';

export class LoginComponent extends React.Component{
    render(){
        return(
            <div className="container content">
                <div className="login">            
                    <form>
                        <table className="form-table">
                            <tr>
                                <td>Username:</td>
                                <td><input type="text"/></td>
                            </tr>
                            <tr>
                                <td>Password:</td>
                                <td><input type="password"/></td>
                            </tr>
                            <tr>
                                <td colspan="2"><input type="submit" className="btn-orange" value="Login"/></td>
                            </tr>
                        </table>
                    </form>            
                </div>
            </div>            
        );
    }
}