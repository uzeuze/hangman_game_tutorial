import React, {Component} from 'react';
import {FormGroup, FormControl, InputGroup, Button} from 'react-bootstrap';

export default class GuessForm extends Component {
  constructor() {
      super();
      this.state = {
        textValue: ""
      }
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
          <InputGroup>
            <FormControl type="text"
                         className="guess-input"
                         value={this.state.textValue}
                         onChange={this.handleChange.bind(this)}
            />
          </InputGroup>
          <Button type="submit">Guess</Button>
        </FormGroup>
      </form>
    );
  }
}
