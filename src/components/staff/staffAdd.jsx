import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import validator from 'validator';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import { applyFilter } from '../../actions/filter';
import { resetStepAddBackToFilterResult } from '../../actions/back';
import { configEnv } from '../../config/env';

class StaffAdd extends React.Component{
    constructor(){
        super();
        this.state = {
            departments: [],
            newStaff: {
                    _id: '',
                    firstName: '',
                    lastName: '',
                    birthDate: '',
                    gender: 'true',
                    address: '',
                    id: '',
                    mobile: '',
                    skype: '',
                    email: '',
                    joinDate: '',
                    department: '',
                    image: {}
                },
            error: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputDateChange = this.handleInputDateChange.bind(this);        
        this.handleInputFileChange = this.handleInputFileChange.bind(this);
    }

    getDepartments = () => {
        const config = {headers: {Authorization: `Bearer ${this.props.token}`}};
        axios.get(`${configEnv[configEnv.env].host}/department`, config).then(res=>{
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
        this.setState({newStaff: formData});        
    }

    handleInputDateChange(name, date){        
        let formData = Object.assign({}, this.state.newStaff);        
        
        try{            
            formData[name] = date;
            this.setState({newStaff: formData});                    
        }
        catch(e){
            this.state.error[name] = "This is not a valid date.";
        }
    }

    handleInputFileChange(e){
        let formData = Object.assign({}, this.state.newStaff);        
        formData.image = e.target.files[0];
        this.setState({
            newStaff: formData
        })

        // load image from local to img src
        if (FileReader && formData.image) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('staffPhoto').src = fr.result;
            }
            fr.readAsDataURL(formData.image);
        }        
    }

    validateFormData = () => {
        let isValid = true;

        const error = {}
        if(validator.isEmpty(this.state.newStaff.firstName)){            
            error['firstName'] = 'The first name field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.newStaff.lastName)){
            error['lastName'] = 'The last name field is required.';
            isValid = false;
        }
        

        if(validator.isEmpty(this.state.newStaff.address)){
            error['address'] = 'The address field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.newStaff.id)){
            error['id'] = 'The id field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.newStaff.mobile)){
            error['mobile'] = 'The mobile field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.newStaff.skype)){
            error['skype'] = 'The skype field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.newStaff.email)){
            error['email'] = 'The email field is required.';
            isValid = false;
        }

        // if(validator.isEmail(this.state.newStaff.email)){
        //     error['email'] = 'The email field is not a valid email.';
        //     isValid = false;
        // }
        

        this.setState({
            error: error
        })

        return isValid;
    }

    addNewStaff = () => {
        if(this.validateFormData()){
            const newStaff = this.state.newStaff;
            const fd = new FormData();
            for ( var key in  newStaff) {
                if(key==='image')
                    break;
                fd.append(key, newStaff[key]);
            }
            if(this.state.newStaff.image==='')
                fd.append('image', this.state.newStaff.image, this.state.newStaff.image.name);
                    
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${this.props.token}`
                }
            };
    
            axios.post(`${configEnv[configEnv.env].host}/staff`, fd, config).then(res=>{            
                
                const config = {headers: {Authorization: `Bearer ${this.props.token}`}};
                axios.post(`${configEnv[configEnv.env].host}/staff/filter`,{fullname: "", department: ""}, config).then(res=>{
                    this.props.applyFilter(res.data);
                })
                    
    
                let nStep = this.props.nStep;
                if(nStep!==0){             
                    resetStepAddBackToFilterResult(); 
                    this.props.history.go(-nStep);
                }
                else
                    this.props.history.replace('/staff/result');
            });
        }
    }

    inputFileClick = () => {
        document.getElementById('image').click();            
    }

    render(){        
        return(
            <div className="container content">
                <div className="col-lg-8 col-md-8 col-lg-12">                    
                        <table className="form-table">
                            <tbody>
                                <tr>
                                    <td>First Name:</td>
                                    <td>
                                        <input type="text" name="firstName" onChange={this.handleInputChange}/>
                                        {this.state.error.firstName && <div className="validation">{this.state.error.firstName}</div>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Last Name:</td>
                                    <td>
                                        <input type="text" name="lastName" onChange={this.handleInputChange}/>
                                        {this.state.error.lastName && <div className="validation">{this.state.error.lastName}</div>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Date of birth:</td>
                                    <td>
                                        <DatePicker name="birthDate" dateFormat="dd-MM-yyyy" 
                                            selected={(this.state.newStaff&&moment(this.state.newStaff.birthDate))
                                                        ?this.state.newStaff.birthDate:new Date()} 
                                            showYearDropdown
                                            onChange={this.handleInputDateChange.bind(this, 'birthDate')}
                                            />                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td>Gender:</td>
                                    <td>
                                        <input type="radio" name="gender" value={true} onChange={this.handleInputChange} 
                                        checked={this.state.newStaff.gender==="true"}/> Male
                                        <input type="radio" name="gender" value={false} onChange={this.handleInputChange}
                                        checked={this.state.newStaff.gender==="false"}/> Female
                                    </td>
                                </tr>
                                <tr>
                                    <td>Address:</td>
                                    <td>
                                        <input type="text" name="address" onChange={this.handleInputChange}/>
                                        {this.state.error.address && <div className="validation">{this.state.error.address}</div>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>ID:</td>
                                    <td>
                                        <input type="text" name="id" onChange={this.handleInputChange}/>
                                        {this.state.error.id && <div className="validation">{this.state.error.id}</div>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Mobile:</td>
                                    <td>
                                        <input type="text" name="mobile" onChange={this.handleInputChange}/>
                                        {this.state.error.mobile && <div className="validation">{this.state.error.mobile}</div>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Skype:</td>
                                    <td>
                                        <input type="text" name="skype" onChange={this.handleInputChange}/>
                                        {this.state.error.skype && <div className="validation">{this.state.error.skype}</div>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>
                                        <input type="email" name="email" onChange={this.handleInputChange}/>
                                        {this.state.error.email && <div className="validation">{this.state.error.email}</div>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Join Date:</td>
                                    <td>
                                        <DatePicker name="joinDate" dateFormat="dd-MM-yyyy" 
                                            selected={(this.state.newStaff&&moment(this.state.newStaff.joinDate))
                                                        ?this.state.newStaff.joinDate:new Date()} 
                                            showYearDropdown
                                            onChange={this.handleInputDateChange.bind(this, 'joinDate')}
                                            />                                        
                                    </td>
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
                                    <td colSpan="2" className="right">
                                        <input type="button" value={'Add'} className="btn-orange" onClick={this.addNewStaff}/>                                    
                                    </td>
                                </tr>                                                      
                            </tbody>
                        </table>                    
                </div>
                <div className="col-lg-4 col-md-4 col-lg-12 staff-picture">
                    <div className="staff-image">
                        <img src={`${configEnv[configEnv.env].host}/assets/images/alt_picture.png`} alt="" className="img" id="staffPhoto"/>
                        <div className="description">
                            <img src='/images/picture.png' alt="" onClick={()=>this.inputFileClick()} htmlFor="image"/> Choose image format available JPG, PNG, GIF copy
                            <input type="file" name="image" id="image" style={{"display": "none"}} onChange={this.handleInputFileChange}/>
                            {this.state.error.image && <div className="validation">{this.state.error.image}</div>}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return{                       
        token: state.auth.token,     
        nStep: state.back.nStep_AddToFilterResult   
    }
}

const mapDispatchToProps = dispatch => {
    return {        
        applyFilter: data => {
            dispatch(applyFilter(data));
        },
        resetStepAddBackToFilterResult: () => {
            dispatch(resetStepAddBackToFilterResult());
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(StaffAdd);