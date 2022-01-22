import React from 'react';
import css from './Button.module.css';

export function Button(props) {
    return (
        <div className={css.actions}>
        <button type="button" onClick={() => props.onClick()}>
          {props.label}
        </button>
      </div>
    )
}

export default Button;