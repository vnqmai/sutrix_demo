import React from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import axios from 'axios';

class Chart extends React.Component{
    constructor(){
        super();
        this.state = {
            chartData: []
        }
    }

    getDataColumns(json,index){
        let res = [];
        var i = 0;
        for(i = 0;i<json.length;++i){
            // if(json[i]['_id']!==null)
                res.push(json[i][index]);
        }
        return res;
    }

    backgroundColor(json){
        let res = [];
        let minValue = Math.min.apply(null,this.getDataColumns(json,'count'));        
        for(var i = 0;i<json.length;++i){
            if (json[i]['count'] === minValue)
                res.push('orange');
            else    
                res.push('#dedcdc');
        }
        return res;
    }

    componentDidMount(){        
        const config = {headers: {Authorization: `Bearer ${this.props.token}`}};
        axios.get('https://sutrix-be.herokuapp.com/analyse',config).then(res=>{            
            this.setState({
                chartData: {
                    labels: this.getDataColumns(res.data,'_id'),
                    datasets: [{
                        data: this.getDataColumns(res.data,'count'),
                        backgroundColor: this.backgroundColor(res.data)
                    }]
                }
            })            
        })        
    }
    render(){ 
        // console.log('data',this.state.chartData);               
        return(
            <div className="container">
                <Bar data={this.state.chartData}
                width={150}
                height={50}
                options={{                
                    scales: {
                    xAxes: [{
                        gridLines: {
                            display: false,
                            drawBorder: false
                        }
                    }],
                    yAxes: [{
                        ticks: {
                        max: 100,
                        min: 0,
                        stepSize: 10,
                        callback: function (label, index, labels) {
                            return label + ' staff';
                        }
                        },
                        gridLines: {
                            display: false,
                            drawBorder: false
                        }
                    }]
                    },
                    legend: {
                    display: false
                    },
                    tooltips: {
                        callbacks: {
                        label: function(tooltipItem) {
                                return tooltipItem.yLabel;
                        }
                        }
                    }                    
                }}></Bar>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(Chart);