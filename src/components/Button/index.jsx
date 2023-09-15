import './styles.css';

import { Component } from 'react';

import P from 'prop-types';

export class Button extends Component {
  //Nas classes, as Props chegam automaticamente
  render() {
    const { text, handleClick, disabled = false } = this.props;

    return (
      <button className="button" disabled={disabled} onClick={handleClick}>
        {text}
      </button>
    );
  }
}

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  text: P.string.isRequired,
  handleClick: P.func.isRequired,
  disabled: P.bool,
};
