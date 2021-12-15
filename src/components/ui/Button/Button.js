import React from 'react';
import css from './Button.module.css';

function Button(props) {
    return (
        <div className={css.actions}>
        <button onClick={() => props.action()}>
          {props.label}
        </button>
      </div>
    )
}

export default Button;