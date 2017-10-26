import React, { Component } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

class NewWarbleForm extends Component {
  constructor(props) {
    super(props);
  }

  createWarble(e) {
    e.preventDefault();
    var token = localStorage.getItem("currentUserToken");
    var decoded = jwtDecode(token);
    setAuthorizationToken(token);
    axios
      .post(`/api/users/${decoded.user_id}/warbles`, {
        text: e.target.text.value
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
      <div className="newwarbleform">
        <h4>Warble:</h4>
        <form onSubmit={this.createWarble}>
          Text: <input name="text" type="text" />
          <input type="submit" value="Create" />
        </form>
      </div>
    );
  }
}

export default NewWarbleForm;
