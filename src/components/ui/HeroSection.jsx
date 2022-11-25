import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./hero-section.css";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { useGLTF, OrthographicCamera } from '@react-three/drei'
import Model from "./model/Scene";


const HeroSection = () => {
  return (
    
    <section className="hero__section">
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2>
                Discover rare digital art and collect
                <span>sell extraordinary</span> NFTs
              </h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Deleniti excepturi omnis neque adipisci sequi ullam unde in
                minus quis quos.
              </p>

              <div className="hero__btns d-flex align-items-center gap-4">
                <button className=" explore__btn d-flex align-items-center gap-2">
                  <i class="ri-rocket-line"></i>{" "}
                  <Link to="/market">Explore</Link>
                </button>
                <button className=" create__btn d-flex align-items-center gap-2">
                  <i class="ri-ball-pen-line"></i>
                  <Link to="/create">Create</Link>
                </button>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">

            <Canvas >
            <mesh>
              <boxGeometry />
              <meshStandardMaterial color="#E45C9C" />
            </mesh>
            <ambientLight intensity={1.25}/>
            <OrbitControls autoRotate />
            </Canvas>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
