import React, {Component} from 'react';
import WordToGuess from './WordToGuess';
import NewGameButton from './NewGameButton';
import GuessForm from './GuessForm';
import $ from 'jquery';

class App extends Component {
  constructor() {
    super();
    this.state = {
      word: "",
      guesses: [],
      gameStatus: ""
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
    input.split("").forEach((guess) => {
      if(guess !== " " && NewGuesses.indexOf(guess) === -1) {
        NewGuesses.push(guess);
      }
    });
    this.checkWinOrLose();
    this.setState({guesses: NewGuesses});
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
    let word = this.state.word;
    let guesses = this.state.guesses;
    let wrongGuesses = guesses.map((letter) => {
      if(word.indexOf(letter) === -1) {
        return letter;
      }
    });
    return (
      <div>
        <h1 className="text-center">Hangman Game</h1>
        <h2>Game Status: {this.state.gameStatus}</h2>
        <WordToGuess word={this.state.word} guesses={this.state.guesses}/>
        <GuessForm handleGuess={this.handleGuess.bind(this)}/>
        <NewGameButton newGame={this.newGame.bind(this)}/>
        <p>Wrong Guesses: {wrongGuesses}</p>
      </div>
    );
  }
}

export default App;
