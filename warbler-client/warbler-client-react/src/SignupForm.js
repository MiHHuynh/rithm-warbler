import React, { Component } from "react";
import axios from "axios";

class SignupForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="signupform">
        <h4>Signup</h4>
        <form onSubmit={this.props.handleSignup}>
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
