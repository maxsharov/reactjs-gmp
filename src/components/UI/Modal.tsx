import React, { FC } from 'react'

import styles from './Modal.scss'

interface ModalProps {
  children: any
}

const Modal:FC<ModalProps> = (props) => {
  return (
    <div className={styles['modal']}>
      <div className={styles['modal--content']}>
        {props.children}
      </div>
    </div>
  )
}

export default Modal
