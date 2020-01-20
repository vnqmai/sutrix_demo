import React from 'react';
import { connect } from 'react-redux';

class FilterResultComponent extends React.Component{
    render(){
        console.log("data",this.props.staff);
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
                                <tr key={index}>
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
        staff: state.filter.staff
    }
}

export default connect(mapStateToProps)(FilterResultComponent);