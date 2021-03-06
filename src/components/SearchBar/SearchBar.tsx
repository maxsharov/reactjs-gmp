import React from 'react'

import Button from "../UI/Button"

import styles from './SearchBar.scss'

const SearchBar = () => {
  return (
    <div className={styles["search-bar"]}>
      <h2>Find your movie</h2>
      <div className={styles["search-bar--content"]}>
        <input
          type="text"
          className={styles["search"]}
        />
        <Button
          primary
          classes={styles["search-button"]}
        >
          Search
        </Button>
      </div>
    </div>
  )
}

export default SearchBar