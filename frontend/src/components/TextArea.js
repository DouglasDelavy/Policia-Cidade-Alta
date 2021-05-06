import React from "react";
import styled from "styled-components";

const TextArea = ({ label, ...rest }) => {
  return (
    <>
      {label && <Label>{label}</Label>}
      <Content {...rest} />
    </>
  );
};

const Content = styled.textarea`
  width: 100%;
  height: 25%;

  margin-right: 0.5rem;

  border: 0;
  color: #000;

  resize: none;
  outline-color: #f9b236;
  padding: 0.25rem;

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

export default TextArea;
