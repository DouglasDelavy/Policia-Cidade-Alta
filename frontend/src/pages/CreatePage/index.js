import React, { useState } from "react";
import styled from "styled-components";
import { Steps } from "antd";

import Title from "@src/components/Title";
import FirstStep from "./components/FirstStep";
import SecondStep from "./components/SecondStep";

const CreatePage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const setNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const setPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    {
      title: "Nome e Descrição",
      component: <FirstStep setNextStep={setNextStep} />,
    },
    {
      title: "Multa e Prisão",
      component: <SecondStep setPreviousStep={setPreviousStep} />,
    },
  ];

  return (
    <Container>
      <Header>
        <Title text="Adicionar Código Penal" isBack />
      </Header>

      <Main>
        <Steps current={currentStep} progressDot>
          {steps.map((step, key) => (
            <Steps.Step key={key} title={step.title} />
          ))}
        </Steps>

        {steps[currentStep].component}
      </Main>
    </Container>
  );
};

const Main = styled.div`
  height: 90%;
`;

const Header = styled.div``;

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export default CreatePage;
