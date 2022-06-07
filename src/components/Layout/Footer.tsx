import React, { FC } from 'react'

import Logo from "./Logo"

import styles from './Footer.scss'

const Footer: FC = () => {
  return (
    <div className={styles['footer']}>
      <Logo />
    </div>
  )
}

export default Footer