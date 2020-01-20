import React from 'react';

export class FilterComponent extends React.Component{
    render(){
        return(
            <div className="container content">
                <div className="filter">
                    <form>
                        <table className="form-table">
                            <tr>
                                <td>Full Name:</td>
                                <td><input type="text"/></td>
                            </tr>
                            <tr>
                                <td>Department:</td>
                                <td>
                                    <select name="" id="">
                                        <option value="default">-- Choose department --</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <input type="submit" className="btn-orange" value="Apply"/>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
        );
    }
}