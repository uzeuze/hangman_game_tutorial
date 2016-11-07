import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export default function NewGameButton(props) {
  return (
    <Button
      className="NewGameButton"
      onClick={props.newGame}
    >
      New Game
    </Button>
  );
}
