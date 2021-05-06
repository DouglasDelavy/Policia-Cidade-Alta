import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Pagination, Input, Button } from "antd";

import Title from "@src/components/Title";
import Table from "./components/Table";
import api from "@src/services/api";
import history from "@src/history";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    fetchMore("", 0);
  }, []);

  const fetchMore = async (filter = "", page = 0) => {
    const { data } = await api.get("code", {
      params: {
        page,
        filter,
      },
    });

    setData(data.data);
    setCount(data.count);
  };

  const onDelete = async (id) => {
    await api.delete("/code", {
      params: {
        id,
      },
    });

    const newData = data.filter((code) => code.id !== id);
    setData(newData);

    toast.success("Código Penal apagado com sucesso");
  };

  return (
    <Container>
      <Header>
        <Title text={"Código Penal"} />

        <HeaderRight>
          <InputSearch
            placeholder={"Pesquisar"}
            enterButton="Buscar"
            onSearch={(e) => {
              fetchMore(e);
            }}
          />
          <Button type="primary" onClick={() => history.push("/create")}>
            Adicionar
          </Button>
        </HeaderRight>
      </Header>

      <Main>
        <Table data={data} onDelete={onDelete} />
        <Pagination
          simple
          defaultCurrent={1}
          total={count}
          onChange={(value) => fetchMore("", value - 1)}
        />
      </Main>
    </Container>
  );
};

const HeaderRight = styled.div`
  width: 35%;
  gap: 1rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const InputSearch = styled(Input.Search)`
  width: 50%;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
`;

const Header = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default HomePage;
