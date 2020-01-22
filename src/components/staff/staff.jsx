import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addNewStaff } from '../../actions/staff';

class Staff extends React.Component{
    constructor(){
        super();
        this.state = {
            departments: [],
            newStaff: {
                    firstName: '',
                    lastName: '',
                    birthDate: '',
                    gender: '',
                    address: '',
                    id: null,
                    mobile: '',
                    skype: '',
                    email: '',
                    joinDate: '',
                    department: ''
                }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    getDepartments = () => {
        axios.get('http://localhost:3001/department').then(res=>{
            this.setState({
                departments: res.data
            })
        });
    }

    componentDidMount(){
        this.getDepartments();
    }

    handleInputChange(e) {
        let formData = Object.assign({}, this.state.newStaff);
        formData[e.target.name] = e.target.value;
        console.log('inputs: ',formData);
        this.setState({newStaff: formData});
    }

    addNewStaff = (staff) => {
        axios.post('http://localhost:3001/staff', staff).then(res=>{
            return true;
        }).then(err=>{
            return false;
        });
    }

    render(){
        return(
            <div class="container content">
                <div class="col-lg-8 col-md-8 col-lg-12">                    
                        <table class="form-table">
                            <tr>
                                <td>First Name:</td>
                                <td><input type="text" name="firstName" onChange={this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td>Last Name:</td>
                                <td><input type="text" name="lastName" onChange={this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td>Date of birth:</td>
                                <td><input type="text" name="dateOfBirth" onChange={this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td>Gender:</td>
                                <td>
                                    <input type="radio" name="gender" value={true} onChange={this.handleInputChange}/> Male
                                    <input type="radio" name="gender" value={false} onChange={this.handleInputChange}/> Female
                                </td>
                            </tr>
                            <tr>
                                <td>Address:</td>
                                <td><input type="text" name="address" onChange={this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td>ID:</td>
                                <td><input type="text" name="id" onChange={this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td>Mobile:</td>
                                <td><input type="text" name="mobile" onChange={this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td>Skype:</td>
                                <td><input type="text" name="skype" onChange={this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td><input type="text" name="email" onChange={this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td>Join Date:</td>
                                <td><input type="text" name="joinDate" onChange={this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td>Department:</td>
                                <td>
                                    <select name="department" id="department" onChange={this.handleInputChange}>
                                        <option value="">-- Choose department --</option>
                                        {this.state.departments.map((department, index)=>{
                                        return <option value={department.departmentName} key={index}>{department.departmentName}</option>
                                        })}                                        
                                    </select>
                                </td>
                            </tr>                            
                            <tr>
                                <td colspan="2" class="right">
                                    <input type="submit" value={this.props.type==='edit'?'Edit':'Add'} class="btn-orange" 
                                    onClick={this.props.addNewStaff(this.addNewStaff(this.state.newStaff))}
                                    />
                                </td>
                            </tr>       
                            <tr>
                                    <td>{this.props.addSuccess?"Success":""}</td>
                            </tr>                     
                        </table>                    
                </div>
                <div class="col-lg-4 col-md-4 col-lg-12 staff-picture">
                    <div class="staff-image">
                        <img src="/images/alt_picture.png" alt="" class="img"/>
                        <div class="description">
                            <img src="/images/picture.png" alt="" class="icon"/> Choose image format available JPG, PNG, GIF copy
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        addSuccess: state.staff.addSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNewStaff: addSuccess =>{
            dispatch(addNewStaff(addSuccess));
        } 
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Staff);