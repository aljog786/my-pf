"use client";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaLinkedin, FaGoogle, FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useRegisterMutation } from "@/slices/usersApiSlice";


export default function RegisterForm({ onSwitchTab }) {
  const [register, { isLoading }] = useRegisterMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await register({ name, email, password }).unwrap();
      alert("Registered successfully!");
      onSwitchTab("login");
    } catch (err) {
      alert(err?.data?.error || err.message || "Registration failed");
    }
  };

  return (
    <>
      <h5 className="text-center text-white mb-3">Sign up with:</h5>
      <div className="d-flex justify-content-center gap-3 mb-3">
        <FaGoogle className="text-primary fs-5" />
        <FaLinkedin className="text-primary fs-5" />
        <FaGithub className="text-primary fs-5" />
        <FaSquareXTwitter className="text-primary fs-5" />
      </div>
      <p className="text-center text-white mb-3">or:</p>

      <Form onSubmit={registerHandler}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Repeat password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
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
          className="w-100"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
        <p className="text-center text-white mt-3">
          Already a member?{" "}
          <span
            role="button"
            className="text-primary"
            onClick={() => onSwitchTab("login")}
          >
            Login
          </span>
        </p>
      </Form>
    </>
  );
}
