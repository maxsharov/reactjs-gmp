import React, { FC } from 'react'

import styles from './Modal.scss'

interface ModalProps {
  heading?: string
  children?: React.ReactNode
  onClose: () => void
}

const Modal:FC<ModalProps> = ({
  heading,
  children,
  onClose
}) => {
  return (
    <div className={styles['modal']}>
      <div className={styles['modal--content']}>
        <span
          onClick={onClose}
          className={styles['close']}
        />
        <div className={styles['modal--heading']}>{heading}</div>
        {children}
      </div>
    </div>
  )
}

export default Modal
