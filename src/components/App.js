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
      wrongGuesses: [],
      isLoading: false
    }
  }
  componentDidMount() {
    this.getNewWord();
  }

  newGame() {
    this.getNewWord();
    this.setState({
      guesses: [],
      gameStatus: "",
      wrongGuesses: []
    });
  }

  getNewWord() {
    this.setState({isLoading: true });
    $.ajax({
        type: "GET",
        url: "http://randomword.setgetgo.com/get.php",
        dataType: "jsonp",
        success: function(data){
          this.setState({
            word: data.Word,
            isLoading: false
          });
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
      this.setState({ gameStatus: "GAME OVER"});
    }
    word.split("").forEach((letter) => {
      if(guesses.indexOf(letter) !== -1) {
        correctGuesses += 1;
      }
    });
    if(word.length === correctGuesses) {
      this.setState({ gameStatus: "YOU WIN!"});
    }
  }

  render() {
    let gameBox;
    if(this.state.isLoading) {
      gameBox = (
        <h3>Loading...</h3>
      );
    } else if(this.state.gameStatus) {
      gameBox = <h3>{this.state.gameStatus}</h3>;
    } else {
      gameBox = (
        <div>
          <WordToGuess word={this.state.word} guesses={this.state.guesses}/>
          <GuessForm handleGuess={this.handleGuess.bind(this)}/>
        </div>
      );
    }
    return (
      <div className="container">
        <h1 className="text-center">Hangman Game</h1>
        {gameBox}
        <NewGameButton newGame={this.newGame.bind(this)}/>

        { this.state.wrongGuesses.length > 0 ?
          <p>Wrong Guesses: {this.state.wrongGuesses}</p>
          :
          ""
        }
        <div>
          <HangmanCanvas wrongCount={this.state.wrongGuesses ? this.state.wrongGuesses.length : 0}/>          
        </div>
      </div>
    );
  }
}

export default App;
