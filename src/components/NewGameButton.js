import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export default class NewGameButton extends Component {
  render () {
    return <Button onClick={this.props.newGame}>New Game</Button>;
  }
}
