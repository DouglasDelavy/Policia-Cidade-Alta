import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Input, Button, Form } from "antd";

import history from "@src/history";
import api from "@src/services/api";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (value) => {
    try {
      setLoading(true);

      await api.post("/user/create", {
        userName: value.username,
        password: value.password,
      });

      history.push("/");
    } catch {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Content>
        <Form
          name="register"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Preencha seu Nome",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Preencha sua senha!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Senha" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Confirme sua senha!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("As senhas não batem!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirmar Senha" />
          </Form.Item>

          <Form.Item>
            <ContentFooter>
              <Link to="/">Login</Link>

              <Button type="primary" htmlType="submit" loading={loading}>
                Registrar
              </Button>
            </ContentFooter>
          </Form.Item>
        </Form>
      </Content>
    </Container>
  );
};

const Content = styled.div`
  width: 25%;
  height: 50%;
  padding: 1rem;

  background: #fff;
`;

const ContentFooter = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default RegisterPage;
