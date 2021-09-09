import React from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import OnboardingForm from "./features/onboarding/component/OnboardingForm";

function App() {
  return (
    <div className="App">
      <div className="container">
        <OnboardingForm />
      </div>
    </div>
  );
}

export default App;
