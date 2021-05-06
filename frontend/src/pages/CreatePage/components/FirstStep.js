import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Input from "@src/components/Input";
import TextArea from "@src/components/TextArea";

const FirstStep = ({ setNextStep }) => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);

  const [name, setName] = useState(form.name);
  const [description, setDescription] = useState(form.description);

  const onNext = () => {
    let error = "";

    if (name.length <= 0) error = "O campo nome deve ser preenchido";
    if (description.length <= 0)
      error = "O campo descrição deve ser preenchido";

    if (error) {
      toast.info(error);
      return;
    }

    dispatch({ type: "CHANGE_FORM_NAME", payload: name });
    dispatch({ type: "CHANGE_FORM_DESCIPTION", payload: description });

    setNextStep();
  };

  return (
    <Container>
      <Form>
        <Input
          label="Nome"
          value={name}
          placeholder="Preencha com o nome"
          onChange={(event) => setName(event.target.value)}
        />

        <TextArea
          value={description}
          label="Descrição"
          maxLength="500"
          placeholder="Preencha com a descrição"
          onChange={(event) => setDescription(event.target.value)}
        />
      </Form>

      <Footer>
        <Button type="primary" onClick={onNext}>
          Próximo
        </Button>
      </Footer>
    </Container>
  );
};

const Form = styled.form`
  width: 35%;
  height: 80%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Footer = styled.div`
  width: 15%;

  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  align-self: flex-end;
`;

const Container = styled.div`
  width: 100%;
  height: 90%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default FirstStep;
