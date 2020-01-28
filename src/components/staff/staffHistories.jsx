import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class StaffHistories extends React.Component{
    constructor(){
        super();
        this.state = {
            histories: [],
            note: ''
        }     
        this.getHistories = this.getHistories.bind(this);        
    }

    componentDidMount() {        
        this.getHistories();
    }

    getHistories = () => {
        const config = {headers: {Authorization: `Bearer ${this.props.token}`}};
        axios.get('https://sutrix-be.herokuapp.com/staffHistory/'+this.props.staffId, config).then(res => {
            this.setState({
                histories: res.data
            })
        }).catch(function (error) {
            console.log(error)
          });
    }

    removeHistory = (historyId) => {
        const config = {headers: {Authorization: `Bearer ${this.props.token}`}};
        axios.delete('https://sutrix-be.herokuapp.com/staffHistory/'+historyId, config).then(res=>{
            this.setState({
                histories: res.data
            })
        })
    }

    addHistory = (history) => {
        const config = {headers: {Authorization: `Bearer ${this.props.token}`}};
        axios.post('https://sutrix-be.herokuapp.com/staffHistory', history, config).then(res=>{
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

                <div className="row write-note">
                    <form>
                        <table className="form-table">
                            <tr>
                                <td><textarea name="note" id="note" rows="3" placeholder="Write a note" onChange={e=>this.setState({note: e.target.value})}></textarea></td>
                            </tr>
                            <tr>
                                <td className="center">
                                    <input type="button" value="Add" className="btn-orange"
                                    onClick={()=>this.addHistory({historyActivity: this.state.note, staff: this.props.staffId})}/>
                                </td>
                            </tr>
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