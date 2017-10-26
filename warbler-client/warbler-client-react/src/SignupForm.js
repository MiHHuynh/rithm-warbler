import React, { Component } from "react";
import axios from "axios";

class SignupForm extends Component {
  constructor(props) {
    super(props);
  }

  signup(e, i) {
    e.preventDefault();
    axios
      .post("/api/auth/signup", {
        name: e.target.name.value,
        username: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="signupform">
        <h4>Signup</h4>
        <form onSubmit={this.signup}>
          Name: <input name="name" type="text" />
          E-mail: <input name="email" type="text" />
          Username: <input name="username" type="text" />
          Password: <input name="password" type="password" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default SignupForm;
