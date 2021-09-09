import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "antd";
import { InputField } from "components/FormFields/InputField";
import { PasswordField } from "components/FormFields/PasswordField";
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
  fullname: yup
    .string()
    .required("Please enter full name")
    .test("two-words", "Please enter at least two words", (value) => {
      if (!value) return true;

      const parts = value?.split(" ") || [];
      return parts.filter((x) => Boolean(x)).length >= 2;
    }),
  password: yup.string().required("Please enter your password"),
});

export default function OnboardingForm({
  initialValues,
  onSubmit,
}: StudentFormProps) {
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
      <InputField name="fullname" label="Full Name" control={control} />

      <PasswordField name="password" label="Password" control={control} />

      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
