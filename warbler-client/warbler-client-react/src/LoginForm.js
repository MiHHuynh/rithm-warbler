import React, { Component } from "react";
import axios from "axios";

class LoginForm extends Component {
  constructor(props) {
    super(props);
  }

  login(e, i) {
    e.preventDefault();
    axios
      .post("/api/auth/login", {
        username: e.target.username.value,
        password: e.target.password.value
      })
      .then(response => {
        var currentUserToken = response.data.token;
        localStorage.setItem("currentUserToken", currentUserToken);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="loginform">
        <h4>Login</h4>
        <form onSubmit={this.login}>
          Username: <input name="username" type="text" />
          Password: <input name="password" type="password" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default LoginForm;
