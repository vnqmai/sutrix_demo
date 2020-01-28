import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import { rootReducer } from './reducers';

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
                    <Route component={BreadcrumbsComponent}/>
                    <Switch>                                          
                        <Route exact path='/' component={LoginComponent}/>                        
                        <Route path='/staff/filter' component={FilterFormComponent}/>                        
                        <Route path='/staff/result' component={FilterResultComponent}/>
                        <Route path='/staff/info' component={StaffInfoComponent}/>
                        <Route path='/staff/add' component={StaffAdd}/>
                        <Route path='/staff/edit' component={StaffEdit}/>                        
                        <Route path='/dashboard' component={Chart}/>
                    </Switch>                    
                </Router>
            </Provider>
        );
    }
}

    export default App;