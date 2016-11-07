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
