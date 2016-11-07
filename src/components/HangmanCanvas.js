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
