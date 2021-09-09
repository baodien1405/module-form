import React from "react";
import "./App.css";
import OnboardingForm from "./features/onboarding/component/OnboardingForm";

export interface Account {
  fullname: string;
  password: string;
}

function App() {
  const initialValues: Account = {
    fullname: "",
    password: "",
  };

  const handleOnboardingFormSubmit = (formValues: Account) => {
    // do something here
    console.log("Form values: ", formValues);
  };
  return (
    <div className="App">
      <h1>Login Form</h1>
      <div className="container">
        <OnboardingForm
          onSubmit={handleOnboardingFormSubmit}
          initialValues={initialValues}
        />
      </div>
    </div>
  );
}

export default App;
