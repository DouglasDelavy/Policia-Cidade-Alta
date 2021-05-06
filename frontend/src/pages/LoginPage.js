import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { Input, Button, Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import api from "@src/services/api";
import history from "@src/history";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onFinish = async (userDto) => {
    try {
      setLoading(true);

      const {
        data: { token, user },
      } = await api.post("/user", JSON.stringify(userDto));

      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        localStorage.setItem("token", token);

        dispatch({ type: "AUTHENTICATE", payload: true });
        dispatch({
          type: "CHANGE_USERNAME",
          payload: user.userName,
        });

        history.push("/home");
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Content>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Preencha o seu nome!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Nome"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Preencha a sua senha!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Senha"
            />
          </Form.Item>

          <Form.Item>
            <ContentFooter>
              <Button type="primary" htmlType="submit" loading={loading}>
                Entrar
              </Button>

              <Link to="/register">Registrar</Link>
            </ContentFooter>
          </Form.Item>
        </Form>
      </Content>
    </Container>
  );
};

const Content = styled.div`
  width: 25%;
  height: 35%;
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

export default LoginPage;
