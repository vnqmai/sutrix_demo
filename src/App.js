import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import { rootReducer } from './reducers';

// import static files
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './public/css/style.css';

// import components
import NavbarComponent from './components/header/navbar';
import { BreadcrumbsComponent } from './components/header/breadcrums';
import LoginComponent from './components/login/login';
import FilterFormComponent from './components/staff/filterForm';
import FilterResultComponent from './components/staff/filterResult';
import StaffInfoComponent from './components/staff/staffInfo';
import Staff from './components/staff/staff';
import Chart from './components/dashboard/chart';



const myStore = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends React.Component {     
    render(){
        return (
            <Provider store={myStore}>
                <Router>
                    <Route component={NavbarComponent}/>
                    <BreadcrumbsComponent/>
                    <Switch>                                          
                        <Route exact path='/' component={LoginComponent}/>                        
                        <Route path='/staff/filter' component={FilterFormComponent}/>
                        <Route path='/staff/result' component={FilterResultComponent}/>
                        <Route path='/staff/info' component={StaffInfoComponent}/>
                        <Route path='/staff/add' component={() => <Staff type='add'/>}/>
                        <Route path='/staff/edit' component={()=><Staff type='edit' currentStaff={{
                            _id: "5e2834c3fe643132d41f8120",
                            firstName: "Mai",
                            lastName: "Vo",
                            birthDate: null,
                            gender: false,
                            address: "biow",
                            mobile: "51561",
                            skype: "151",
                            email: "vnqmai@yahoo.com",
                            joinDate: null,
                            department: "Frontend",
                            image:"http://localhost:3001/assets/images/staff/nhac-tre-15479941159931316049405.jpg"                            
                        }}/>}/>
                        <Route path='/dashboard' component={Chart}/>
                    </Switch>                    
                </Router>
            </Provider>
        );
    }
}

    export default App;