import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "antd";
import { InputField } from "components/FormFields/InputField";
import { PasswordField } from "components/FormFields/PasswordField";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export interface Account {
  name: string;
  password: string;
}

export interface AccountFormProps {
  initialValues?: Account;
  onSubmit?: (formValues: Account) => void;
}

const schema = yup.object().shape({
  fullname: yup.string().required("Please enter full name"),
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
    console.log(formValues);
  };

  return (
    <Form onFinish={handleSubmit(handleFormSubmit)}>
      <InputField name="fullname" label="Full Name" control={control} />

      <PasswordField name="password" label="Pass word" control={control} />

      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
