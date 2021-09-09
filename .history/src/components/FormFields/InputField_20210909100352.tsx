import { Input } from "antd";
import React, { InputHTMLAttributes } from "react";
import { useController } from "react-hook-form";
import { Control } from "react-hook-form";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

export function InputField({ name, control, label }: InputFieldProps) {
  const {
    field: { onBlur, onChange, value },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    // <TextField
    //   fullWidth
    //   size="small"
    //   margin="normal"
    //   label={label}
    //   value={value}
    //   variant="outlined"
    //   onChange={onChange}
    //   onBlur={onBlur}
    //   inputRef={ref}
    //   error={invalid}
    //   helperText={error?.message}
    //   inputProps={inputProps}
    // />

    <Input
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={label}
    />
  );
}
