import React, { Component } from "react";

class Warble extends Component {
  render() {
    return (
      <div className="warble">
        <h1>{this.props.username}</h1>
        said {this.props.text} at {this.props.createdAt}
      </div>
    );
  }
}

export default Warble;
