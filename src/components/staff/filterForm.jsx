import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {applyFilter} from '../../actions/filter';
import axios from 'axios';

class FilterFormComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            departments: [],
            fullname: "",
            department: ""
        }
        // this.applyFilter = this.applyFilter.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:3001/department').then(res=>{
            this.setState({
                departments: res.data
            })
        })
    }

    // applyFilter = (fname, dpment) => {
    //     this.props.filterApply(fname, dpment);
    // }

    doApplyFilter = () => {
        axios.post('http://localhost:3001/staff/filter', { fullname: this.state.fullname, department: this.state.department })
            .then(res => {
                this.props.applyFilter(res.data);
            })                
    }

    render(){
        return(            
                <div className="filter">
                    
                        <table className="form-table">
                            <tr>
                                <td>Full Name:</td>
                                <td><input type="text" name="fullname" onChange={evt=>{this.setState({fullname: evt.target.value}); console.log("fullname:",this.state.fullname)}}/></td>
                            </tr>
                            <tr>
                                <td>Department:</td>
                                <td>
                                    <select name="department" id="department" onChange={evt=>{this.setState({department: evt.target.value});console.log("department:",this.state.department)}}>
                                        <option value="default">-- Choose department --</option>
                                        {this.state.departments.map((department, index)=>{
                                            return <option value={department.departmentName} key={index}>{department.departmentName}</option>
                                        })}                                        
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <Link className="btn-orange" to="/staff/result" onClick={this.doApplyFilter()}> Apply</Link>
                                    {/* onClick={this.applyFilter(this.state.fullname,this.state.department)} */}
                                </td>
                            </tr>
                        </table>                    
                </div>            
        );
    }
}

const mapStateToProps = state => {
    return{
        staff: state.filter.staff
    }
}

const mapDistpatchToProps = dispatch => {
    return {
        applyFilter: (fullname, department) => {
            dispatch(applyFilter(fullname,department));
        }        
    }
}

export default connect(mapStateToProps, mapDistpatchToProps)(FilterFormComponent);