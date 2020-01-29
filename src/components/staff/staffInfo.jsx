import React from 'react';
import StaffHistories from './staffHistories';
import { configEnv } from '../../config/env';

export default class StaffInfoComponent extends React.Component{    
    constructor(){
        super();

    }

    render(){
        const staff = this.props.location.state;
                
        return(
            <div className="container content">
                <div className="row profile">
                    <div className="col-lg-6 col-md-6 col-lg-12">
                        <table className="info-table">
                            <tbody>
                                <tr>
                                    <td>First Name:</td>
                                    <td>{staff.firstName}</td>
                                </tr>
                                <tr>
                                    <td>Last Name:</td>
                                    <td>{staff.lastName}</td>
                                </tr>
                                <tr>
                                    <td>Date of birth:</td>
                                    <td>{staff.birthDate}</td>
                                </tr>
                                <tr>
                                    <td>Gender:</td>
                                    <td>{staff.gender}</td>
                                </tr>
                                <tr>
                                    <td>Address:</td>
                                    <td>{staff.address}</td>
                                </tr>
                                <tr>
                                    <td>ID:</td>
                                    <td>{staff._id}</td>
                                </tr>
                                <tr>
                                    <td>Mobile:</td>
                                    <td>{staff.mobile}</td>
                                </tr>
                                <tr>
                                    <td>Skype:</td>
                                    <td>{staff.skype}</td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>{staff.email}</td>
                                </tr>
                                <tr>
                                    <td>Join Date:</td>
                                    <td>{staff.joinDate}</td>
                                </tr>
                                <tr>
                                    <td>Department:</td>
                                    <td>{staff.department}</td>
                                </tr>                            
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-6 col-md-6 col-lg-12 staff-picture">
                        <div className="staff-image">
                            <img src={staff.image?staff.image:`${configEnv[configEnv.env].host}/assets/images/staff.png`} alt="" className="img"/>
                        </div>
                    </div>
                </div>

                <StaffHistories staffId={staff._id}></StaffHistories>
                
            </div>
        );
    }
}
