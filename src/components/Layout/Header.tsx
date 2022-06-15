import React, {FC, memo} from 'react'

import SearchBar from "../SearchBar/SearchBar"
import Button from "../UI/Button"
import Logo from './Logo'

import styles from './Header.scss'

const Header: FC<{ handleAddMovie: () => void }> = ({
  handleAddMovie
}) => {
  return <div className={styles["header"]}>
    <div className={styles["top-section"]}>
      <Logo />
      <div className="add-movie-btn">
        <Button
          onClick={handleAddMovie}
          outlined
        >+ ADD MOVIE</Button>
      </div>
    </div>
    <SearchBar/>
  </div>
}

export default memo(Header)