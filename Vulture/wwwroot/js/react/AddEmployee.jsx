import React from 'react';
import Validation from 'react-validation';
class AddEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            city: '',
            department: '',
            gender: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logChange = this.logChange.bind(this);
    }
    handleSubmit(event) {

        event.preventDefault();

        var data = {
           

            Name: this.state.name,

            City : this.state.city,

            Department: this.state.department,

            Gender : this.state.gender



        };

        console.log(data);

        $.ajax( {
            url: 'api/Employee/Create',
            method: 'POST',

            headers: { 'Content-Type': 'application/json' },

            dataType:'json',

            data: JSON.stringify(data)

        }).then(function (response) {
            console.log('2',data);
            if (response.status >= 400) {

                throw new Error("Bad response from server");

            }

            return response.json();

        }).then(function (data) {

            console.log(data);

            if (data === "success") {

                this.setState({ msg: "Thanks for registering" });

            }

        }).catch(function (err) {

            console.log(err);

        });

    }
    logChange(e) {

        this.setState({ [e.target.name]: e.target.value });

    }

    render() {
        return (
                <form onSubmit={this.handleSubmit} method="POST">

                    <label>Name</label>

                <input onChange={this.logChange} value={this.state.name} name='name'  />

                    <label>City</label>

                <input onChange={this.logChange} value={this.state.city} name='city' />
                    <label>Department</label>

                <input onChange={this.logChange} value={this.state.department} name='department'  />
                    <label>Gender</label>

                <input onChange={this.logChange} value={this.state.gender} name='gender'  />

                    <div >

                        <button >Submit</button>

                    </div>

                </form>
        );
    }
}
export default AddEmployee;