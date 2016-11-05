import React, {Component} from 'react';
import WordToGuess from './WordToGuess';
import NewGameButton from './NewGameButton';
import GuessForm from './GuessForm';
import HangmanCanvas from './HangmanCanvas';
import $ from 'jquery';

class App extends Component {
  constructor() {
    super();
    this.state = {
      word: "",
      guesses: [],
      gameStatus: "",
      wrongGuessCount: 0
    }
  }
  componentDidMount() {
    this.getNewWord();
  }

  newGame() {
    this.getNewWord();
    this.setState({guesses: []});
  }

  getNewWord() {
    $.ajax({
        type: "GET",
        url: "http://randomword.setgetgo.com/get.php",
        dataType: "jsonp",
        success: function(data){
          this.setState({word: data.Word});
        }.bind(this)
    });
  }

  handleGuess(input) {
    let NewGuesses = this.state.guesses;
    let word = this.state.word;
    let wrongGuesses = [];
    input.split("").forEach((guess) => {
      if(guess !== " " && NewGuesses.indexOf(guess) === -1) {
        NewGuesses.push(guess);
      }
    });
    NewGuesses.forEach((letter) => {
      if(word.indexOf(letter) === -1) {
        wrongGuesses.push(letter);
      }
    });

    this.checkWinOrLose();
    this.setState({
      guesses: NewGuesses,
      wrongGuesses: wrongGuesses
    });
  }

  checkWinOrLose() {
    let guesses = this.state.guesses;
    let correctGuesses = 0,
        wrongGuesses = 0;
    let word = this.state.word;
    guesses.forEach((letter) => {
      if(word.indexOf(letter) === -1) {
        wrongGuesses += 1;
      }
    });
    if(wrongGuesses >= 6) {
      this.setState({ gameStatus: "lose"});
    }
    word.split("").forEach((letter) => {
      if(guesses.indexOf(letter) !== -1) {
        correctGuesses += 1;
      }
    });
    if(word.length === correctGuesses) {
      this.setState({ gameStatus: "win"});
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Hangman Game</h1>
        <h2>Game Status: {this.state.gameStatus}</h2>
        <WordToGuess word={this.state.word} guesses={this.state.guesses}/>
        <GuessForm handleGuess={this.handleGuess.bind(this)}/>
        <NewGameButton newGame={this.newGame.bind(this)}/>
        <p>Wrong Guesses: {this.state.wrongGuesses}</p>
        <HangmanCanvas wrongCount={this.state.wrongGuesses ? this.state.wrongGuesses.length : 0}/>
      </div>
    );
  }
}

export default App;
