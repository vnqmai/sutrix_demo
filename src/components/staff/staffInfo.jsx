import React from 'react';
import { StaffHistories } from './staffHistories';

export default class StaffInfoComponent extends React.Component{    
    constructor(){
        super();

    }

    render(){
        const staff = this.props.location.state;
        console.log(staff);
        return(
            <div className="container content">
                <div className="row profile">
                    <div className="col-lg-6 col-md-6 col-lg-12">
                        <table className="info-table">
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
                        </table>
                    </div>
                    <div className="col-lg-6 col-md-6 col-lg-12 staff-picture">
                        <div className="staff-image">
                            <img src="/images/staff.png" alt="" className="img"/>
                        </div>
                    </div>
                </div>

                <StaffHistories staffId={staff._id}></StaffHistories>

                <div className="row write-note">
                    <form>
                        <table className="form-table">
                            <tr>
                                <td><textarea name="note" id="note" rows="3" placeholder="Write a note"></textarea></td>
                            </tr>
                            <tr>
                                <td className="center"><input type="submit" value="Add" className="btn-orange"/></td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
        );
    }
}
