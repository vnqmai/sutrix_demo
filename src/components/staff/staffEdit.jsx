import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import validator from 'validator';
import { getStaffInfo } from '../../actions/staff';
import { applyFilter } from '../../actions/filter';
import { addBackToFilterResult } from '../../actions/back';
import { configEnv } from '../../config/env';

class StaffEdit extends React.Component{
    constructor(){
        super();
        this.state = {
            departments: [],
            newStaff: {
                    _id: '',
                    firstName: '',
                    lastName: '',
                    birthDate: '',
                    gender: '',
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
        
        this.setState({
            newStaff: this.props.staffInfo
        })
    }    

    handleInputChange(e) {
        let formData = Object.assign({}, this.state.newStaff);
        formData[e.target.name] = e.target.value;        
        this.setState({newStaff: formData});        
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

        if(validator.isEmpty(this.state.newStaff.birthDate)){
            error['birthDate'] = 'The date of birth field is required.';
            isValid = false;
        }

        if(validator.toDate(this.state.newStaff.birthDate)===null){
            error['birthDate'] = 'The date of birth field is not a valid date.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.newStaff.address)){
            error['address'] = 'The address field is required.';
            isValid = false;
        }

        // if(validator.isEmpty(this.state.newStaff.id)){
        //     error['id'] = 'The id field is required.';
        //     isValid = false;
        // }

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

        if(validator.isEmpty(this.state.newStaff.joinDate)){
            error['joinDate'] = 'The join date field is required.';
            isValid = false;
        }

        if(validator.toDate(this.state.newStaff.joinDate)===null){
            error['joinDate'] = 'The join date field is not a valid date.';
            isValid = false;
        }

        this.setState({
            error: error
        })

        return isValid;
    }

    updateStaff = () => {
        if(this.validateFormData()){
            const newStaff = this.state.newStaff;
            const fd = new FormData();
            for ( var key in  newStaff) {
                if(key==='image')
                    break;
                fd.append(key, newStaff[key]);
            }
                    
            if(this.state.newStaff.image!==this.props.staffInfo.image)
                fd.append('image', this.state.newStaff.image, this.state.newStaff.image.name);
                    
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${this.props.token}`
                }
            };
    
            axios.put(`${configEnv[configEnv.env].host}/staff`, fd, config).then(res=>{
                // update state.staff.staffInfo
                this.props.getStaffInfo(res.data);       
    
            }).then(res=>{
    
                // update state.filter.staff
                const staffFilter = this.props.staffFilterResult;
                for(var i = 0;i<staffFilter.length; ++i){                
                    if(staffFilter[i]._id===this.state.newStaff._id){
                        staffFilter[i] = this.state.newStaff;
                    }
                }            
                this.props.applyFilter(staffFilter);
                
            }).then(res=>{
                this.props.addBackToFilterResult();
            }).then(res=>{
                this.props.history.goBack();   
            })
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
                                        <input type="text" name="firstName" onChange={this.handleInputChange}
                                        value={this.state.newStaff?this.state.newStaff.firstName:''}/>
                                        {this.state.error.firstName && <div className="validation">{this.state.error.firstName}</div>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Last Name:</td>
                                    <td>
                                        <input type="text" name="lastName" onChange={this.handleInputChange}
                                        value={this.state.newStaff?this.state.newStaff.lastName:''}/>
                                        {this.state.error.lastName && <div className="validation">{this.state.error.lastName}</div>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Date of birth:</td>
                                    <td>
                                        <input type="text" name="birthDate" onChange={this.handleInputChange}
                                        value={this.state.newStaff?this.state.newStaff.birthDate:''}/>
                                        {this.state.error.birthDate && <div className="validation">{this.state.error.birthDate}</div>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Gender:</td>
                                    <td>
                                        <input type="radio" name="gender" value={true} onChange={this.handleInputChange} 
                                        checked={this.state.newStaff.gender?true:false}/> Male
                                        <input type="radio" name="gender" value={false} onChange={this.handleInputChange}
                                        checked={this.state.newStaff.gender?false:true}/> Female
                                    </td>
                                </tr>
                                <tr>
                                    <td>Address:</td>
                                    <td>
                                        <input type="text" name="address" onChange={this.handleInputChange}
                                        value={this.state.newStaff?this.state.newStaff.address:''}/>
                                        {this.state.error.address && <div className="validation">{this.state.error.address}</div>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>ID:</td>
                                    <td>
                                        <input type="text" name="id" onChange={this.handleInputChange}
                                        value={this.state.newStaff?this.state.newStaff.id:''}/>
                                        {this.state.error.id && <div className="validation">{this.state.error.id}</div>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Mobile:</td>
                                    <td>
                                        <input type="text" name="mobile" onChange={this.handleInputChange}
                                        value={this.state.newStaff?this.state.newStaff.mobile:''}/>
                                        {this.state.error.mobile && <div className="validation">{this.state.error.mobile}</div>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Skype:</td>
                                    <td>
                                        <input type="text" name="skype" onChange={this.handleInputChange}
                                        value={this.state.newStaff?this.state.newStaff.skype:''}/>
                                        {this.state.error.skype && <div className="validation">{this.state.error.skype}</div>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>
                                        <input type="text" name="email" onChange={this.handleInputChange}
                                        value={this.state.newStaff?this.state.newStaff.email:''}/>
                                        {this.state.error.email && <div className="validation">{this.state.error.email}</div>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Join Date:</td>
                                    <td>
                                        <input type="text" name="joinDate" onChange={this.handleInputChange}
                                        value={this.state.newStaff?this.state.newStaff.joinDate:''}/>
                                        {this.state.error.joinDate && <div className="validation">{this.state.error.joinDate}</div>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Department:</td>
                                    <td>
                                        <select name="department" id="department" onChange={this.handleInputChange}
                                        value={this.state.newStaff?this.state.newStaff.department:''}>
                                            <option value="">-- Choose department --</option>
                                            {this.state.departments.map((department, index)=>{
                                            return <option value={department.departmentName} key={index}>{department.departmentName}</option>
                                            })}                                        
                                        </select>
                                    </td>
                                </tr>                            
                                <tr>
                                    <td colSpan="2" className="right">
                                        <input type="button" value={'Edit'} className="btn-orange" onClick={this.updateStaff}/>
                                    </td>
                                </tr>                                                      
                            </tbody>
                        </table>                    
                </div>
                <div className="col-lg-4 col-md-4 col-lg-12 staff-picture">
                    <div className="staff-image">
                        <img src={this.props.staffInfo.image?this.props.staffInfo.image:`${configEnv[configEnv.env].host}/assets/images/alt_picture.png`} alt="" className="img" id="staffPhoto"/>
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
        staffFilterResult: state.filter.staff,
        staffInfo: state.staff.staffInfo,        
        token: state.auth.token,        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getStaffInfo: staffInfo => {
            dispatch(getStaffInfo(staffInfo));
        },
        applyFilter: data => {
            dispatch(applyFilter(data));
        },
        addBackToFilterResult: () => {
            dispatch(addBackToFilterResult());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffEdit);