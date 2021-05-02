import React from "react";
import styled from "styled-components";

const Title = ({ text, color, size }) => {
  return (
    <Content color={color} size={size}>
      {text}
    </Content>
  );
};

const Content = styled.h1`
  font-weight: bold;

  font-size: ${({ size }) => (size ? size : "1.5rem")};
  color: ${({ color }) => (color ? color : "#000")};
`;

export default Title;
