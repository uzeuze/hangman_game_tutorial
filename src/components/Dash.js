import React, {Component} from 'react';

export default class Dash extends Component {
  render() {
    return (
      <span className="dash-item">
        {this.props.display ?
          `  ${this.props.display}  ` : "  _  "
        }
      </span>
    );
  }
}
