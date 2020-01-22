import React from 'react';
import axios from 'axios';

export class StaffHistories extends React.Component{
    constructor(){
        super();
        this.state = {
            histories: []
        }     
        this.getHistories = this.getHistories.bind(this);        
    }

    componentDidMount() {        
        this.getHistories();
    }

    getHistories = () => {
        axios.get('http://localhost:3001/staffHistory/'+this.props.staffId).then(res => {
            this.setState({
                histories: res.data
            })
        }).catch(function (error) {
            console.log(error)
          });
    }

    removeHistory = (historyId) => {
        axios.delete('http://localhost:3001/staffHistory/'+historyId).then(res=>{
            this.setState({
                histories: res.data
            })
        })
    }

    render(){
        return(
            <div className="row history">
                    <div className="col-lg-12">
                        <h4>History:</h4>
                    </div>

                    {this.state.histories.map((history, index)=>{
                        return(
                            <div className="col-lg-12" key={index}>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">
                                            <b>{history.historyDate}</b>
                                            <button type="button" className="close" onClick={()=>this.removeHistory(history._id)}>x</button>
                                        </h3>
                                    </div>
                                    <div className="panel-body">
                                        {history.historyActivity}
                                    </div>
                                </div>
                            </div>
                        );

                    })}

                </div>
        );
    }
}