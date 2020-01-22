import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export class FilterResultDetails extends React.Component {    
    moveToStaffInfo = () => {
        this.props.history.push('/staff/info',this.props.staff);
    }

    render(){        
        const staff = this.props.staff;        
        return(            
            <tr onClick={this.moveToStaffInfo}>
                <td>{staff.lastName + ' ' + staff.firstName}</td>
                <td>{staff.birthday}</td>
                <td>{staff.skype}</td>
                <td>{staff.email}</td>
                <td>{staff.department}</td>
            </tr>
        );
    }
}