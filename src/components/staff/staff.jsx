import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addNewStaff, updateStaff } from '../../actions/staff';

class Staff extends React.Component{
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
                    id: null,
                    mobile: '',
                    skype: '',
                    email: '',
                    joinDate: '',
                    department: '',
                    image: {}
                }            
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputFileChange = this.handleInputFileChange.bind(this);
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
        this.setState({
            newStaff: this.props.currentStaff
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
        console.log('newstaff', this.state.newStaff);
    }

    addNewStaff = () => {
        const newStaff = this.state.newStaff;
        const fd = new FormData();
        for ( var key in  newStaff) {
            if(key==='image')
                break;
            fd.append(key, newStaff[key]);
        }
        fd.append('image', this.state.newStaff.image, this.state.newStaff.image.name);
                
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        axios.post('http://localhost:3001/staff', fd, config).then(res=>{
            this.props.addNewStaff(true);
            this.setState({
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
            });
        });
    }

    updateStaff = () => {
        const newStaff = this.state.newStaff;
        const fd = new FormData();
        for ( var key in  newStaff) {
            if(key==='image')
                break;
            fd.append(key, newStaff[key]);
        }
        fd.append('image', this.state.newStaff.image, this.state.newStaff.image.name);
                
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        axios.put('http://localhost:3001/staff', fd, config).then(res=>{
            this.props.updateStaff(true);            
        })
    }

    inputFileClick = () => {
        document.getElementById('image').click();
            
    }

    render(){        
        return(
            <div class="container content">
                <div class="col-lg-8 col-md-8 col-lg-12">                    
                        <table class="form-table">
                            <tr>
                                <td>First Name:</td>
                                <td>
                                    <input type="text" name="firstName" onChange={this.handleInputChange}
                                    value={this.state.newStaff?this.state.newStaff.firstName:''}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Last Name:</td>
                                <td>
                                    <input type="text" name="lastName" onChange={this.handleInputChange}
                                    value={this.state.newStaff?this.state.newStaff.lastName:''}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Date of birth:</td>
                                <td>
                                    <input type="text" name="birthDate" onChange={this.handleInputChange}
                                    value={this.state.newStaff?this.state.newStaff.birthDate:''}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Gender:</td>
                                {this.props.type==='edit'?
                                <td>
                                    <input type="radio" name="gender" value={true} onChange={this.handleInputChange} 
                                    checked={this.state.newStaff.gender?true:false}/> Male
                                    <input type="radio" name="gender" value={false} onChange={this.handleInputChange}
                                    checked={this.state.newStaff.gender?false:true}/> Female
                                </td>:''}
                                {this.props.type==='add'?
                                <td>
                                    <input type="radio" name="gender" value={true} onChange={this.handleInputChange} 
                                    checked/> Male
                                    <input type="radio" name="gender" value={false} onChange={this.handleInputChange}
                                    /> Female
                                </td>:''}
                            </tr>
                            <tr>
                                <td>Address:</td>
                                <td>
                                    <input type="text" name="address" onChange={this.handleInputChange}
                                    value={this.state.newStaff?this.state.newStaff.address:''}/>
                                </td>
                            </tr>
                            <tr>
                                <td>ID:</td>
                                <td>
                                    <input type="text" name="id" onChange={this.handleInputChange}
                                    value={this.state.newStaff?this.state.newStaff.ID:''}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Mobile:</td>
                                <td>
                                    <input type="text" name="mobile" onChange={this.handleInputChange}
                                    value={this.state.newStaff?this.state.newStaff.mobile:''}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Skype:</td>
                                <td>
                                    <input type="text" name="skype" onChange={this.handleInputChange}
                                    value={this.state.newStaff?this.state.newStaff.skype:''}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>
                                    <input type="text" name="email" onChange={this.handleInputChange}
                                    value={this.state.newStaff?this.state.newStaff.email:''}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Join Date:</td>
                                <td>
                                    <input type="text" name="joinDate" onChange={this.handleInputChange}
                                    value={this.state.newStaff?this.state.newStaff.joinDate:''}/>
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
                                <td colspan="2" class="right">
                                    {
                                        this.props.type==='add'?
                                        <input type="button" value={'Add'} class="btn-orange" onClick={this.addNewStaff}/>:''                                                                            
                                    }                                    
                                    {
                                        this.props.type==='edit'?
                                        <input type="button" value={'Edit'} class="btn-orange" onClick={this.updateStaff}/>:''
                                    }

                                    {/* <input type="button" value={'Add'} class="btn-orange" onClick={this.addNewStaff}/>:
                                    <input type="button" value={'Edit'} class="btn-orange" onClick={this.updateStaff}/> */}
                                </td>
                            </tr>       
                            <tr>
                                    <td>{this.props.addSuccess?"Add Success":""}</td>
                                    <td>{this.props.updateSuccess?"Update Success":""}</td>
                            </tr>                     
                        </table>                    
                </div>
                <div class="col-lg-4 col-md-4 col-lg-12 staff-picture">
                    <div class="staff-image">
                        <img src={this.state.newStaff?this.state.newStaff.image:'/images/picture.png'} alt="" class="img" id="staffPhoto"/>
                        <div class="description">
                            <img src='/images/picture.png' alt="" onClick={()=>this.inputFileClick()} for="image"/> Choose image format available JPG, PNG, GIF copy
                            <input type="file" name="image" id="image" style={{"display": "none"}} onChange={this.handleInputFileChange}/>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        addSuccess: state.staff.addSuccess,
        updateSuccess: state.staff.updateSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNewStaff: addSuccess =>{
            dispatch(addNewStaff(addSuccess));            
        },
        updateStaff: updateSuccess => {
            dispatch(updateStaff(updateSuccess));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Staff);