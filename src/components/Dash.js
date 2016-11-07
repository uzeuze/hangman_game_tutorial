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
