import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { addBackToFilterResult } from '../../actions/back';
import { configEnv } from '../../config/env';
import StaffHistories from './staffHistories';

class StaffInfoComponent extends React.Component{    
    constructor(){
        super();
    }

    componentDidMount(){
        this.props.addBackToFilterResult();
    }

    render(){
        const staff = this.props.staffInfo;                
        
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
                                    <td>
                                        <Moment format="DD-MM-YYYY">
                                            {staff.birthDate}
                                        </Moment>
                                    </td>                                    
                                </tr>
                                <tr>
                                    <td>Gender:</td>
                                    <td>{staff.gender?'Male':'Female'}</td>
                                </tr>
                                <tr>
                                    <td>Address:</td>
                                    <td>{staff.address}</td>
                                </tr>
                                <tr>
                                    <td>ID:</td>
                                    <td>{staff.id}</td>
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
                                    <td>
                                        <Moment format="DD-MM-YYYY">
                                            {staff.joinDate}
                                        </Moment>                                    
                                    </td>                                    
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
                            <img src={staff.image?staff.image:`${configEnv[configEnv.env].host}/assets/images/alt_picture.png`} alt="" className="img"/>
                        </div>
                    </div>
                </div>

                <StaffHistories staffId={staff._id}></StaffHistories>
                
            </div>
        );
    }
}


const mapStateToProps = state => {
    return{        
        staffInfo: state.staff.staffInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {        
        addBackToFilterResult: () => {
            dispatch(addBackToFilterResult());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffInfoComponent);