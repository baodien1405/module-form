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
    try {
      await onSubmit?.(formValues);
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
        <Button
          type="primary"
          htmlType="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
