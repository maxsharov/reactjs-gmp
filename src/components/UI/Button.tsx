import React, { FC } from 'react'
import classNames from "classnames"

import styles from './Button.scss'

interface ButtonProps {
  classes?: string
  children: React.ReactNode
  primary?: boolean
  outlined?: boolean
  submit?: boolean
  reset?: boolean
  onClick?: ({}) => void
}

const Button: FC<ButtonProps> = ({
  classes,
  children,
  primary = false,
  outlined = false,
  onClick,
  submit,
  reset,
}) => {
  const btnProps: React.ComponentProps<'button'> = {}

  if (submit) {
    btnProps.type = 'submit'
  } else if(reset) {
    btnProps.type = 'reset'
  } else {
    btnProps.type = 'reset'
  }

  return (
    <button
      {...btnProps}
      onClick={onClick}
      className={classNames(
        styles.button,
        {
          [styles['button--primary']]: primary,
          [styles['button--outline']]: outlined,
        },
        classes
      )}
    >
      {children}
    </button>
  )
}

export default Button