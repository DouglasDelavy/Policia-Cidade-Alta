import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Popconfirm, Button } from "antd";

import Title from "../components/Title";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Select from "../components/Select";

import api from "../services/api";
import { toast } from "react-toastify";
import history from "../history";
import { convertValueToLocaleString } from "@src/utils/convertValueToLocaleString";

const ViewPage = ({ match }) => {
  const id = match?.params?.id;

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [penality, setPenality] = useState(0);
  const [prisonTime, setPrisonTime] = useState(0);
  const [statusId, setStatusId] = useState(1);

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`code/${id}`);

      setName(data.name);
      setDescription(data.description);
      setPenality(data.penality);
      setPrisonTime(data.prisonTime);
      setStatusId(data.statusId);

      setLoading(false);
    })();
  }, []);

  const onSave = async () => {
    await api.put(`/code/${id}`, {
      name,
      description,
      prisonTime,
      penality,
      statusId,
    });

    toast.success("Código Penal atualizado com sucesso");
    history.push("/home");
  };

  const onDelete = async () => {
    await api.delete("/code", {
      params: {
        id,
      },
    });

    toast.success("Código Penal apagado com sucesso");
    history.push("/home");
  };

  return (
    !loading && (
      <Container>
        <Title text={name} isBack />

        <Input
          label="Nome"
          value={name}
          placeholder="Nome"
          onChange={(event) => setName(event.target.value)}
        />

        <TextArea
          value={description}
          label="Descrição"
          maxLength="500"
          placeholder="Descrição"
          onChange={(event) => setDescription(event.target.value)}
        />

        <Input
          type="number"
          label="Multa"
          value={penality}
          placeholder="Valor da Multa"
          onChange={(event) =>
            setPenality(convertValueToLocaleString(event.target.value))
          }
        />

        <Input
          min="1"
          max="1000"
          type="number"
          label="Prisão"
          value={prisonTime}
          placeholder="Tempo de Prisão"
          onChange={(event) => setPrisonTime(parseInt(event.target.value) || 0)}
        />

        <Select
          label="Status"
          value={statusId}
          onChange={(e) => setStatusId(e.target.value)}
        >
          <option value={1}>Ativo</option>
          <option value={2}>Inativo</option>
        </Select>

        <Footer>
          <Popconfirm title="Deseja Apagar" onConfirm={onDelete}>
            <Button type="primary" danger>
              Deletar
            </Button>
          </Popconfirm>

          <Popconfirm title="Deseja Salvar" onConfirm={onSave}>
            <Button type="primary">Salvar</Button>
          </Popconfirm>
        </Footer>
      </Container>
    )
  );
};

const Footer = styled.div`
  margin-top: 1rem;
  gap: 1rem;

  display: flex;
  justify-content: flex-end;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default ViewPage;
