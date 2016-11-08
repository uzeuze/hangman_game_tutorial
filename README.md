#Create a Hangman Game using React, Babel and Webpack

[See live demo on Codepen](http://codepen.io/uzeuze/full/GNgpPj/)

This is a step-by-step tutorial that teaches you how to build your own hangman game with React, Babel and Webpack. After completing this tutorial you will get basic understanding of:

* How to use next versions of JavaScript (ES6 / ES2015, ES7 / ES2016, etc.), JavaScript syntax extensions, such as React's JSX in your projects with Babel.
* How to get things done with Webpack (Javascript Bundler).

#### Reading Material

* [How to guide for Webpack](https://github.com/petehunt/webpack-howto)
* [Webpack for React](http://www.pro-react.com/materials/appendixA/)

##Create a new App

Create a new project folder:

`mkdir hangman_game`

To create a package.json file with defaults, run the following command on the terminal:

`npm init -y`

Install project dependencies locally with:

`npm install --save react react-dom style-loader css-loader jquery react-bootstrap`

Install dev dependencies locally with:

`npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react webpack webpack-dev-server`

Create public folder.
Add index.html to public folder. Add Bootstrap CDN to include Bootstrap's CSS styles.
The index.html will contain a pretty basic HTML page, whose only purpose is to load the bundled JavaScript file:

```
<!DOCTYPE html>
<html lang="en">
 <head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
   <title>Hangman Game</title>
 </head>
 <body>
   <div id="root"></div>
   <script type="text/javascript" src="bundle.js"></script>
 </body>
</html>
```

Create src folder.
Create index.js file in src folder. The index.html file will insert the HTML element returned by the App module in the page.

```javascript
import React, {Component} from 'react';
import {render} from 'react-dom';
import App from './components/App';
import './styles/index.css';

render(
  <App />,
  document.getElementById('root')
);
```

Create components folder.

####App Component

Add App.js file in components folder:

```javascript
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
```

####WordToGuess Component

src/components/WordToGuess.js

```javascript
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
      <div className="WordToGuess">
        {display}
      </div>
    );
  }
}
```
####GuessForm Component

src/components/GuessForm.js

```javascript
import React, {Component} from 'react';
import {FormGroup, FormControl, InputGroup, Button} from 'react-bootstrap';
import '../styles/GuessForm.css';

export default class GuessForm extends Component {
  constructor() {
      super();
      this.state = {
        textValue: ""
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ textValue: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleGuess(this.state.textValue);
    this.setState({textValue: ""});
  }

  render() {
    return (
      <form className="GuessForm" onSubmit={this.handleSubmit} >
        <FormGroup>
          <InputGroup className="GuessForm__input">
            <FormControl
              type="text"
              value={this.state.textValue}
              onChange={this.handleChange}
              autoFocus={true}
            />
            <InputGroup.Addon
              className="GuessForm__button"
              onClick={this.handleSubmit}
            >
              Guess
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
      </form>
    );
  }
}
```

####Dash Component

src/components/Dash.js

```javascript
import React, {Component} from 'react';
import '../styles/Dash.css';

export default function Dash(props) {
  return (
    <span className="Dash">
      {
        props.display
        ? `  ${props.display}  `
        : "  _  "
      }
    </span>
  );
}
```
####HangmanCanvas Component

src/components/HangmanCanvas.js

```javascript
import React, {Component} from 'react';

export default class HangmanCanvas extends Component {

  componentDidMount() {
      this.updateCanvas(this.props.wrongCount);
  }

  componentWillReceiveProps(newProps) {
      this.updateCanvas(newProps.wrongCount);
  }

  updateCanvas(badGuesses) {
    let canvas = this.refs.canvas;
    canvas.width = canvas.width;
    let c = canvas.getContext('2d');
    c.lineWidth = 10;
    c.strokeStyle = '#F2D95E';
    c.font = 'bold 24px Optimer, Arial, Helvetica, sans-serif';
    c.fillStyle = 'red';
    drawLine(c, [20,190], [180,190]);
    drawLine(c, [30,185], [30,10]);
    c.lineTo(147,10);
    c.stroke();
    c.lineWidth = 3;
    drawLine(c, [145,15], [145,30]);
    if (badGuesses > 0) {
        // draw head
        c.strokeStyle = '#6F6E72';
        c.beginPath();
        c.moveTo(160, 45);
        c.arc(145, 45, 15, 0, (Math.PI/180)*360);
        c.stroke();

        if (badGuesses > 1) {
            // draw body
            drawLine(c, [145,60], [145,130]);
        }
        if (badGuesses > 2) {
            // draw left arm
            drawLine(c, [145,80], [110,90]);
        }
        if (badGuesses > 3) {
            // draw right arm
            drawLine(c, [145,80], [180,90]);
        }
        if (badGuesses > 4) {
            // draw left leg
            drawLine(c, [145,130], [130,170]);
        }
        if (badGuesses > 5) {
            // draw right leg and end game
            drawLine(c, [145,130], [160,170]);
            c.fillText('Game over', 45, 110);
        }
    }

    function drawLine(context, from, to) {
      context.beginPath();
      context.moveTo(from[0], from[1]);
      context.lineTo(to[0], to[1]);
      context.stroke();
    }
  }

  render() {
      return (
          <canvas ref="canvas" width={200} height={200}/>
      );
  }
}
```

####NewGameButton Component

src/components/NewGameButton.js

```javascript
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
```

##Add Styles

src/styles/index.css
```
body {
  background-color: #87D1D4;
}

.WordToGuess {
  margin-bottom: 40px;
}

.NewGameButton,
.NewGameButton:hover,
.NewGameButton:active:focus,
.NewGameButton:focus {
   background-color: #FF5722;
   color: #fff;
   border: none;
   border-radius: 0;
}

.wrong-guessed-letter {
  margin: 5px;
  color: red;
}
```

src/styles/App.css
```
.App__wrong-guesses {
  font-size: 18px;
}
```
src/styles/Dash.css
```
.Dash {
  font-size: 50px;
}

@media (max-width: 768px) {
  .Dash {
    font-size: 20px;
  }
}
```

src/styles/GuessForm.css
```
.GuessForm {
  width: 120px;
  margin: 0 auto;
}

.GuessForm__input {
  width: 120px;
}

.GuessForm__button {
  background-color: #00897b;
  color: #fff;
  border: none;
  border-radius: 0;
}
```

##Webpack Configuration

Create webpack.config.js file in root directory:

```
module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      { test: /\.css$/, loader: "style!css!" }
    ]
  },
  devServer: {
    contentBase: "./public",
    colors: true,
    historyApiFallback: true,
    inline: true
  }
};
```

* Add start script to package.json file.
```
"scripts": {
  "start": "node_modules/.bin/webpack-dev-server --progress"
},
```

* Add .gitignore file:
```
node_modules
.DS_Store
npm-debug.log
```

* Run `npm start` and visit http://localhost:8080/
