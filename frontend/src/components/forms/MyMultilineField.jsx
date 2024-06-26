import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Controller} from 'react-hook-form'

export default function MyMultiLineField(props) {
    const {id, label, placeholder, width, name,autoComplete, control} = props
  return (

    <Controller
      name = {name}
      control = {control}
      render={({
        field:{onChange, value},
        fieldState:{error},
        formState,
      }) => (

        <TextField
          sx={{ width:{width} }}
          id={id}
          name={name}
          label={label}
          multiline
          onChange={onChange}
          value={value}
          rows={1}
          variant="standard"
          placeholder = {placeholder} 
          autoComplete={autoComplete}
          error = {!!error}
          helperText = {error?.message}
        />
       )
      }  
    />

  );
}
