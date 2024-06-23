import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';

export default function MySelectField(props) {
  const { id, label, name, control, width, autoComplete, options, onChangeExtra } = props;

  return (
    <FormControl variant="standard" sx={{ width }}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <Select
            labelId={`${id}-label`}
            id={id}
            name={name}
            onChange={(e) => {
              onChange(e);
              if (onChangeExtra) {
                onChangeExtra(e);
              }
            }}
            value={value || ''}
            autoComplete={autoComplete}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
}
