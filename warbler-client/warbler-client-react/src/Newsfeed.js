import React, { Component } from "react";
import axios from "axios";
import Warble from "./Warble";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import NewWarbleForm from "./NewWarbleForm";

class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warbles: [],
      loggedIn: false
    };
    this.loggedIn = this.loggedIn.bind(this);
  }

  loggedIn() {
    this.setState({ loggedIn: true });
  }

  componentDidMount() {
    axios.get(`/api/warbles`).then(response => {
      const warbles = response.data.map(warble => {
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
      <div>
        <LoginForm loggedIn={this.state.loggedIn} />
      </div>
    );

    let warbles = this.state.warbles.map((warble, idx) => {
      return (
        <Warble
          username={warble.username}
          text={warble.text}
          createdAt={warble.createdAt}
          user_id={warble.user_id}
          key={idx}
        />
      );
    });
    return (
      <div>
        <div>{loginInForm}</div>
        <div>
          <NewWarbleForm />
        </div>
        <div>
          <SignupForm />
        </div>
        <div className="newsfeed">{warbles}</div>
      </div>
    );
  }
}

export default NewsFeed;
