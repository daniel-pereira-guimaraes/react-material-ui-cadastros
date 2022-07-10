import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useState } from "react";

type TVTextFieldProps = TextFieldProps & {
  name: string;
}

export const VTextField: React.FC<TVTextFieldProps> = ({ name, ...rest }) => {

  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);
  const [ value, setValue ] = useState(defaultValue || '');

  useEffect(() => {
    registerField({
      name: fieldName, 
      getValue: () => value, 
      setValue: (ref, newValue) => setValue(newValue)
    });
  }, [registerField, fieldName, value]);

  return (
    <TextField 
      size="small"
      {...rest} 
      defaultValue={defaultValue}
      value={value}
      error={!!error}
      helperText={error}
      onChange={e => {
        setValue(e.target.value);
        rest.onChange?.(e);
      }}
      onKeyDown={(e) => {
        error && clearError();
        rest.onKeyDown?.(e);
      }}
    />
  );
};