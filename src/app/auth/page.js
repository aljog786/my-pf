"use client";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Container, Button, Form, Tab, Nav, Card } from "react-bootstrap";
import { FaLinkedin, FaGoogle, FaGithub } from "react-icons/fa";
import "../auth/page.scss";

export default function AuthPage() {
  const { isDark } = useTheme();
  const [key, setKey] = useState("login");

  return (
    <Container className="d-flex justify-content-center align-items-center p-5">
      <Card
        className={`p-5 border-3 rounded-5 ${
          isDark ? "bg-transparent" : "bg-dark"
        }`}
      >
        <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
          <Nav variant="pills" className="mb-3 justify-content-center ">
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
            {/* Login Form */}
            <Tab.Pane eventKey="login">
              <h5 className="text-center text-white mb-3">Sign in with:</h5>
              <div className="d-flex justify-content-center gap-3 mb-3">
                <FaGoogle className="text-primary fs-5" />
                <FaLinkedin className="text-primary fs-5" />
                <FaGithub className="text-primary fs-5" />
              </div>
              <p className="text-center mb-3 text-white">or</p>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Email or username" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Form.Check
                    className="text-white"
                    type="checkbox"
                    label="Remember me"
                    defaultChecked
                  />
                  <a
                    href="#"
                    className="ms-2 text-primary text-decoration-none"
                  >
                    Forgot password?
                  </a>
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  className="bg-gradient border-0 w-100"
                >
                  Login
                </Button>
              </Form>
              <p className="text-center text-white mt-3">
                Not a member?{" "}
                <span
                  role="button"
                  className="text-primary"
                  onClick={() => setKey("register")}
                >
                  Register
                </span>
              </p>
            </Tab.Pane>

            {/* Register Form */}
            <Tab.Pane eventKey="register">
              <h5 className="text-center text-white mb-3">Sign up with:</h5>
              <div className="d-flex justify-content-center gap-3 mb-3">
                <FaGoogle className="text-primary fs-5" />
                <FaLinkedin className="text-primary fs-5" />
                <FaGithub className="text-primary fs-5" />
              </div>
              <p className="text-center text-white mb-3">or:</p>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Name" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Username" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="email" placeholder="Email" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="password" placeholder="Repeat password" />
                </Form.Group>
                <Form.Check
                  type="checkbox"
                  label="I have read and agree to the terms"
                  className="text-white mb-3"
                  defaultChecked
                />
                <Button
                  type="submit"
                  variant="primary"
                  bg="gradient"
                  className="w-100 "
                >
                  Register
                </Button>
                <p className="text-center text-white mt-3">
                  Already a member?{" "}
                  <span
                    role="button"
                    className="text-primary"
                    onClick={() => setKey("login")}
                  >
                    Login
                  </span>
                </p>
              </Form>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Card>
    </Container>
  );
}
