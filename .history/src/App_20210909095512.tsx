import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import OnboardingForm from "./features/onboarding/component/OnboardingForm";

function App() {
  return (
    <div className="App">
      <OnboardingForm />
    </div>
  );
}

export default App;
