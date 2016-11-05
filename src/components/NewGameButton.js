import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export default class NewGameButton extends Component {
  render () {
    return <Button className="btn-new-game" onClick={this.props.newGame}>New Game</Button>;
  }
}
