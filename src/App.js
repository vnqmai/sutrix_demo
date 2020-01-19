import React from 'react';
import logo from './logo.svg';

// import static files
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './public/css/style.css';

// import components
import { HeaderComponent } from './components/header/header';
import { LoginComponent } from './components/login/login';
import { FilterComponents } from './components/staff/filter';
import { FilterResultComponent } from './components/staff/filterResult';

function App() {
    return (
        <div> 
            < HeaderComponent / >  
            {/* <LoginComponent /> */}
            {/* <FilterComponents/> */}
            <FilterResultComponent/>
        </div>);
    }

    export default App;