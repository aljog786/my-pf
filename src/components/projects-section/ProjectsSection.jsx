"use client";
import Link from "next/link";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import Image from "next/image";
import { DiGithubFull } from "react-icons/di";
import { IoLinkSharp } from "react-icons/io5";
import { useTheme } from "@/context/ThemeContext";
import "../projects-section/ProjectsSection.scss";

import project1 from "@/assets/projects/project1.png";
import project2 from "@/assets/projects/project2.png";
import project3 from "@/assets/projects/project3.png";

const projects = [
  {
    id: 1,
    title: "PKART",
    description:
      "Full-featured e-commerce platform with user authentication and payment processing.",
    image: project1,
    tags: ["React", "Bootstrap", "MongoDB", "Node", "Express"],
    githubUrl: "https://github.com/aljog786/pkart",
    liveUrl: "#",
  },
  {
    id: 2,
    title: "House Market Place",
    description:
      "Modern real estate app with chat facilities,authentication,etc.",
    image: project2,
    tags: ["React", "Bootstrap", "MongoDB", "Node", "Express"],
    githubUrl: "https://github.com/aljog786/house-market-place",
    liveUrl: "#",
  },
  {
    id: 3,
    title: "NextLevel Food",
    description:
      "A Next.js food app with a sleek UI and robust backend.",
    image: project3,
    tags: ["Nextjs", "Node.js", "Bootstrap", "MongoDB"],
    githubUrl: "https://github.com/aljog786/NextLevel",
    liveUrl: "https://next-level-786.vercel.app/",
  },
];

export default function ProjectsSection() {
  const { isDark } = useTheme();

  return (
    <section className="" id="projects">
      <Container className="text-center py-5">
        <h2 className="text-center fw-bold mb-4 display-5">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <p className="text-center fs-5">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <Row className="g-4 justify-content-center">
          {projects.map((project) => (
            <Col
              key={project.id}
              lg={4}
              md={6}
              sm={12}
              className="d-flex align-items-stretch"
            >
              <Card className="shadow-lg rounded-4 overflow-hidden border-0 hover-scale bg-transparent">
                <div className="ratio ratio-16x9 ">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="rounded-5 p-3 object-fit-cover"
                    fill
                  />
                </div>
                <Card.Body
                  className={`${isDark ? "bg-transparent" : "bg-dark"}`}
                >
                  <Card.Title className={`fw-bold text-primary`}>
                    {project.title}
                  </Card.Title>
                  <Card.Text
                    className={`${isDark ? "text-dark" : "text-white"}`}
                  >
                    {project.description}
                  </Card.Text>
                  <div className="mb-3 d-flex flex-wrap  gap-2">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} pill bg="primary" text="light">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-3 d-flex justify-content-around">
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-decoration-none ${
                        isDark ? "text-dark" : "text-white"
                      }`}
                    >
                      <DiGithubFull size={25} />
                    </Link>
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-decoration-none ${
                        isDark ? "text-dark" : "text-white"
                      }`}
                    >
                      <IoLinkSharp size={25} />
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Button
          href="https://github.com/aljog786"
          target="_blank"
          variant="primary"
          className="mt-5 rounded-pill px-4 py-2 fw-semibold"
        >
          Check My Github
        </Button>
      </Container>
    </section>
  );
}
