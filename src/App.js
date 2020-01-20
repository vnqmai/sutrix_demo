import React from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// import static files
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './public/css/style.css';

// import components
import { NavbarComponent } from './components/header/navbar';
import { BreadcrumbsComponent } from './components/header/breadcrums';
import { LoginComponent } from './components/login/login';
import { FilterComponent } from './components/staff/filter';
import { FilterResultComponent } from './components/staff/filterResult';

class App extends React.Component { 
    render(){
        return (
            <Router>
                <NavbarComponent/>
                <BreadcrumbsComponent/>
                <Switch>
                    <Route exact path='/' component={LoginComponent}/>                    
                    <Route path='/staff/filter' component={FilterComponent}/>
                    <Route path='/staff/result' component={FilterResultComponent}/>
                </Switch>           
            </Router>
        );
    }
}

    export default App;