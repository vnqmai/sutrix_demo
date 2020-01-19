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

function App() {
    return ( <
        div >
        <
        HeaderComponent / > { /* <LoginComponent /> */ } <
        FilterComponents / >
        <
        /div>);
    }

    export default App;