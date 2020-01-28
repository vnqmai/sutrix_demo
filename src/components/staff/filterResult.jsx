import React from 'react';
import { connect } from 'react-redux';
import FilterResultDetails from './filterResultDetails';

class FilterResultComponent extends React.Component{
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
                                <FilterResultDetails key={index} staff={st} history={this.props.history} location={this.props.location}></FilterResultDetails>
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