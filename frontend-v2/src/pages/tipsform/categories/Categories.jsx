import React, { useState, useEffect } from "react";
import plus from "../../../assets/img/bx-plus-circle.svg";
import minus from "../../../assets/img/bx-minus-circle (1).svg";
import './cats.css'
import NewInputs from "./Newnputs";
function Categories() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      console.log("Accordion is opened");
    } else {
      console.log("Accordion is closed");
    }
  }, [isOpen]);

  return (
    <div>
      <div className="acc-flex">
        <div>
          <h5 className="int-add">
           Add Intineries 
          </h5>
        </div>
        <div>
          <button type="button" id="accordion-button" onClick={toggleAccordion}>
            {isOpen ? (
              <i className="bx bx-minus minus"></i>
            ) : (
              <i className="bx bx-plus bx-plus"></i>
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <div>
          <NewInputs/>
        </div>
      )}
    </div>
  );
}

export default Categories;
