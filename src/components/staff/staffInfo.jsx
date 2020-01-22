import React from 'react';
import { connect } from 'react-redux';
import { axios } from 'axios';

class StaffInfoComponent extends React.Component{    
    constructor(){
        super();
        this.state = {
            histories: []
        }         
    }

    componentDidMount() {        
        axios.get("http://localhost:3001/staffHistory/5e2834c3fe643132d41f8120").then(res => {
            this.setState({
                histories: res.data
            })
        })
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

                <div className="row history">
                    <div className="col-lg-12">
                        <h4>History:</h4>
                    </div>

                    {this.state.histories.map((history, index)=>{
                        return(
                            <div className="col-lg-12" key={index}>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">
                                            <b>{history.historyDate}</b>
                                            <button type="button" className="close">x</button>
                                        </h3>
                                    </div>
                                    <div className="panel-body">
                                        {history.historyActivity}
                                    </div>
                                </div>
                            </div>
                        );

                    })}

                </div>

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

const mapStateToProps = state => {
    return {
        staff: state.staff.staffInfo
    }
}

export default connect(mapStateToProps)(StaffInfoComponent);