import React from "react";
import styled from "styled-components";

const Select = ({ label, children, ...rest }) => {
  return (
    <>
      {label && <Label>{label}</Label>}
      <Content {...rest}>{children}</Content>
    </>
  );
};

const Label = styled.div`
  padding: 0.3rem 0.4rem;

  font-weight: bold;
  color: #000;
`;

const Content = styled.select`
  border: 0;
  outline: 0;
  padding: 0.5rem;
`;

export default Select;
