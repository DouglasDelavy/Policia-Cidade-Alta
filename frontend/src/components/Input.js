import React from "react";
import styled from "styled-components";

const Input = ({ label, ...rest }) => {
  return (
    <>
      {label && <Label>{label}</Label>}
      <Content {...rest} />
    </>
  );
};

const Content = styled.input`
  width: 100%;
  height: auto;

  border: 0;
  color: #000;

  padding: 0.25rem;
  outline-color: #f9b236;

  border-radius: 0.25rem;
  background: #fff;
  &:focus {
    border: 1px solid #5ca0e4;
  }
`;

const Label = styled.div`
  padding: 0.3rem 0.4rem;

  font-weight: bold;
  color: #000;
`;

export default Input;
