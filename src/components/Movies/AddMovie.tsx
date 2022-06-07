import React, { FC } from 'react'

import Modal from '../UI/Modal'
import Button from "../UI/Button";

interface AddMovieProps {
  onClose: () => void
}

const AddMovie: FC<AddMovieProps> = ({
  onClose,
}) => {
  return (
    <Modal>
      <span onClick={onClose}>X</span>
      <h2>Add movie</h2>
      <form>
        <div className="form--row">
          <div className="form--item">
            <label>Title</label>
            <input type="text" />
          </div>
          <div className="form--item">
            <label>Release Date</label>
            <input type="date" />
          </div>
        </div>
        <div className="form--row">
          <input type="text" />
          <input type="text" />
        </div>
        <div className="form--row">
          <select>
            <option></option>
            <option></option>
            <option></option>
          </select>
          <input type="text" />
        </div>
        <textarea></textarea>
        <div className="form--buttons">
          <Button outlined>Reset</Button>
          <Button primary>Submit</Button>
        </div>
      </form>
    </Modal>
  )
}

export default AddMovie