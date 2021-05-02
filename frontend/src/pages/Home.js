import React from "react";
import styled from "styled-components";
import { Input, Button, Pagination } from "antd";

import Title from "../components/Title";
import Table from "../components/Table";
import api from "../services/api";

const Home = () => {
  const [data, setData] = React.useState([]);
  const [count, setCount] = React.useState(1);

  React.useEffect(() => {
    fecthMore("", 0);
  }, []);

  const fecthMore = async (filter = "", page = 0) => {
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
    const response = await api.delete("/code", {
      params: {
        id,
      },
    });

    const newData = data.filter((code) => code.id !== id);
    setData(newData);
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
              fecthMore(e);
            }}
          />
          <Button type="primary">Adicionar</Button>
        </HeaderRight>
      </Header>

      <Main>
        <Table data={data} onDelete={onDelete} />
        <Pagination
          simple
          defaultCurrent={1}
          total={count}
          onChange={fecthMore}
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

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
`;

const InputSearch = styled(Input.Search)`
  width: 50%;
`;

const Header = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Container = styled.div``;

export default Home;
