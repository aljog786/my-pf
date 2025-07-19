"use client";

import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaCode, FaPalette, FaProjectDiagram } from "react-icons/fa";
import "../about/page.scss";

export default function AboutPage() {
  return (
    <section className="text-white text-center py-5">
      <Container>
        <h2 className="fw-bold display-5 mb-4">
          About <span className="text-primary">Me</span>
        </h2>
        <Row>
          <Col>
            <p className="lead fw-semibold text-muted mb-4">
              Passionate Web Developer
            </p>
            <p className="mx-auto text-muted">
              With over 3 years of experience in web development, I specialize
              in creating responsive, accessible, and performant web
              applications using modern technologies.
            </p>
            <p className="mx-auto text-muted mb-5">
              I&apos;m passionate about creating elegant solutions to complex
              problems, and I&apos;m constantly learning new technologies and
              techniques to stay at the forefront of the ever-evolving web
              landscape.
            </p>

            <div className="d-flex justify-content-center gap-3 mb-5">
              <Button variant="primary" className="px-4 rounded-pill">
                Get In Touch
              </Button>
              <Button variant="outline-primary" className="px-4 rounded-pill">
                Download CV
              </Button>
            </div>
          </Col>
          <Col xs={12} md={10} lg={6} className="d-flex flex-column  mx-auto">
            <Card className="shadow-lg border-0 rounded-4 text-start p-3 my-2 hover-scale">
              <Card.Body className="d-flex align-items-start gap-3">
                <FaCode className="text-primary fs-2" />
                <div>
                  <Card.Title className="fw-bold mb-1">
                    Web Development
                  </Card.Title>
                  <Card.Text>
                    Creating responsive websites and web applications with
                    modern frameworks.
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
            <Card className="shadow-lg border-0 rounded-4 text-start p-3 my-2 hover-scale">
              <Card.Body className="d-flex align-items-start gap-3">
                <FaPalette className="text-primary fs-2" />
                <div>
                  <Card.Title className="fw-bold mb-1">UI/UX Design</Card.Title>
                  <Card.Text>
                    Designing intuitive user interfaces and seamless user
                    experiences.
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
            <Card className="shadow-lg border-0 rounded-4 text-start p-3 my-2 hover-scale">
              <Card.Body className="d-flex align-items-start gap-3">
                <FaProjectDiagram className="text-primary fs-2" />
                <div>
                  <Card.Title className="fw-bold mb-1">
                    Project Management
                  </Card.Title>
                  <Card.Text>
                    Leading projects from conception to completion with agile
                    methodologies.
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
