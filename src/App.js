import React from "react";
import "./App.css";
import Container from "./components/Container";
import { FormProvider } from "./components/FormContext/FormContext";
import FormWrapper from "./components/FormWrapper";
import Heading from "./components/Heading";

const App = () => {
  return (
    <div className="App">
      <FormProvider>
        <Container>
          <Heading />
          <FormWrapper />
        </Container>
      </FormProvider>
    </div>
  );
};

export default App;
