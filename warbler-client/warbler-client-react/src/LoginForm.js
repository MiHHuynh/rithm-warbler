import React, { Component } from "react";
import axios from "axios";

class LoginForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="loginform">
        <h4>Login</h4>
        <form onSubmit={this.props.handleLogin}>
          Username: <input name="username" type="text" />
          Password: <input name="password" type="password" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default LoginForm;
