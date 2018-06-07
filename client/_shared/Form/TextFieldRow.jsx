// @flow

import React from 'react'

import TextField from '@material-ui/core/TextField'

type Props = {
  field: any; // TODO add correct flow type
  label: string;
  type: string;
  error?: string;
  className?: string;
};

const TextFieldRow = (props: Props) => {
  const { field, label, type, error, ...other } = props

  return (
    <TextField
      label={label}
      type={type}
      error={!!error}
      helperText={error}
      className={props.className}
      { ...field }
      { ...other }
    />
  )
}

TextFieldRow.defaultProps = {
  type: 'text'
}

export default TextFieldRow
