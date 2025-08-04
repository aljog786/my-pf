"use client";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Container, Card, Tab, Nav } from "react-bootstrap";
import LoginForm from "../../components/auth/LoginForm"; // adjust path as needed
import RegisterForm from "../../components/auth/RegisterForm"; // adjust path as needed
import "../auth/page.scss";

export default function AuthPage() {
  const { isDark } = useTheme();
  const [key, setKey] = useState("login");

  return (
    <Container className="d-flex justify-content-center align-items-center my-3">
      <Card
        className={`p-4 rounded-4 ${
          isDark ? "bg-transparent border-1" : "bg-dark  bg-gradient border-0"
        }`}
      >
        <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
          <Nav variant="pills" className="mb-3 justify-content-center">
            <Nav.Item>
              <Nav.Link className="rounded-pill text-white" eventKey="login">
                Login
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="rounded-pill text-white" eventKey="register">
                Register
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="login">
              <LoginForm onSwitchTab={setKey} />
            </Tab.Pane>
            <Tab.Pane eventKey="register">
              <RegisterForm onSwitchTab={setKey} />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Card>
    </Container>
  );
}
