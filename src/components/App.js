import React, {Component} from 'react';
import WordToGuess from './WordToGuess';
import NewGameButton from './NewGameButton';
import GuessForm from './GuessForm';
import HangmanCanvas from './HangmanCanvas';
import {Grid, Row, Col} from 'react-bootstrap';
import $ from 'jquery';
import '../styles/App.css';

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
    this.newGame = this.newGame.bind(this);
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
            word: data.Word.toLowerCase(),
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
      guess = guess.toLowerCase();
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
    let gameBox,
        wrongGuesses;
    let wrongArr = this.state.wrongGuesses.slice();

    if(this.state.isLoading) {
      gameBox = (
        <h3>Loading...</h3>
      );
    } else if(this.state.gameStatus) {
      gameBox = <h3>{this.state.gameStatus}</h3>;
    } else {
      gameBox = (
        <GuessForm handleGuess={this.handleGuess.bind(this)}/>
      );
    }

    wrongGuesses = wrongArr.map((letter, i) => {
      return <span className="wrong-guessed-letter" key={i}>{letter}</span>
    });

    return (
      <div className="App text-center">
        <h1>Hangman Game</h1>
        <WordToGuess word={this.state.word} guesses={this.state.guesses}/>
        <Grid>
          <Row>
            <Col sm={6} smPush={6}>
              {gameBox}
              {
                this.state.wrongGuesses.length > 0
                  ? <p className="App__wrong-guesses">Wrong Guesses: {wrongGuesses}</p>
                  :
                  ""
              }
            </Col>
            <Col sm={6} smPull={6}>
              <HangmanCanvas wrongCount={this.state.wrongGuesses ? this.state.wrongGuesses.length : 0}/>
            </Col>
          </Row>
        </Grid>
        <NewGameButton newGame={this.newGame}/>
      </div>
    );
  }
}

export default App;
