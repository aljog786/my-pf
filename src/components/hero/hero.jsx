import { Container, Row, Col, Button } from "react-bootstrap";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import '../hero/hero.scss';

export default function Hero() {
  return (
    <Container
      as="section"
      className="min-vh-100 d-flex flex-column justify-content-center"
    >
      <Row className="justify-content-center w-100">
        <Col
          xs={12}
          sm={10}
          md={12}
          lg={10}
          xl={8}
          className="align-self-center"
        >
          <div className="d-flex flex-column align-items-center">
            <h1 className="text-center">
              <span className="fw-semibold"> Hi, I&apos;m</span>
              <span className="text-primary display-2 fw-bolder animate__animated animate__fadeIn">
                {" "}
                ALJO GEORGE
              </span>
            </h1>
            <p className="text-center fs-5 mx-3">
              I create web experiences with modern technologies. Specializing in
              front-end development, I build interfaces that are beautiful,
              functional and advanced.
            </p>
            <Button variant="primary" size="lg" className="rounded-5 mt-4">
              View My Work
            </Button>
            <IoMdArrowDropdownCircle
              size={35}
              className="text-primary mt-5 animate__animated animate__bounce animate__infinite animate__slower"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
