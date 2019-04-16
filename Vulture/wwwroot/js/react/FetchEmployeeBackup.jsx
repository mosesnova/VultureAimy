import React from 'react';
import Modal from 'react-modal';

class FetchEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        };
    }

    componentDidMount() {

        let self = this;

        fetch('/api/Employee/Index', {

            method: 'GET'

        }).then(function (response) {

            if (response.status >= 400) {

                throw new Error("Bad response from server");

            }

            return response.json();

        }).then(function (data) {

            self.setState({ employees: data });

            console.log("Employees", self.state.employees);

        }).catch(err => {

            console.log('caught it!', err);

        });

    }

    render() {
        return (<div className="container">
            <h1>FetchEmployee</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>Department</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.employees.map(member =>
                            <tr key={member.employeeId}>
                                <td>{member.employeeId} </td>
                                <td>{member.name}</td>
                                <td>{member.city}</td>
                                <td>{member.department}</td>
                                <td>{member.gender}</td>
                                <td><a>Edit</a>|<a>Delete</a></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>);
    }
}
export default FetchEmployee;