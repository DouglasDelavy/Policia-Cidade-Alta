import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { convertValueToLocaleString } from "@src/utils/convertValueToLocaleString";

import api from "@src/services/api";
import history from "@src/history";

import Input from "@src/components/Input";
import Select from "@src/components/Select";

const SecondStep = ({ setPreviousStep }) => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);

  const [penality, setPenality] = useState(form.penality);
  const [prisonTime, setPrisonTime] = useState(form.prisonTime);
  const [statusId, setStatusId] = useState(form.status);

  const onFinish = async () => {
    await api.post("/code", {
      name: form.name,
      statusId: statusId,
      description: form.description,
      prisonTime: prisonTime,
      penality: penality,
    });

    dispatch({ type: "RESET_FORM" });
    history.push("/home");
  };

  const onPrevious = () => {
    dispatch({ type: "CHANGE_FORM_PENALITY", payload: penality });
    dispatch({ type: "CHANGE_FORM_PRISION_TIME", payload: prisonTime });
    dispatch({ type: "CHANGE_FORM_STATUS", payload: statusId });

    setPreviousStep();
  };

  return (
    <Container>
      <Form>
        <Input
          min="1"
          max="1000"
          type="number"
          label="Prisão"
          value={prisonTime}
          placeholder="Tempo de Prisão"
          onChange={(event) => setPrisonTime(parseInt(event.target.value) || 0)}
        />

        <Input
          min="1"
          max="1000"
          type="number"
          label="Multa"
          value={penality}
          placeholder="Valor da Multa"
          onChange={(event) =>
            setPenality(convertValueToLocaleString(event.target.value))
          }
        />

        <Select
          label="Status"
          value={statusId}
          onChange={(e) => setStatusId(e.target.value)}
        >
          <option value={1}>Ativo</option>
          <option value={2}>Inativo</option>
        </Select>
      </Form>
      <Footer>
        <Button onClick={onPrevious}>Anterior</Button>
        <Button type="primary" onClick={onFinish}>
          Finalizar
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

export default SecondStep;
