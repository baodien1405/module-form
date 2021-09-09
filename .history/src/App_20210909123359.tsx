import React from "react";
import "./App.css";
import OnboardingForm from "./features/onboarding/component/OnboardingForm";

export interface Account {
  name: string;
  password: string;
}

function App() {
  const handleOnboardingFormSubmit = (formValues: Account) => {
    // do something here
    console.log(formValues);
  };
  return (
    <div className="App">
      <div className="container">
        <OnboardingForm onSubmit={handleOnboardingFormSubmit} />
      </div>
    </div>
  );
}

export default App;
