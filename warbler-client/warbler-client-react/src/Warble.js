import React, { Component } from "react";

class Warble extends Component {
  render() {
    return (
      <div className="warble">
        <p>{this.props.username} said {this.props.text} at {this.props.createdAt}
        </p>
        <form onSubmit={this.props.handleFollow.bind(this, this.props.user_id)}>
          <button>Follow {this.props.username}</button>
        </form>
      </div>
    );
  }
}

export default Warble;
