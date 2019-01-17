import React, { Component } from 'react';

class Login extends Component {

 state = {
        login: {
            email: '',
            password: ''
        },
        success: 'hide',
        user: '',
        active: false
    };

    loggedIn = (res) => {
        const result = res || {};
        console.log(res);
        this.setState({
            active: true,
            user: result,
            success: 'show'
        });
    };

    login = () => {
        const { login } = this.state;
        fetch(`http://localhost:4000/login/get?email=${login.email}&password=${login.password}`)
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                this.loggedIn(res[0].first_name)
            })
            .catch(err => console.log(err))
    };

    render () {
        const { login } = this.state;
        return (
            <div>
                <h1>Login</h1>
                <div className="form">
                    <div>
                        <div className={this.state.success}>
                            <h1>Congratulations, { this.state.user } you have now logged in</h1>
                        </div>

                        <label>Email Address</label>
                        <input
                            type="email"
                            value={login.email}
                            onChange={e => this.setState({login: { ...login, email: e.target.value }})}
                            required
                        />

                        <label>Password</label>
                        <input
                            type="password"
                            value={login.password}
                            onChange={e => this.setState({login: { ...login, password: e.target.value }})}
                            required
                        />

                        <button onClick={this.login}>Login</button>

                    </div>
                </div>
            </div>
        )};
};

export default Login;