import React, { FC } from 'react'
import classNames from "classnames"

import styles from './Button.scss'

interface ButtonProps {
  classes?: string
  children: any
  primary?: boolean
  outlined?: boolean
}

const Button: FC<ButtonProps> = ({
  classes,
  children,
  primary = false,
  outlined = false,
}) => {
  return <button
    className={classNames(
      styles.button,
      {
        [styles['button--primary']]: primary,
        [styles['button--outline']]: outlined,
      },
      classes
    )}
  >{children}</button>
}

export default Button