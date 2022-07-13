import React, { FC } from 'react'

import * as Yup from 'yup'
import classNames from 'classnames'

import Modal from '../UI/Modal'
import Button from '../UI/Button'
import { Movie } from './MovieCard'

import { Field, Formik, Form, useField } from 'formik'
import { allGenresList } from '../../constants'
import useToggle from '../../utils/useToggle'

import styles from './MovieForm.scss'

interface MovieFormProps extends Movie {
  heading: string
  onClose: () => void
  onSubmit?: ({}) => void
}

interface InitValuesType {
  id: number
  title: string
  vote_average: number
  runtime: number
  genres: string[]
  release_date: string
  poster_path: string
  overview: string
}

interface FieldProps {
  id?: string
  label: string
  name: string
  type: string
}

const MyTextInput = ({ label, ...props }: FieldProps) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={styles['form--error']}>{meta.error}</div>
      ) : null}
    </>
  );
};

const MovieSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required'),
  rating: Yup.number()
    .max(10, 'Max is 10'),
  runtime: Yup.number()
    .required('Required'),
  poster_path: Yup.string()
    .required('Required'),
});

const MovieForm: FC<MovieFormProps> = ({
  id,
  heading,
  title= '',
  vote_average= 0,
  runtime,
  release_date= '',
  poster_path= '',
  overview= '',
  genres= [],
  onClose,
  onSubmit,
}) => {
  const [isGenresListVisible, handleGenresListVisibility] = useToggle(false)

  const initValues: InitValuesType = {
    id,
    title,
    vote_average,
    runtime: runtime ?? 0,
    release_date,
    poster_path,
    overview,
    genres
  }

  return (
    <Modal
      heading={heading}
      onClose={onClose}
    >
      <Formik<InitValuesType>
        initialValues={initValues}
        validationSchema={MovieSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, resetForm }) => (
          <Form className={styles['form']}>
            <div className={styles['form--row']}>
              <div className={styles['form--item']}>
                <MyTextInput
                  id="title"
                  name="title"
                  type="text"
                  label="Title"
                />
              </div>
              <div className={styles['form--item']}>
                <label htmlFor="release_date">Release Date</label>
                <Field type="date" id="release_date" name="release_date" />
              </div>
            </div>

            <div className={styles['form--row']}>
              <div className={styles['form--item']}>
                <label>Movie URL</label>
                <Field id="poster_path" name="poster_path" />
                {(touched && errors.poster_path) && (<div className={styles['form--error']}>{errors.poster_path}</div>)}
              </div>
              <div className={styles['form--item']}>
                <label htmlFor="vote_average">Rating</label>
                <Field type="number" id="vote_average" name="vote_average" />
                {(touched && errors.vote_average) && (<div className={styles['form--error']}>{errors.vote_average}</div>)}
              </div>
            </div>

            <div
              className={styles['form--row']}
              role="group"
              aria-labelledby="checkbox-group"
            >
              <div className={styles['form--item']}>
                <label>Genre</label>
                <div
                  className={classNames(
                    styles['genres'],
                    isGenresListVisible && styles['genres--opened']
                    )}
                >
                  <input
                    className={styles['genres--input']}
                    value="Select Genre"
                    onClick={handleGenresListVisibility}
                    readOnly
                  />
                  <div className={classNames(
                    styles['checkbox-group'],
                    !isGenresListVisible && styles['genres--title-hide'],
                  )}>
                    {allGenresList.map(genreItem => {
                      const genreLowerCase = genreItem.toLowerCase()

                      return (
                        <div key={genreItem} className={styles['checkbox-item']}>
                          <Field
                            id={genreLowerCase}
                            type="checkbox"
                            name="genres"
                            value={genreItem}
                            className={styles['checkbox-item--input']}
                          />
                          <label
                            className={styles['checkbox-item--label']}
                            htmlFor={genreLowerCase}
                          >
                            {genreItem}
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className={styles['form--item']}>
                <label htmlFor="rating">Runtime</label>
                <Field type="number" id="runtime" name="runtime" />
                {(touched && errors.runtime) && (<div className={styles['form--error']}>{errors.runtime}</div>)}
              </div>
            </div>
            <div className={styles['form--row']}>
              <div className={styles['form--item']}>
                <label>Overview</label>
                <Field as="textarea" name="overview" />
              </div>
            </div>
            <div className={styles['form--buttons']}>
              <Button onClick={resetForm} outlined>Reset</Button>
              <Button primary submit>Submit</Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default MovieForm