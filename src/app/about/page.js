"use client";
import { useTheme } from "@/context/ThemeContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaCode, FaPalette, FaProjectDiagram } from "react-icons/fa";
import "../about/page.scss";

const cardContents = [
  {
    title: "Web Development",
    desc: "Creating responsive websites and web applications with modern frameworks.",
    logo: <FaCode size={30} className="text-primary" />,
  },
  {
    title: "UI/UX Design",
    desc: "Designing intuitive user interfaces and seamless user experiences.",
    logo: <FaPalette size={30} className="text-primary" />,
  },
  {
    title: "Project Management",
    desc: "Leading projects from conception to completion with agile methodologies.",
    logo: <FaProjectDiagram size={30} className="text-primary" />,
  },
];

export default function AboutPage() {
  const { isDark } = useTheme();

  const handleDownload = () => {
    window.open(
      "https://drive.google.com/file/d/1C9XjQRgrbhIL418W_CEIQR5CrEyKRX5l/view?usp=sharing",
      "_blank"
    );
  };

  return (
    <section className="text-white text-center">
      <Container>
        <h2
          className={`fw-bold display-5 mb-4 ${
            isDark ? "text-white" : "text-dark"
          }`}
        >
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
              <Button
                variant="outline-primary"
                className="px-4 rounded-pill"
                onClick={handleDownload}
              >
                Download CV
              </Button>
            </div>
          </Col>
          <Col xs={12} md={10} lg={6} className="d-flex flex-column mx-auto">
            {cardContents.map((content, index) => (
              <Card
                key={index}
                className={`shadow-lg border-0 rounded-4 text-start p-3 my-2 hover-scale ${
                  isDark ? "bg-transparent" : "bg-dark"
                }`}
              >
                <Card.Body className="d-flex align-items-start gap-3">
                  {content.logo}
                  <div>
                    <Card.Title className="fw-bold mb-1 text-primary">
                      {content.title}
                    </Card.Title>
                    <Card.Text className="text-primary">
                      {content.desc}
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </section>
  );
}
