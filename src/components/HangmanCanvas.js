import React, {Component} from 'react';

export default class HangmanCanvas extends Component {
  componentDidMount() {
      this.updateCanvas(this.props.wrongCount);
  }

  shouldComponentUpdate() {
      return true;
  }

  componentWillReceiveProps(newProps) {
      this.updateCanvas(newProps.wrongCount);
  }
  updateCanvas(wrongCount) {
    console.log(wrongCount);
    let badGuesses = wrongCount;
    let canvas = this.refs.canvas;
    canvas.width = canvas.width;
    let c = canvas.getContext('2d');
    c.lineWidth = 10;
    c.strokeStyle = 'green';
    c.font = 'bold 24px Optimer, Arial, Helvetica, sans-serif';
    c.fillStyle = 'red';
    // draw the ground
    drawLine(c, [20,190], [180,190]);
    // start building the gallows if there's been a bad guess
    if (badGuesses > 0) {
        // create the upright
        c.strokeStyle = '#A52A2A';
        drawLine(c, [30,185], [30,10]);
        if (badGuesses > 1) {
            // create the arm of the gallows
            c.lineTo(150,10);
            c.stroke();
        }
        if (badGuesses > 2) {
            c.strokeStyle = 'black';
            c.lineWidth = 3;
            // draw rope
            drawLine(c, [145,15], [145,30]);
            // draw head
            c.beginPath();
            c.moveTo(160, 45);
            c.arc(145, 45, 15, 0, (Math.PI/180)*360);
            c.stroke();
        }
        if (badGuesses > 3) {
            // draw body
            drawLine(c, [145,60], [145,130]);
        }
        if (badGuesses > 4) {
            // draw left arm
            drawLine(c, [145,80], [110,90]);
        }
        if (badGuesses > 5) {
            // draw right arm
            drawLine(c, [145,80], [180,90]);
        }
        if (badGuesses > 6) {
            // draw left leg
            drawLine(c, [145,130], [130,170]);
        }
        if (badGuesses > 7) {
            // draw right leg and end game
            drawLine(c, [145,130], [160,170]);
            c.fillText('Game over', 45, 110);
            // remove the alphabet pad
            letters.innerHTML = '';
            // display the correct answer
            // need to use setTimeout to prevent race condition
            setTimeout(showResult, 200);
            // increase score of lost games
            // display the score after two seconds
            // code to be added later
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
          <canvas ref="canvas" width={300} height={300}/>
      );
  }
}
