import React, { useState , useEffect} from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useAnimation, motion } from "framer-motion/dist/es/index";
import { useInView } from "react-intersection-observer";
import "./hero-section.css";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { useGLTF, OrthographicCamera } from '@react-three/drei'
import Model from "./model/Scene";

const textpopvariant={
  hidden: {
      opacity: 0,
      x : -100
  },
  visible: {
      opacity: 1,
      x:0,
      transition: {
          duration: 1.5
      },
  }
}
const cubepopvariant={
  hidden: {
      opacity: 0,
      x : +100
  },
  visible: {
      opacity: 1,
      x:0,
      transition: {
          duration: 1.5
      },
  }
}

const HeroSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
      if (inView) {
      controls.start("visible");
      }
  }, [controls, inView]);

  return (
    
    <section className="hero__section">
      <Container>
        <Row>
          <Col lg="6" md="6">
            <motion.div className="hero__content"
            variants={textpopvariant} 
            ref={ref}
            animate={controls}
            initial="hidden">
              <h2>
                Discover rare digital art and collect
                <span>sell extraordinary</span> NFTs
              </h2>
              <p>
                vaibhav put some text here!
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
            </motion.div>
          </Col>

          <Col lg="6" md="6">
            <motion.div
            variants={cubepopvariant} 
            ref={ref}
            animate={controls}
            initial="hidden"
            >
            <Canvas >
            <mesh scale={3}>
              <boxGeometry />
              <meshStandardMaterial color="#E45C9C" />
            </mesh>
            <ambientLight intensity={1.25}/>
            <OrbitControls autoRotate autoRotateSpeed={3}/>
            </Canvas>
            </motion.div>
            
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
