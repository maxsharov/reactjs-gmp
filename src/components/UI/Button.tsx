import React, { FC } from 'react'
import classNames from "classnames"

import styles from './Button.scss'

interface ButtonProps {
  classes?: string
  children: React.ReactNode
  primary?: boolean
  outlined?: boolean
  onClick?: () => void
}

const Button: FC<ButtonProps> = ({
  classes,
  children,
  primary = false,
  outlined = false,
  onClick
}) => {
  return <button
    onClick={onClick}
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