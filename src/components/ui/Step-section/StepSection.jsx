import React, { useState , useEffect} from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useAnimation, motion } from "framer-motion/dist/es/index";
import { useInView } from "react-intersection-observer";
import "./step-section.css";

const nftcardvariant={
  hidden: {
      opacity: 0,
      y : +50
  },
  visible: {
      opacity: 1,
      y:0,
      transition: {
          duration: 1
      },
  }
}
const STEP__DATA = [
  {
    title: "Setup your wallet",
    desc: "Connect your metamask wallet to NFTrue to get started!",
    icon: "ri-wallet-line",
  },

  {
    title: "Create your collection",
    desc: "Upload files, put descriptions, royalty percentage and you're all ready to mint your own NFT collections!",
    icon: "ri-layout-masonry-line",
  },

  {
    title: "Add your NFTs",
    desc: "Add NFTs to your collections with ease. NFTrue empowers artists by making royalty to the author de-centralised from the marketplace",
    icon: "ri-image-line",
  },

  {
    title: "List them for sale",
    desc: "List your NFTs and collection for sale on NFTrue Market and get royalty fees on every sale.",
    icon: "ri-list-check",
  },
];

const StepSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
      if (inView) {
      controls.start("visible");
      }
  }, [controls, inView]);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-4">
            <h3 className="step__title">Create and sell your NFTs</h3>
          </Col>

          {STEP__DATA.map((item, index) => (
            <Col lg="3" md="4" sm="6" key={index} className="mb-4">
              <motion.div className="single__step__item"
              variants={nftcardvariant} 
              ref={ref}
              animate={controls}
              initial="hidden"
              >
                <span>
                  <i class={item.icon}></i>
                </span>
                <div className="step__item__content">
                  <h5>
                    <Link to="/wallet">{item.title}</Link>
                  </h5>
                  <p className="mb-0">{item.desc}</p>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default StepSection;
