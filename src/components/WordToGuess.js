import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import $ from 'jquery';
import Dash from './Dash';

export default class WordToGuess extends Component {
  constructor() {
    super();
    this.state = {
      word: "",
      guessStatus: [0,1]
    }
  }
  componentDidMount() {
    this.getWord();
  }

  newGame() {
    this.getWord();
  }

  getWord() {
    $.ajax({
        type: "GET",
        url: "http://randomword.setgetgo.com/get.php",
        dataType: "jsonp",
        success: function(data){
          this.setState({word: data.Word});
        }.bind(this)
    });
  }

  render() {
    let word = this.state.word;
    let dashes = word.split("").map((dash, index) => {
      if (this.state.guessStatus.indexOf(index) !== -1) {
        return <Dash key={index} display={word[index]}/>
      } else {
        return <Dash key={index}/>
      }
    });
    return (
      <div>
        {dashes}
        <h6>{this.state.word}</h6>
        <Button onClick={this.newGame.bind(this)}>New Game</Button>
      </div>
    );
  }
}
