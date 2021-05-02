import React, { memo } from "react";
import styled from "styled-components";
import { Popconfirm } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

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
              <td>{item.name}</td>
              <td>
                {format(parseISO(item.date), "dd/MM/yyyy HH:mm", {
                  locale: ptBR,
                })}
              </td>
              <td>{item.penality}</td>
              <td>{item.status}</td>
              <td>
                <Popconfirm
                  title="Deseja Apagar"
                  onConfirm={() => onDelete(item.id)}
                >
                  <DeleteTwoTone twoToneColor="#d11c06" />
                </Popconfirm>
                <EditTwoTone />
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

  th:last-child {
    width: 5rem;
  }

  tbody tr:hover {
    filter: brightness(0.9);
  }
`;

export default memo(Table);
