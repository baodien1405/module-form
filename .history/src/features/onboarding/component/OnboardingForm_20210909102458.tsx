import { Form, Button } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "app/hooks";
import { InputField } from "./../../../components/FormFields/InputField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export interface Student {
  name: string;
  password: string;
}

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter name")
    .test("two-words", "Please enter at least two words", (value) => {
      if (!value) return true;

      const parts = value?.split(" ") || [];
      return parts.filter((x) => Boolean(x)).length >= 2;
    }),
});

export default function OnboardingForm({
  initialValues,
  onSubmit,
}: StudentFormProps) {
  const [error, setError] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (formValues: Student) => {
    console.log(formValues);
  };

  return (
    <Form onFinish={handleSubmit(handleFormSubmit)}>
      <Form.Item rules={[{ required: true, message: error }]}>
        <InputField name="name" label="Full Name" control={control} />
      </Form.Item>

      <Form.Item rules={[{ required: true, message: error }]}>
        <InputField name="password" label="Password" control={control} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
