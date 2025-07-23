"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import NavLink from "./nav-link";
import ThemeToggle from "../theme-toggler/theme-toggler";
import { useLogoutMutation } from "@/slices/usersApiSlice";
import { logout as logoutAction } from "@/slices/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import {
  Navbar,
  Container,
  Nav,
  Offcanvas,
  Modal,
  Button,
} from "react-bootstrap";

export default function MainHeader() {
  const router = useRouter();

  const dispatch = useDispatch();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const toggleOffcanvas = () => setShowOffcanvas((prev) => !prev);
  const closeOffcanvas = () => setShowOffcanvas(false);

  const handleModalOpen = () => {
    closeOffcanvas();
    setShowModal(true);
  };
  const handleModalClose = () => setShowModal(false);

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutAction());
      handleModalClose();
      router.push("/auth");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
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
                  {userInfo ? (
                    <Button
                      className="bg-transparent fs-5 border-0  p-0"
                      onClick={handleModalOpen}
                    >
                      {userInfo.name}
                    </Button>
                  ) : (
                    <NavLink href="/auth" onClick={closeOffcanvas}>
                      Account
                    </NavLink>
                  )}
                </Nav.Item>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>

          <div className="d-flex align-items-center gap-2">
            <ThemeToggle />
            <Navbar.Toggle
              aria-controls="main-navbar"
              onClick={toggleOffcanvas}
              className="border-0"
            />
          </div>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">
            Hello, {userInfo?.name}!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure want to logout ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="border-0 bg-danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
