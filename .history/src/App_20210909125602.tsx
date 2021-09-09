import React from "react";
import "./App.css";
import OnboardingForm from "./features/onboarding/component/OnboardingForm";

export interface Account {
  name: string;
  password: string;
}

function App() {
  const initialValues: Account = {
    name: "",
    password: "",
  };

  const handleOnboardingFormSubmit = (formValues: Account) => {
    // do something here
    console.log("Form values: ", formValues);
  };
  return (
    <div className="App">
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
