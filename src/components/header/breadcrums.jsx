import React from 'react';

export class BreadcrumbsComponent extends React.Component{
    render(){
        return (            
            <ol className="breadcrumb">
                <li>
                    <a href="#">Staff</a>
                </li>
                <li className="active">Information</li>
                <ul className="list-inline">
                    <li><a href="">Add</a></li>
                    <li><a href="">Edit</a></li>
                </ul>
            </ol>        
        );
    }
}