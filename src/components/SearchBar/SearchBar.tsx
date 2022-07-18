import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Button from "../UI/Button"

import styles from './SearchBar.scss'

const SearchBar = () => {
  const { searchQuery } = useParams()
  const [input, setInput] = useState(searchQuery || '')
  let navigate = useNavigate()

  const handleSearchInput = (event: any) => {
    setInput(event.target.value)
  }

  const handleSearchClick = () => {
    navigate(`/search/${input}`, { replace: true })
  }

  return (
    <div className={styles["search-bar"]}>
      <h2>Find your movie</h2>
      <div className={styles["search-bar--content"]}>
        <input
          type="text"
          className={styles["search"]}
          value={input}
          onChange={handleSearchInput}
        />
        <Button
          primary
          classes={styles["search-button"]}
          onClick={handleSearchClick}
        >
          Search
        </Button>
      </div>
    </div>
  )
}

export default SearchBar