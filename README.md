## Cách tổ chức Form Module 

- Package: [React Hook Form](https://react-hook-form.com/)
- Form Validation: [Yup](https://github.com/jquense/yup)
- Helper: [Validation Resolver](https://github.com/react-hook-form/resolvers)
- Error Message: [ErrorMessage](https://react-hook-form.com/api/useformstate/errormessage)

>  npm install react-hook-form yup @hookform/resolvers @hookform/error-message

Nguyên tắc cần nhớ:

- 1 form gồm nhiều form field.
- Form field là cầu nối giữa form và UI control, giúp bind form values vào UI control.
- UI control là các thẻ input, select hay các custom component của UI lib (Material UI, And Design, Reactstrap,..)

![Screen Shot 2021-09-09 at 22 49 37](https://user-images.githubusercontent.com/63298399/132719432-ebd5fe78-08d8-424e-b5da-fb7a415e2c74.png)


## Custom Field 

- Cầu nối giữa UI control và React Hook Form.
- UI control là một controlled component với props: 
  - name: tên xác định control
  - value: giá trị của control
  - onChange: trigger hàm này với giá trị mới khi có thay đổi
  - onBlur: xác định khi nào thì control này bị touched

InputField

```js
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

  console.log(error?.message);

  return (
    <Form.Item
      label={label}
      name={name}
      help={error?.message}
      validateStatus={invalid ? "error" : "success"}
    >
      <Input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={label}
        ref={ref}
      />
    </Form.Item>
  );
}

```
PasswordField

```js
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

```
##  Form Component
OnboardingForm

```js
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "antd";
import { InputField } from "components/FormFields/InputField";
import { PasswordField } from "components/FormFields/PasswordField";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export interface Account {
  fullname: string;
  password: string;
}

export interface AccountFormProps {
  initialValues?: Account;
  onSubmit?: (formValues: Account) => void;
}

const schema = yup.object().shape({
  fullname: yup.string().required("Please enter your full name"),
  password: yup.string().required("Please enter your password"),
});

export default function OnboardingForm({
  initialValues,
  onSubmit,
}: AccountFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Account>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: Account) => {
    try {
      await onSubmit?.(formValues);

      // time of loading
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    } catch (error) {
      console.log("Failed to submit form value: ", error);
    }
  };

  return (
    <Form
      onFinish={handleSubmit(handleFormSubmit)}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <InputField name="fullname" label="Full Name" control={control} />

      <PasswordField name="password" label="Password" control={control} />

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button block type="primary" htmlType="submit" loading={isSubmitting}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
