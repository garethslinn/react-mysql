import React, { Component } from 'react';

class Register extends Component {

    today = () => { return new Date().toISOString().slice(0, 19).replace('T', ' ') };

    state = {
        register: {
            first_name: '',
            second_name: '',
            email: '',
            password: '',
            created: this.today(),
            modified: this.today()
        },
        success: 'hide'
    };

    success = () => {
        this.setState({ success: 'show' });
    };


    registerUser = () => {
        const { register } = this.state;
        fetch(`http://localhost:4000/register/add?first_name=${register.first_name}&last_name=${register.last_name}&email=${register.email}&password=${register.password}&created=${register.created}&modified=${register.modified}`)
            .then( this.success() )
            .catch(err => console.log(err))
    };

    render () {
        const { register } = this.state;
        return (
        <div>
            <h1>Register</h1>
            <div className="form">
                <div>
                    <div className={this.state.success}>
                        <h1>Congratulations, you have now registered</h1>
                        <p>click here to <a href="/login">Login</a>Log in</p>
                    </div>
                    <label>First Name</label>
                    <input
                        type="text"
                        value={register.first_name}
                        onChange={e => this.setState({register: { ...register, first_name: e.target.value }})}
                        required
                    />

                    <label>Last Name</label>
                    <input
                        type="text"
                        value={register.last_name}
                        onChange={e => this.setState({register: { ...register, last_name: e.target.value }})}
                        required
                    />

                    <label>Email Address</label>
                    <input
                        type="email"
                        value={register.email}
                        onChange={e => this.setState({register: { ...register, email: e.target.value }})}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        value={register.password}
                        onChange={e => this.setState({register: { ...register, password: e.target.value }})}
                        required
                    />

                    <input
                        type="hidden"
                        value={register.created}
                    />

                    <input
                        type="hidden"
                        value={register.modified}
                    />

                    <button onClick={this.registerUser}>Register</button>

                </div>
            </div>
        </div>
    )};
};

export default Register;