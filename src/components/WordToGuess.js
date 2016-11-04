import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import $ from 'jquery';

export default class WordToGuess extends Component {
  constructor() {
    super();
    this.state = {
      word: ""
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
    return (
      <div>
        <h6>{this.state.word}</h6>
        <Button onClick={this.newGame.bind(this)}>New Game</Button>
      </div>
    );
  }
}
