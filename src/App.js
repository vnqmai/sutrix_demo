import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

// import static files
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './public/css/style.css';

// import components
import NavbarComponent from './components/header/navbar';
import BreadcrumbsComponent from './components/header/breadcrumbs';
import LoginComponent from './components/login/login';
import FilterFormComponent from './components/staff/filterForm';
import FilterResultComponent from './components/staff/filterResult';
import StaffInfoComponent from './components/staff/staffInfo';
import StaffEdit from './components/staff/staffEdit';
import StaffAdd from './components/staff/staffAdd';
import Chart from './components/dashboard/chart';

class App extends React.Component {     
    render(){
        return (
            
                <Router>
                    <Route component={NavbarComponent}/>
                    <Route component={BreadcrumbsComponent}/>
                    <Switch>                                          
                        {!this.props.auth && <Route exact path='/' component={LoginComponent}/>}                        
                        {this.props.auth && <Route path='/staff/filter' component={FilterFormComponent}/>}
                        {this.props.auth && <Route path='/staff/result' component={FilterResultComponent}/>}
                        {this.props.auth && <Route path='/staff/info' component={StaffInfoComponent}/>}
                        {this.props.auth && <Route path='/staff/add' component={StaffAdd}/>}
                        {this.props.auth && <Route path='/staff/edit' component={StaffEdit}/>                        }
                        {this.props.auth && <Route path='/dashboard' component={Chart}/>                        }
                    </Switch>                    
                    {!this.props.auth && <Redirect to='/'/>}
                </Router>            
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth.token
    }
}

export default connect(mapStateToProps)(App);