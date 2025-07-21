"use client";

import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt
} from "react-icons/fa";

export default function Contact() {
  return (
    <Container className="py-5 min-vh-100 overflow-hidden">
      <Row className="justify-content-center text-center mb-5">
        <Col xs={12} lg={8}>
          <h1 className="fw-bold display-4">
            Get In <span className="text-primary">Touch</span>
          </h1>
          <p className="text-center fs-5">
            Have a project in mind or want to collaborate? Feel free to reach
            out. I’m always open to discussing new opportunities.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center align-items-center g-5">
        <Col
          xs={12}
          md={6}
          lg={5}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <h5 className="fw-bold mb-4">Contact Information</h5>
          <ListGroup variant="flush" className="mb-4">
            <ListGroup.Item className="bg-transparent border-0 d-flex align-items-center px-0 py-2">
              <div className="me-3 p-2 bg-primary bg-opacity-10 rounded-circle">
                <FaEnvelope className="text-primary fs-4" />
              </div>
              <div>
                <div className="fw-bold">Email</div>
                <span className="text-muted">aljog786@gmail.com</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent border-0 d-flex align-items-center px-0 py-2">
              <div className="me-3 p-2 bg-primary bg-opacity-10 rounded-circle">
                <FaPhoneAlt className="text-primary fs-4" />
              </div>
              <div>
                <div className="fw-bold">Phone</div>
                <span className="text-muted">+91 (954) 489‑8287</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent border-0 d-flex align-items-center px-0 py-2">
              <div className="me-3 p-2 bg-primary bg-opacity-10 rounded-circle">
                <FaMapMarkerAlt className="text-primary fs-4" />
              </div>
              <div>
                <div className="fw-bold">Location</div>
                <span className="text-muted">Kerala, India</span>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col xs={12} md={6} lg={5}>
          <Card className="rounded-4 shadow-lg border-0 bg-body-tertiary">
            <Card.Body className="p-4 p-lg-5">
              <Card.Title as="h5" className="fw-bold text-center mb-4">
                Send a Message
              </Card.Title>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Your Name</Form.Label>
                  <Form.Control type="text" placeholder="Your name" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Your Email</Form.Label>
                  <Form.Control type="email" placeholder="example@email.com" />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Your Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Hello, I'd like to talk about..."
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 rounded-pill"
                >
                  Send Message
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
