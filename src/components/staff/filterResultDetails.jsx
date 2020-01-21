import React from 'react';
import { Redirect } from 'react-router-dom';

export class FilterResultDetails extends React.Component {
    render(){
        const staff = this.props.staff;
        return(
            <tr>
                <td>{staff.lastName + ' ' + staff.firstName}</td>
                <td>{staff.birthday}</td>
                <td>{staff.skype}</td>
                <td>{staff.email}</td>
                <td>{staff.department}</td>
            </tr>
        );
    }
}