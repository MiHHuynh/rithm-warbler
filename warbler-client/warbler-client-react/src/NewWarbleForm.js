import React, { Component } from "react";
import axios from "axios";

class NewWarbleForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="newwarbleform">
        <h4>Warble:</h4>
        <form onSubmit={this.props.addWarble}>
          Text: <input name="text" type="text" />
          <input type="submit" value="Create" />
        </form>
      </div>
    );
  }
}

export default NewWarbleForm;
