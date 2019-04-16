import React, { Component } from 'react';
import Modal from 'react-modal';
//import Button from '@material-ui/core/Button';
//import { SplitButton, MenuItem } from 'bootstrap';

class FetchEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],

            modalIsOpen: false,

            name: '',

            city: '',

            department: '',

            gender: '',

            employeeId: 0
        };
        this.openModal = this.openModal.bind(this);

        this.closeModal = this.closeModal.bind(this);

        this.logChange = this.logChange.bind(this); // We capture the value and change state as user changes the value here.

        this.handleEdit = this.handleEdit.bind(this); 
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
            
            console.log("Employees",self.state.employees);

        }).catch(err => {

            console.log('caught it!', err);

        });

    }

    //componentWillUpdate() {
    //    let self = this;

    //    fetch('/api/Employee/Index', {

    //        method: 'GET'

    //    }).then(function (response) {

    //        if (response.status >= 400) {

    //            throw new Error("Bad response from server");

    //        }

    //        return response.json();

    //    }).then(function (data) {

    //        self.setState({ employees: data });

    //        console.log("Employees", self.state.employees);

    //    }).catch(err => {

    //        console.log('caught it!', err);

    //    });
    //}

    handleEdit(event) {

        //Edit functionality

        event.preventDefault();

        var data = {

            name: this.state.name,

            city: this.state.city,

            department: this.state.department,

            gender: this.state.gender,

            employeeId: this.state.employeeId

        };

        let that = this;

        fetch("api/Employee/Edit", {

            method: 'PUT',

            headers: {

                'Content-Type': 'application/json'

            },

            body: JSON.stringify(data)

        }).then(function (response) {

            if (response.status >= 400) {

                throw new Error("Bad response from server");

            }

            return response.json();

        }).then(function (data) {

            console.log("Success", data);
            console.log(that);

            that.closeModal();
            that.componentDidMount();

            if (data === "success") {

                this.setState({

                    msg: "User has been edited."
                 

                });

            }
            
        }).catch(function (err) {

            console.log(err);

        });

    }


    openModal(member) {

        this.setState({

            modalIsOpen: true,

            name: member.name,

            city: member.city,

            department: member.department,

            gender: member.gender,

            employeeId: member.employeeId

        });

    }

   closeModal() {

        this.setState({

            modalIsOpen: false

        });

    }



    logChange(e) {

        this.setState({

            [e.target.name]: e.target.value //setting value edited by the admin in state.

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
                        <th>Button</th>
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
                                <td><a onClick={() => this.openModal(member)}>Edit</a>|<a>Delete</a></td>
                                <td><button>Details</button></td>
                            </tr>
                        )
                    }

                    <Modal id="test"

                        isOpen={this.state.modalIsOpen}

                        onRequestClose={this.closeModal}

                    >
                    

                        <form onSubmit={this.handleEdit} method="PUT">

                            <label>Name</label>

                            <input onChange={this.logChange} value={this.state.name} name='name' />

                            <label>City</label>

                            <input onChange={this.logChange} value={this.state.city} name='city' />
                            <label>Department</label>

                            <input onChange={this.logChange} value={this.state.department} name='department' />
                            <label>Gender</label>

                            <input onChange={this.logChange} value={this.state.gender} name='gender' />

                            <div >

                                <button >Submit</button>
                                <a onClick={() => this.closeModal()}>Close</a>

                            </div>

                        </form>

                    </Modal> 
                </tbody>
                        </table>
                </div>);
    }
}

export default FetchEmployee;