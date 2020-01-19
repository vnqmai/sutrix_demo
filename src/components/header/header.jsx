import React from 'react';
import {BreadcrumbsComponent} from './breadcrums';
import {NavbarComponent} from './navbar';

export class HeaderComponent extends React.Component{
    render(){
        return(
            <div className="container">
                <NavbarComponent/>
                <BreadcrumbsComponent/>
            </div>
        );
    }
}