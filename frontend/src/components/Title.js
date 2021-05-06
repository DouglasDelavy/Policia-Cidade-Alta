import React from "react";
import styled from "styled-components";
import histoty from "../history";

import { ArrowLeftOutlined } from "@ant-design/icons";

const Title = ({ text, color, size, isBack }) => {
  return (
    <Content color={color} size={size}>
      {isBack && <Icon onClick={() => history.back()} />}

      {text}
    </Content>
  );
};

const Icon = styled(ArrowLeftOutlined)`
  font-size: 1.5rem;

  margin-right: 0.5rem;
`;

const Content = styled.h1`
  font-weight: bold;

  font-size: ${({ size }) => (size ? size : "1.5rem")};
  color: ${({ color }) => (color ? color : "#000")};
`;

export default Title;
