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
      <form className="guessForm" onSubmit={this.handleSubmit.bind(this)} >
        <FormGroup>
          <InputGroup className="guess-input">
            <FormControl
              type="text"
              value={this.state.textValue}
              onChange={this.handleChange.bind(this)}
              autoFocus={true}
            />
            <InputGroup.Addon
              className="btn-guess"
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
