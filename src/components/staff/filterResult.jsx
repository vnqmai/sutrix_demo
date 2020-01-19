import React from 'react';

export class FilterResultComponent extends React.Component{
    render(){
        return(
            <div className="container content">

                <table className="table table-hover table-result">
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Join Date</th>
                            <th>Skype</th>
                            <th>Email</th>
                            <th>Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nguyen Thi Huyen Tran</td>
                            <td>20/10/2010</td>
                            <td>sutrix.tran.nguyen</td>
                            <td>tran.nguyen@sutrixmedia.com</td>
                            <td>Frontend</td>
                        </tr>
                        <tr>
                            <td>Pham Thi Huyen Tran</td>
                            <td>31/12/1013</td>
                            <td>sutrix.tran.pham</td>
                            <td>tran.pham@sutrixmedia.com</td>
                            <td>Frontend</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        );
    }
}