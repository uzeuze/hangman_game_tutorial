import React, {Component} from 'react';
import Dash from './Dash';

export default class WordToGuess extends Component {
  getDisplay() {
    let word = this.props.word;
    let display = word.split("").map((letter, index) => {
      if (this.props.guesses.indexOf(letter) !== -1) {
        return <Dash key={index} display={letter}/>
      } else {
        return <Dash key={index}/>
      }
    });
    return display;
  }
  render() {
    let display = this.getDisplay();
    return (
      <div>
        {display}
      </div>
    );
  }
}
