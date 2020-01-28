import React from 'react';
import { connect } from 'react-redux';
import { getStaffInfo } from '../../actions/staff';

class FilterResultDetails extends React.Component {    
    moveToStaffInfo = () => {
        this.props.getStaffInfo(this.props.staff);
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

const mapDispatchToProps = dispatch => {
    return{
        getStaffInfo: (data) => {
            dispatch(getStaffInfo(data));
        }
    }
}

export default connect(null,mapDispatchToProps)(FilterResultDetails);