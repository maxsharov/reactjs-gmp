import React, { FC } from "react"

import styles from './Logo.scss'

const Logo: FC = () => {
  return <div className={styles["logo"]}>
    <span className={styles["logo--bold"]}>netflix</span>
    <span className={styles["logo--light"]}>roulette</span>
  </div>
}

export default Logo