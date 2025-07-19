"use client";

import Link from "next/link";
import NavLink from "./nav-link";
import ThemeToggle from "../theme-toggler/theme-toggler";
import { useState } from "react";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";

export default function MainHeader() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const toggleOffcanvas = () => setShowOffcanvas((prev) => !prev);
  const closeOffcanvas = () => setShowOffcanvas(false);

  return (
    <Navbar expand="lg" className=" px-3" sticky="top">
      <Container
        fluid
        className="d-flex justify-content-between align-items-center bg-dark bg-opacity-50 backdrop-blur rounded-3"
      >
        <Link className="navbar-brand fs-4 fw-bold text-primary" href="/">
          {"<ALJO/>"}
        </Link>
        <Navbar.Offcanvas
          id="main-navbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          show={showOffcanvas}
          onHide={closeOffcanvas}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="mx-auto flex-column flex-lg-row align-items-center gap-3 text-center">
              <Nav.Item>
                <NavLink href="/skills" onClick={closeOffcanvas}>
                  Skills
                </NavLink>
              </Nav.Item>

              <Nav.Item>
                <NavLink href="/about" onClick={closeOffcanvas}>
                  About
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink href="/auth" onClick={closeOffcanvas}>
                  Account
                </NavLink>
              </Nav.Item>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <div className="d-flex align-items-center gap-2">
          <ThemeToggle className="" />

          <Navbar.Toggle
            aria-controls="main-navbar"
            onClick={toggleOffcanvas}
            className="border-0"
          />
        </div>
      </Container>
    </Navbar>
  );
}
