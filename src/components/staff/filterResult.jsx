import React from 'react';
import { connect } from 'react-redux';
import FilterResultDetails from './filterResultDetails';
import { getStaffInfo } from '../../actions/staff';
import { addBackToFilterResult } from '../../actions/back';

class FilterResultComponent extends React.Component{

    constructor(){
        super();
        this.moveToStaffInfo = this.moveToStaffInfo.bind(this);
    }
    
    moveToStaffInfo = (staffInfo) => {
        this.props.getStaffInfo(staffInfo);
        this.props.addBackToFilterResult();
        this.props.history.push('/staff/info');            
    }

    render(){
        return(            
                <table className="table table-hover table-result">
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Join Date</th>
                            <th>Skype</th>
                            <th>Email</th>
                            <th>Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.staff.map((st, index)=>{
                            return(                                                                                                                                                         
                                <tr  key={index} onClick={(staff)=>this.moveToStaffInfo(st)}>
                                    <td>{st.lastName + ' ' + st.firstName}</td>
                                    <td>{st.birthday}</td>
                                    <td>{st.skype}</td>
                                    <td>{st.email}</td>
                                    <td>{st.department}</td>
                                </tr>
                            );                            
                        })}                                                
                    </tbody>
                </table>

        );
    }    
}

const mapStateToProps = state => {
    return{
        staff: state.filter.staff,
        staffInfo: state.staff.staffInfo
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getStaffInfo: (data) => {
            dispatch(getStaffInfo(data));
        },
        addBackToFilterResult: () => {
            dispatch(addBackToFilterResult());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterResultComponent);