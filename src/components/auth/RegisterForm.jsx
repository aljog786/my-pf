"use client";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaLinkedin, FaGoogle, FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function RegisterForm({ onSwitchTab }) {

  const registerHandler = async (e) => {
    e.preventDefault();
    // handle registration
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
        <Button type="submit" variant="primary" className="w-100">
          Register
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
