import React, { Component } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Warble from "./Warble";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import NewWarbleForm from "./NewWarbleForm";

function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warbles: [],
      loggedIn: false
    };
    this.handleAddWarble = this.handleAddWarble.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();
    axios
      .post("/api/auth/login", {
        username: e.target.username.value,
        password: e.target.password.value
      })
      .then(response => {
        var currentUserToken = response.data.token;
        localStorage.setItem("currentUserToken", currentUserToken);
        this.setState({ loggedIn: true });
      })
      .catch(function(error) {
        console.log(error);
      });
    e.target.username.value = "";
    e.target.password.value = "";
  }

  handleSignup(e) {
    e.preventDefault();
    axios
      .post("/api/auth/signup", {
        name: e.target.name.value,
        username: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value
      })
      .then((response) => {
        var currentUserToken = response.data.token;
        localStorage.setItem("currentUserToken", currentUserToken); 
        this.setState({ loggedIn: true });      
      })
      .catch(function(error) {
        console.log(error);
      });

    e.target.name.value = "";
    e.target.email.value = "";
    e.target.username.value = "";
    e.target.password.value = "";
  }


  handleAddWarble(e) {
    e.preventDefault();
    var token = localStorage.getItem("currentUserToken");
    var decoded = jwtDecode(token);
    setAuthorizationToken(token);
    axios
      .post(`/api/users/${decoded.user_id}/warbles`, {
        text: e.target.text.value
      })
      .then(response => {
        var newWarbles = this.state.warbles.slice();
        newWarbles.unshift({
          text: response.data.text,
          username: response.data.username,
          user_id: response.data.user_id,
          createdAt: response.data.createdAt
        });
        this.setState({ warbles: newWarbles });
      })
      .catch(function(error) {
        console.log(error);
      });
    e.target.text.value = "";
  }

  handleFollow(user_id, e) {
    e.preventDefault();
    var token = localStorage.getItem("currentUserToken");
    var decoded = jwtDecode(token);
    setAuthorizationToken(token);
    axios
      .patch(`/api/users/${decoded.user_id}/following`, {
        followee_id: user_id
      })
      .then(function(response) {
        console.log(response);
      });
  }


  componentDidMount() {
    axios.get(`/api/warbles`).then(response => {
      var warbles = response.data.map(warble => {
        return {
          username: warble.username,
          text: warble.text,
          createdAt: warble.createdAt,
          user_id: warble.user_id
        };
      });
      this.setState({ warbles });
    });
  }

  render() {
    let loginInForm = this.state.loggedIn ? null : (
        <LoginForm handleLogin={this.handleLogin} />
    );
    let signupForm = this.state.loggedIn ? null : (
        <SignupForm handleSignup={this.handleSignup} />
    );
    let warbleForm = this.state.loggedIn ? ( <NewWarbleForm addWarble={this.handleAddWarble} /> ) : null;

    let warbles = this.state.warbles.map((warble, idx) => {
      return (
        <Warble
          username={warble.username}
          text={warble.text}
          createdAt={warble.createdAt}
          user_id={warble.user_id}
          key={idx}
          handleFollow={this.handleFollow}
        />
      );
    });
    return (
      <div>
        <div>{loginInForm}</div>
        <div>
          {warbleForm}
        </div>
        <div>{signupForm}</div>
        <div className="newsfeed">{warbles}</div>
      </div>
    );
  }
}

export default NewsFeed;
