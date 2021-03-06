import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

import {
  Button,
  Typography,
} from '@material-ui/core'

const AuthorForm = ({ show, notify, authors }) => {

  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [selectedOption, setSelectedOption] = useState('')

  const options = authors.map(function (author) {
    return { value: author.name, label: author.name }
  })

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption)
    console.log('Option selected:', selectedOption.value)
    setName(selectedOption.value)
  }

  const [changeYear, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    /* onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    } */
  })

  useEffect(() => {
    if (result.data && !result.data.editAuthor) {
      notify('name not found')
    }
  }, [result.data]) // eslint-disable-line

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    changeYear({ variables: { name, year } })

    setName('')
    setYear('')
  }

  return (
    <div>
      <Typography variant='h5'>Change number</Typography>

      <form onSubmit={submit} style={{ width: 600 }}>
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={options}
        />
        <div style={{ width: 600, marginTop: 10 }}>
          year <input
            value={year}
            onChange={({ target }) => setYear(parseInt(target.value))}
          />
        </div>
        <Button type='submit'>change year</Button>
      </form>
    </div>
  )
}

export default AuthorForm