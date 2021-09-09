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
    field: { onBlur, onChange, value },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <Form.Item rules={[{ required: invalid, message: error?.message }]}>
      <Input.Password
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={label}
      />
    </Form.Item>
  );
}
