import { Form, Input } from "antd";
import React, { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

export function InputField({ name, control, label }: InputFieldProps) {
  const {
    field: { onBlur, onChange, value, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <Form.Item label={label} name={name} rules={[{ message: error?.message }]}>
      <Input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={label}
      />
    </Form.Item>
  );
}