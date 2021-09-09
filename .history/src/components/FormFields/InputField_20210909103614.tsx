import { Input } from "antd";
import React, { InputHTMLAttributes } from "react";
import { useController } from "react-hook-form";
import { Control } from "react-hook-form";
import { Form, Button } from "antd";

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
    <Form.Item rules={[{ required: invalid, message: error?.message }]}>
      <Input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={label}
      />
    </Form.Item>
  );
}
