import { Form, Input } from "antd";
import React, { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

export function PasswordField({ name, control, label }: InputFieldProps) {
  const {
    field: { onBlur, onChange, value, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <Form.Item
      label={label}
      name={name}
      help={error?.message}
      validateStatus={invalid ? "error" : "success"}
    >
      <Input.Password
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={label}
        ref={ref}
      />
    </Form.Item>
  );
}
