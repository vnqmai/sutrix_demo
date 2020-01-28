import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {links} from'../../data/breadcrumbs.js';

class BreadcrumbsComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            listCrumbs: [],
            listActions: []
        }
    }

    findCrumbByName(name){   
        let crumbResult;     
        for(var i = 0;i< links.length;++i){
            if(links[i].name===name)
                crumbResult = links[i];
        }        
        return crumbResult;
    }

    getData(pathname){          
        let names = pathname.split('/');
        
        let crumbs = [];
        names.map((name, index)=>{   
            if(index!==0){
                var crumb = this.findCrumbByName(name);                
                if(crumb)
                    crumbs.push({path: crumb.path, name: crumb.name});
            }                      
        })                        
        
        this.setState({
            listCrumbs: crumbs
        })

        links.map((link,id)=>{
            if(link.path===pathname){                
                this.setState({
                    listActions: link.action
                })                                      
            }                                   
        })
    }    

    moveToAction(action){     
        if(action.name==='edit')          
            this.props.history.push({pathname: action.path, state: {staffInfo: this.props.staffInfo, type: 'edit'}});
        if(action.name==='add')
            this.props.history.push({pathname: action.path, state: {staffInfo: null, type: 'add'}});
    }

    componentDidMount(){
        this.getData(window.location.pathname);        
    }

    componentWillReceiveProps(nextProps){
        this.getData(nextProps.location.pathname);
    }

    render(){              
        if(window.location.pathname!=='/')  
            return (            
                <ol className="breadcrumb">                
                    {this.state.listCrumbs.map((link,index)=>{                                   
                        if(index<this.state.listCrumbs.length-1)
                        return(
                            <li key={index}>
                                <Link to={link.path}>{link.name}</Link>
                            </li>
                        );
                    })}          
                    <li>
                        <a>{this.state.listCrumbs.length>0?this.state.listCrumbs[this.state.listCrumbs.length-1].name:''}</a>
                    </li>                      
                    <ul className="list-inline">
                        {this.state.listActions?
                            this.state.listActions.map((action, id)=>{
                                return (
                                    <li key={id}>                                        
                                        <a className="clickable" onClick={()=>this.moveToAction(action)}> {action.name}</a>
                                    </li>
                                )
                            })
                        :''}
                                                
                    </ul>
                </ol>        
            );
        return null;
    }
}

const mapStateToProps = state => {
    return {
        staffInfo: state.staff.staffInfo
    }
}

export default connect(mapStateToProps)(BreadcrumbsComponent);