import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { configEnv } from '../../config/env';

class StaffHistories extends React.Component{
    constructor(){
        super();
        this.state = {
            histories: [],
            note: ''
        }             
    }

    componentDidMount() {        
        const config = {headers: {Authorization: `Bearer ${this.props.token}`}};
        axios.get(`${configEnv[configEnv.env].host}/staffHistory/`+this.props.staffId, config)
            .then(res => {
                this.setState({
                    histories: res.data
                })                        
        });        
    }


    removeHistory = (historyId) => {
        const config = {headers: {Authorization: `Bearer ${this.props.token}`}};
        axios.delete(`${configEnv[configEnv.env].host}/staffHistory/`+historyId, config).then(res=>{
            this.setState({
                histories: res.data
            })
        })
    }

    addHistory = (history) => {
        const config = {headers: {Authorization: `Bearer ${this.props.token}`}};
        axios.post(`${configEnv[configEnv.env].host}/staffHistory`, history, config).then(res=>{
            this.setState({
                histories: res.data,
                note: ''
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
                                        <b>
                                            <Moment format="DD-MM-YYYY">
                                                {history.historyDate}
                                            </Moment>                                            
                                        </b>
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

                <div className="row write-note">
                    <form>
                        <table className="form-table">
                            <tbody>
                                <tr>
                                    <td>
                                        <textarea name="note" id="note" rows="3" placeholder="Write a note" 
                                        onChange={e=>this.setState({note: e.target.value})}
                                        value={this.state.note}>
                                        </textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="center">
                                        <input type="button" value="Add" className="btn-orange"
                                        onClick={()=>this.addHistory({historyActivity: this.state.note, staff: this.props.staffId})}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(StaffHistories);