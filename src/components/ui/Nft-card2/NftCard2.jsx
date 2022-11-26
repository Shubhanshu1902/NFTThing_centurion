import React, { useState , useEffect} from "react";
import { Link } from "react-router-dom";
import { useAnimation, motion } from "framer-motion/dist/es/index";
import { useInView } from "react-intersection-observer";
import "./nft-card.css";

import Modal from "../Modal/Modal";


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


const NftCard2 = (props) => {

  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
      if (inView) {
      controls.start("visible");
      }
  }, [controls, inView]);

  const { title, id, currentBid, creatorImg, imgUrl, royalty, creator } = props.item;

  const [showModal, setShowModal] = useState(false);

  return (
    <motion.div className="single__nft__card" 
    variants={nftcardvariant} 
    ref={ref}
    animate={controls}
    initial="hidden">
      <div className="nft__img">
        <img src={imgUrl} alt="" className="w-100" />
      </div>

      <div className="nft__content">
        <h5 className="nft__title">
          <Link to={`/market/${id}`}>{title}</Link>
        </h5>
        
        <div className="creator__info-wrapper d-flex gap-3">
          <div className="creator__img">
            <img src={creatorImg} alt="" className="w-100" />
          </div>
          <row className="creator__info w-100 d-flex align-items-top justify-content-between">
            <div>
              <h6>Created By</h6>
              <p>{creator}</p>
            </div>

            <div>
              <h6>Royalty</h6>
              <p>{royalty}%</p>
            </div>



          </row>
          
          
        </div>
        
        
      </div>
    </motion.div>
  );
};

export default NftCard2;
