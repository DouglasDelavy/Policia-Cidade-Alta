import React, { memo } from "react";
import styled from "styled-components";

import { Popconfirm } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import history from "@src/history";
import { convertValueToLocaleString } from "@src/utils/convertValueToLocaleString";

const Table = ({ data, onDelete }) => {
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data</th>
            <th>Multa</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td onClick={() => history.push(`/home/${item.id}`)}>
                {item.name}
              </td>
              <td>
                {format(parseISO(item.date), "dd/MM/yy", {
                  locale: ptBR,
                })}
              </td>
              <td>{convertValueToLocaleString(item.penality)}</td>
              <td>{item.status}</td>
              <td className="actions">
                <Popconfirm
                  title="Deseja Apagar"
                  onConfirm={() => onDelete(item.id)}
                >
                  <DeleteTwoTone twoToneColor="#d11c06" />
                </Popconfirm>
                <EditTwoTone onClick={() => history.push(`/home/${item.id}`)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;

  table {
    text-align: left;
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    padding: 8px;
    max-width: 15rem;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    border-bottom: 1px solid #dcdcdc;
    background: #f0f2f5;
  }

  th:first-child {
    width: 30rem;
  }

  tbody tr:hover {
    filter: brightness(0.9);
  }

  .actions {
    width: 1rem;

    text-align: center;
  }
`;

export default memo(Table);
