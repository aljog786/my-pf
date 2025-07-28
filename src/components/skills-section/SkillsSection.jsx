import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ProgressBar,
} from "react-bootstrap";
import "../skills-section/SkillSection.scss";

const skills = [
  // Frontend
  { name: "HTML", level: 85, category: "frontend" },
  { name: "CSS", level: 70, category: "frontend" },
  { name: "Bootstrap CSS", level: 85, category: "frontend" },
  { name: "Tailwind CSS", level: 70, category: "frontend" },
  { name: "JavaScript", level: 85, category: "frontend" },
  { name: "React", level: 75, category: "frontend" },

  // Backend
  { name: "Node.js", level: 80, category: "backend" },
  { name: "Express", level: 75, category: "backend" },
  { name: "MongoDB", level: 75, category: "backend" },

  // Tools
  { name: "Git/GitHub", level: 75, category: "tools" },
  { name: "Figma", level: 85, category: "tools" },
  { name: "VS Code", level: 90, category: "tools" },
];

const categories = ["All", "Frontend", "Backend", "Tools"];

export default function SkillsSection() {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = skills.filter((skill) => {
    if (activeCategory === "All") return true;
    return skill.category === activeCategory.toLowerCase();
  });

  return (
    <section className="position-relative min-vh-100 py-5">
      <Container>
        <h2 className="text-center fw-bold mb-4 display-5">
          My <span className="text-primary">Skills</span>
        </h2>

        {/* Filter Buttons */}
        <div className="d-flex justify-content-center align-items-center gap-2 mb-5 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant="link"
              className={`text-decoration-none rounded-pill fw-medium px-4 py-2 ${
                activeCategory === category
                  ? "bg-primary text-white"
                  : "text-white-50"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Skills Grid */}
        <Row className="g-4">
          {filteredSkills.map((skill, index) => (
            <Col key={index} xs={12} md={6} lg={4} className="">
              <Card
                className={`h-100 rounded-4 border-1 hover-scale ${
                  isDark ? "bg-transparent text-dark" : "bg-dark text-light"
                }`}
              >
                <Card.Body className="p-4 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Card.Title className="mb-0 fw-bold text-primary fs-5">
                      {skill.name}
                    </Card.Title>
                    <span className="text-primary fw-semibold">
                      {skill.level}%
                    </span>
                  </div>
                  <ProgressBar
                    now={skill.level}
                    variant="primary"
                    className="mt-auto rounded-5"
                  />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
