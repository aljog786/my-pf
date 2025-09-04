"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaLinkedin, FaGoogle, FaGithub } from "react-icons/fa";
import { useLoginMutation } from "@/slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/slices/authSlice";
import { useRouter } from "next/navigation";

export default function LoginForm({ onSwitchTab }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();

  const router = useRouter();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      console.log("User logged in:", res);
      router.push("/");
    } catch (err) {
      console.error("Login failed", err?.data?.message || err.error);
      alert(err?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <h5 className="text-center text-white mb-3">Sign in with:</h5>
      <div className="d-flex justify-content-center gap-3 mb-3">
        <FaGoogle
          className="text-primary fs-5"
          role="button"
          onClick={() => signIn("google")}
        />
        <FaLinkedin
          className="text-primary fs-5"
          role="button"
          onClick={() => signIn("linkedin")}
        />
        <FaGithub
          className="text-primary fs-5"
          role="button"
          onClick={() => signIn("github")}
        />
      </div>
      <p className="text-center mb-3 text-white">or</p>

      <Form onSubmit={loginHandler}>
        <Form.Group className="mb-3">
          <Form.Control
            className="bg-transparent border-0 bg-gradient text-white"
            type="email"
            placeholder="Email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            className="bg-transparent border-0 bg-gradient text-white"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </Form.Group>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Form.Check
            className="text-white"
            type="checkbox"
            label="Remember me"
            defaultChecked
          />
          <a href="#" className="ms-2 text-primary text-decoration-none">
            Forgot password?
          </a>
        </div>
        <Button
          type="submit"
          variant="primary"
          className="bg-primary bg-gradient border-0 w-100"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </Form>
      <p className="text-center text-white mt-3">
        Not a member?{" "}
        <span
          role="button"
          className="text-primary"
          onClick={() => onSwitchTab("register")}
        >
          Register
        </span>
      </p>
    </>
  );
}
