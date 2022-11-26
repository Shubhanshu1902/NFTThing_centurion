import React from "react";

import "./modal.css";

const Modal = ({ setShowModal }) => {
  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i class="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h6 className="text-center text-light">Place an Order</h6>

        <div className="input__item mb-3">
          <h6>Enter Quantity (7 available)</h6>
          <input type="number" placeholder="Enter quantity" />
        </div>

        <div className=" d-flex align-items-center justify-content-between">
          <p>Service Fee</p>
          <span className="money">0.89 ETH</span>
        </div>

        <div className=" d-flex align-items-center justify-content-between">
          <p>Total Amount</p>
          <span className="money">5.89 ETH</span>
        </div>

        <button className="place__bid-btn">Place an Order</button>
      </div>
    </div>
  );
};

export default Modal;
